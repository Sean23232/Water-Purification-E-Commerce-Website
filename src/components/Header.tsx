"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { products, navigation } from "@/lib/catalog";
import { useCart } from "@/lib/store";
import { useQuote } from "@/components/QuoteForm";
import {
  Btn,
  IconCart,
  IconChevron,
  IconClose,
  IconMenu,
  IconSearch,
  IconUser,
  Logo,
  cx,
} from "@/components/ui";

const ANNOUNCEMENT =
  "Water purification solutions for homes, businesses, and large-scale applications.";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { count, openCart, lastAdded } = useCart();
  const { open: openQuote } = useQuote();

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Close any open panels when the route changes (deferred to the next tick).
  useEffect(() => {
    const t = window.setTimeout(() => {
      setOpenMenu(null);
      setMobileOpen(false);
      setAccountOpen(false);
      setSearchOpen(false);
      setQuery("");
    }, 0);
    return () => window.clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
        setSearchOpen(false);
        setAccountOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  const q = query.trim().toLowerCase();
  const results = q
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.short.toLowerCase().includes(q) ||
            p.application.toLowerCase().includes(q) ||
            p.category.replace(/-/g, " ").includes(q),
        )
        .slice(0, 6)
    : [];

  const onSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!q) return;
    setSearchOpen(false);
    router.push(`/products?q=${encodeURIComponent(query.trim())}`);
  };

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
    setAccountOpen(false);
  };

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      {/* announcement bar */}
      <div className="relative z-40 bg-navy text-white">
        <div className="mx-auto flex max-w-[1360px] items-center justify-center gap-3 px-5 py-2.5 sm:px-8">
          <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-aqua sm:block" aria-hidden />
          <p className="text-center text-[12.5px] leading-snug tracking-[0.01em] text-white/90">
            {ANNOUNCEMENT}
          </p>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-rule bg-white/96 backdrop-blur-md">
        {/* row 1 — logo + utilities */}
        <div className="mx-auto flex max-w-[1360px] items-center gap-3 px-5 py-3 sm:px-8 xl:pl-[108px] xl:pr-10">
          <button
            type="button"
            className="-ml-1 shrink-0 rounded-[6px] p-2 text-navy transition-colors hover:bg-plate lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>

          <Link href="/" className="shrink-0" aria-label="AquaPure Water Solutions — home">
            <Logo className="h-9" />
          </Link>

          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1.5">
            <button
              type="button"
              onClick={() => {
                setSearchOpen((v) => !v);
                setAccountOpen(false);
              }}
              aria-label="Search products"
              aria-expanded={searchOpen}
              className="rounded-[6px] p-2.5 text-navy transition-colors hover:bg-plate hover:text-water"
            >
              <IconSearch className="h-[19px] w-[19px]" />
            </button>

            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => {
                  setAccountOpen((v) => !v);
                  setSearchOpen(false);
                }}
                aria-label="Account"
                aria-expanded={accountOpen}
                className="rounded-[6px] p-2.5 text-navy transition-colors hover:bg-plate hover:text-water"
              >
                <IconUser className="h-[19px] w-[19px]" />
              </button>
              {accountOpen ? (
                <div className="absolute right-0 top-full z-50 mt-1 w-[260px] border border-rule bg-white p-4 shadow-[0_24px_60px_-24px_rgba(16,43,70,.4)] fade-in">
                  <p className="micro-sm text-water">Demo only</p>
                  <p className="mt-2 text-[13.5px] leading-[1.6] text-mute">
                    Customer accounts are not part of this front-end concept. Your cart is stored
                    in this browser only.
                  </p>
                  <Btn href="/contact" variant="outline" size="sm" className="mt-4 w-full">
                    Contact support
                  </Btn>
                </div>
              ) : null}
            </div>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Shopping cart, ${count} item${count === 1 ? "" : "s"}`}
              className="relative rounded-[6px] p-2.5 text-navy transition-colors hover:bg-plate hover:text-water"
            >
              <IconCart className="h-[19px] w-[19px]" />
              <span
                key={lastAdded}
                className={cx(
                  "absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-water px-1 font-mono text-[10px] font-semibold text-white tnum",
                  lastAdded !== 0 && "badge-bump",
                )}
              >
                {count}
              </span>
            </button>

            <Btn
              onClick={() => openQuote()}
              variant="primary"
              size="sm"
              className="ml-1 hidden md:inline-flex"
            >
              Get a System Quote
            </Btn>
          </div>
        </div>

        {/* row 2 — main navigation */}
        <nav
          aria-label="Main"
          className="hidden border-t border-rule bg-white lg:block"
        >
          <div className="mx-auto flex max-w-[1360px] items-center gap-0.5 px-5 sm:px-8 xl:pl-[108px] xl:pr-10">
            {navigation.map((item) => {
              const active = isActive(item.href);
              const isOpen = openMenu === item.label;

              if (!item.items) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cx(
                      "rounded-[5px] px-3 py-2.5 text-[13.5px] font-semibold transition-colors duration-150",
                      active ? "text-water" : "text-navy hover:text-water",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(isOpen ? null : item.label)}
                    className={cx(
                      "flex items-center gap-1 rounded-[5px] px-3 py-2.5 text-[13.5px] font-semibold transition-colors duration-150",
                      active ? "text-water" : "text-navy hover:text-water",
                    )}
                  >
                    {item.label}
                    <IconChevron
                      className={cx(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                  {isOpen ? (
                    <div className="absolute left-0 top-full z-50 w-[300px] border border-rule bg-white p-2 shadow-[0_24px_60px_-24px_rgba(16,43,70,.4)] fade-in">
                      <Link
                        href={item.href}
                        className="mb-1 flex items-center justify-between bg-plate px-3 py-2.5 text-[13.5px] font-semibold text-navy transition-colors hover:bg-plate-deep"
                      >
                        {item.label} overview
                        <span className="micro-sm text-water">All</span>
                      </Link>
                      {item.items.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-3 py-2.5 text-[13.5px] text-ink transition-colors hover:bg-plate hover:text-water"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}

            <span className="ml-auto hidden pr-1 xl:block">
              <Link
                href="/#solution-finder"
                className="text-[13px] font-semibold text-water underline decoration-aqua decoration-2 underline-offset-4 hover:text-navy"
              >
                Not sure what you need? Try the solution finder
              </Link>
            </span>
          </div>
        </nav>

        {/* search panel */}
        {searchOpen ? (
          <div className="absolute inset-x-0 top-full border-b border-rule bg-white shadow-[0_24px_50px_-30px_rgba(16,43,70,.5)] fade-in">
            <div className="mx-auto max-w-[1360px] px-5 py-6 sm:px-8 xl:pl-[108px] xl:pr-10">
              <form onSubmit={onSearchSubmit} role="search">
                <label htmlFor="site-search" className="micro text-water">
                  Search the catalogue
                </label>
                <div className="mt-3 flex items-center gap-3 border-b-2 border-navy pb-3">
                  <IconSearch className="h-5 w-5 shrink-0 text-mute" />
                  <input
                    id="site-search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Try “reverse osmosis”, “commercial”, “cartridge”…"
                    className="w-full bg-transparent font-display text-xl font-bold text-navy placeholder:font-sans placeholder:text-[15px] placeholder:font-normal placeholder:text-mute focus:outline-none sm:text-2xl"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    aria-label="Close search"
                    className="rounded p-1.5 text-mute transition-colors hover:bg-plate hover:text-navy"
                  >
                    <IconClose />
                  </button>
                </div>
              </form>

              <div className="mt-5">
                {!q ? (
                  <p className="text-[13.5px] text-mute">
                    Start typing to filter {products.length} sample products, or{" "}
                    <Link
                      href="/products"
                      className="font-semibold text-water underline decoration-aqua underline-offset-4"
                    >
                      browse everything
                    </Link>
                    .
                  </p>
                ) : results.length === 0 ? (
                  <div className="border border-rule bg-plate p-5">
                    <p className="text-[14px] font-semibold text-navy">
                      No products match “{query}”.
                    </p>
                    <p className="mt-1.5 text-[13.5px] text-mute">
                      Try a broader term, or tell us what you need through a quote request.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Btn href="/products" variant="outline" size="sm">
                        View all products
                      </Btn>
                      <Btn onClick={() => openQuote()} variant="navy" size="sm">
                        Request guidance
                      </Btn>
                    </div>
                  </div>
                ) : (
                  <ul className="divide-y divide-rule border border-rule">
                    {results.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/products/${p.slug}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-4 p-3 transition-colors hover:bg-plate"
                        >
                          <span className="relative h-12 w-16 shrink-0 overflow-hidden bg-plate photo">
                            <Image src={p.image} alt="" fill sizes="64px" className="object-cover" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[14px] font-semibold text-navy">
                              {p.name}
                            </span>
                            <span className="micro-sm text-mute">{p.application}</span>
                          </span>
                          <span className="shrink-0 font-mono text-[13px] font-semibold text-water tnum">
                            {p.priceKind === "fixed" ? `$${p.price?.toFixed(2)}` : "Quote"}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </header>

      {/* mobile drawer */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div
            className="absolute inset-0 bg-navy-deep/60 fade-in"
            onClick={closeAll}
            aria-hidden
          />
          <div className="drawer-in absolute inset-y-0 left-0 flex w-[min(92vw,380px)] flex-col bg-white">
            <div className="flex items-center justify-between border-b border-rule px-5 py-4">
              <Logo className="h-8" />
              <button
                type="button"
                onClick={closeAll}
                aria-label="Close menu"
                className="rounded-[6px] p-2 text-navy hover:bg-plate"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>

            <nav className="thin-scroll flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
              {navigation.map((item) =>
                item.items ? (
                  <div key={item.label} className="border-b border-rule">
                    <div className="flex items-stretch">
                      <Link
                        href={item.href}
                        onClick={closeAll}
                        className="flex-1 py-3.5 pl-2 pr-1 text-[15px] font-semibold text-navy"
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={mobileSection === item.label}
                        aria-label={`Expand ${item.label}`}
                        onClick={() =>
                          setMobileSection((s) => (s === item.label ? null : item.label))
                        }
                        className="px-3 text-mute"
                      >
                        <IconChevron
                          className={cx(
                            "h-4 w-4 transition-transform duration-200",
                            mobileSection === item.label && "rotate-180",
                          )}
                        />
                      </button>
                    </div>
                    {mobileSection === item.label ? (
                      <div className="border-t border-rule bg-plate px-3 py-2">
                        {item.items.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={closeAll}
                            className="block py-2.5 text-[14px] text-ink hover:text-water"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeAll}
                    className="block border-b border-rule py-3.5 pl-2 text-[15px] font-semibold text-navy"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="border-t border-rule p-4">
              <Btn
                onClick={() => {
                  setMobileOpen(false);
                  openQuote();
                }}
                variant="primary"
                className="w-full"
              >
                Get a System Quote
              </Btn>
              <div className="mt-3 flex items-center justify-between px-1">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex items-center gap-2 text-[13.5px] font-medium text-mute"
                >
                  <IconSearch className="h-4 w-4" /> Search
                </button>
                <Link
                  href="/contact"
                  onClick={closeAll}
                  className="flex items-center gap-2 text-[13.5px] font-medium text-mute"
                >
                  <IconUser className="h-4 w-4" /> Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
