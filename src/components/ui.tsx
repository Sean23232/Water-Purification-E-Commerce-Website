"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

export const cx = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

/* ------------------------------------------------------------------ icons */

type IconProps = { className?: string };

const base = "h-[18px] w-[18px]";

export const IconSearch = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.6-3.6" />
  </svg>
);

export const IconUser = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M4.8 20c.6-3.6 3.6-5.6 7.2-5.6s6.6 2 7.2 5.6" />
  </svg>
);

export const IconCart = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 4h2.2l2.1 10.4h9.3L18.5 7H6.2" />
    <circle cx="9.2" cy="19" r="1.4" />
    <circle cx="17" cy="19" r="1.4" />
  </svg>
);

export const IconMenu = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconClose = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IconChevron = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconArrow = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const IconPlus = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMinus = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden>
    <path d="M5 12h14" />
  </svg>
);

export const IconCheck = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const IconLayers = ({ className = "h-6 w-6" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m12 3 9 4.6-9 4.6-9-4.6L12 3Z" />
    <path d="m3 12.4 9 4.6 9-4.6" />
    <path d="m3 16.8 9 4.6 9-4.6" />
  </svg>
);

export const IconCompass = ({ className = "h-6 w-6" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.4 8.6-2 5.4-5.4 2 2-5.4 5.4-2Z" />
  </svg>
);

export const IconList = ({ className = "h-6 w-6" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden>
    <path d="M8 6h12M8 12h12M8 18h12" />
    <circle cx="4" cy="6" r="1.1" />
    <circle cx="4" cy="12" r="1.1" />
    <circle cx="4" cy="18" r="1.1" />
  </svg>
);

export const IconSupport = ({ className = "h-6 w-6" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
    <path d="M4 13h2.6a1 1 0 0 1 1 1v3.4a1 1 0 0 1-1 1H5.4A1.4 1.4 0 0 1 4 17V13Z" />
    <path d="M20 13h-2.6a1 1 0 0 0-1 1v3.4a1 1 0 0 0 1 1H17a1.4 1.4 0 0 0 1.4-1.4V13Z" />
    <path d="M19 18.4v.6a2 2 0 0 1-2 2h-3" />
  </svg>
);

/* ------------------------------------------------------------------- logo */

export function Logo({ className = "h-9", dark = false }: { className?: string; dark?: boolean }) {
  const ink = dark ? "#FFFFFF" : "#102B46";
  return (
    <span className={cx("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className="h-full w-auto shrink-0" aria-hidden focusable="false">
        <path
          d="M16 1.6 29.1 9.2v15.6L16 32.4 2.9 24.8V9.2L16 1.6Z"
          fill={dark ? "#0A1D31" : "#102B46"}
        />
        <path
          d="M16 5.4 25.8 11v11.9L16 28.6 6.2 22.9V11L16 5.4Z"
          fill="none"
          stroke="#42C6D9"
          strokeWidth="1.1"
          opacity="0.75"
        />
        <path
          d="M16 9.2c0 0 5.6 6.1 5.6 9.9a5.6 5.6 0 1 1-11.2 0c0-3.8 5.6-9.9 5.6-9.9Z"
          fill="#087DB8"
        />
        <path d="M13.4 19.6a2.6 2.6 0 0 0 2.6 2.6" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity=".85" />
      </svg>
      <span
        className={cx(
          "font-display text-[15px] font-extrabold leading-[1.05] tracking-[-0.02em]",
          dark ? "text-white" : "text-navy",
        )}
      >
        AquaPure
        <span className={cx("block text-[10px] font-semibold tracking-[0.18em]", dark ? "text-aqua" : "text-water")}>
          WATER SOLUTIONS
        </span>
      </span>
    </span>
  );
}

/* ---------------------------------------------------------------- motion */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal className={className} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* --------------------------------------------------------------- layout */

type Tone = "white" | "plate" | "navy";

export function Section({
  id,
  index,
  label,
  tone = "white",
  className,
  children,
  containerClassName,
}: {
  id?: string;
  index?: string;
  label?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  const bg = tone === "plate" ? "bg-plate" : tone === "navy" ? "bg-navy" : "bg-white";
  const railColor = tone === "navy" ? "bg-white/20" : "bg-rule";
  const railText = tone === "navy" ? "text-aqua/80" : "text-mute";

  return (
    <section id={id} className={cx("relative", bg, className)}>
      <div className={cx("relative mx-auto w-full max-w-[1360px] px-5 sm:px-8 xl:pl-[108px] xl:pr-10", containerClassName)}>
        {index && label ? (
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-8 hidden w-16 xl:block">
            <span className={cx("absolute left-0 top-0 h-full w-px", railColor)} />
            <span className={cx("micro vertical-label absolute left-4 top-16", railText)}>
              {index} — {label}
            </span>
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "light";
  className?: string;
}) {
  return (
    <span className={cx("inline-flex items-center gap-3", className)}>
      <span className="h-px w-7 bg-aqua" />
      <span className={cx("micro", tone === "light" ? "text-aqua" : "text-water-deep")}>
        {children}
      </span>
    </span>
  );
}

/* --------------------------------------------------------------- buttons */

type BtnProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "navy" | "outline" | "outlineLight" | "quiet";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

const variants: Record<string, string> = {
  primary:
    "bg-water text-white hover:bg-water-deep active:translate-y-px shadow-[0_1px_0_rgba(16,43,70,.12)]",
  navy: "bg-navy text-white hover:bg-navy-soft active:translate-y-px",
  outline:
    "border border-navy/25 bg-white text-navy hover:border-navy hover:bg-plate active:translate-y-px",
  outlineLight:
    "border border-white/35 text-white hover:border-white hover:bg-white/10 active:translate-y-px",
  quiet: "text-water hover:text-navy underline underline-offset-4 decoration-aqua decoration-2",
};

const sizes: Record<string, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-[14px]",
  lg: "h-[54px] px-7 text-[15px]",
};

export function Btn({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled,
  ariaLabel,
}: BtnProps) {
  const cls = cx(
    "inline-flex items-center justify-center gap-2 rounded-[6px] font-semibold tracking-[-0.01em] transition-colors duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-water",
    variants[variant],
    sizes[size],
    disabled && "pointer-events-none opacity-50",
    className,
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

/* ---------------------------------------------------------------- search */

export function useDebounced<T>(value: T, delay = 180) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}
