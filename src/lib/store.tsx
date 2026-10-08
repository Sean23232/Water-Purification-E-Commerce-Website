"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "./catalog";

export interface CartLine {
  productId: string;
  qty: number;
}

interface State {
  lines: CartLine[];
}

type Action =
  | { type: "add"; productId: string; qty?: number }
  | { type: "setQty"; productId: string; qty: number }
  | { type: "remove"; productId: string }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

const STORAGE_KEY = "aquapure-cart-v1";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines };
    case "add": {
      const qty = action.qty ?? 1;
      const existing = state.lines.find((l) => l.productId === action.productId);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.productId === action.productId ? { ...l, qty: Math.min(l.qty + qty, 99) } : l,
          ),
        };
      }
      return { lines: [...state.lines, { productId: action.productId, qty }] };
    }
    case "setQty":
      if (action.qty <= 0) {
        return { lines: state.lines.filter((l) => l.productId !== action.productId) };
      }
      return {
        lines: state.lines.map((l) =>
          l.productId === action.productId ? { ...l, qty: Math.min(action.qty, 99) } : l,
        ),
      };
    case "remove":
      return { lines: state.lines.filter((l) => l.productId !== action.productId) };
    case "clear":
      return { lines: [] };
    default:
      return state;
  }
}

export interface ResolvedLine {
  product: Product;
  qty: number;
  lineTotal: number;
}

interface CartValue {
  lines: ResolvedLine[];
  count: number;
  subtotal: number;
  add: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  lastAdded: number;
}

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) {
          dispatch({
            type: "hydrate",
            lines: parsed.filter((l) => products.some((p) => p.id === l.productId)),
          });
        }
      }
    } catch {
      /* ignore malformed storage */
    }
    const t = window.setTimeout(() => setHydrated(true), 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      /* storage unavailable */
    }
  }, [state.lines, hydrated]);

  const add = useCallback((productId: string, qty = 1) => {
    dispatch({ type: "add", productId, qty });
    setLastAdded(Date.now());
    setIsOpen(true);
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    dispatch({ type: "setQty", productId, qty });
  }, []);

  const remove = useCallback((productId: string) => dispatch({ type: "remove", productId }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const lines = useMemo<ResolvedLine[]>(() => {
    return state.lines
      .map((l) => {
        const product = products.find((p) => p.id === l.productId);
        if (!product || product.priceKind !== "fixed" || product.price === null) return null;
        return { product, qty: l.qty, lineTotal: product.price * l.qty };
      })
      .filter((l): l is ResolvedLine => l !== null);
  }, [state.lines]);

  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);

  const value = useMemo<CartValue>(
    () => ({
      lines,
      count,
      subtotal,
      add,
      setQty,
      remove,
      clear,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      lastAdded,
    }),
    [lines, count, subtotal, add, setQty, remove, clear, isOpen, lastAdded],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
