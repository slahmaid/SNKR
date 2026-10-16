import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function CartTab({ count = 0, onClick }) {
  const buttonRef = useRef(null);
  const labelRef = useRef(null);
  const badgeRef = useRef(null);
  const previousCount = useRef(0);

  useLayoutEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const safeProbe = document.createElement("div");
    safeProbe.style.cssText =
      "position:fixed;visibility:hidden;pointer-events:none;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)";
    document.body.appendChild(safeProbe);

    const place = () => {
      const mobile = window.matchMedia("(max-width: 900px), (max-height: 500px)").matches;
      if (!mobile) {
        button.style.width = "";
        button.style.height = "";
        button.style.right = "";
        button.style.bottom = "";
        button.style.fontSize = "";
        return;
      }

      const bar = document.querySelector(".control-bar-island");
      if (!bar) return;
      const barRect = bar.getBoundingClientRect();
      const safe = getComputedStyle(safeProbe);
      const safeRight = parseFloat(safe.paddingRight) || 0;
      const safeBottom = parseFloat(safe.paddingBottom) || 0;
      const viewport = window.visualViewport;
      const width = viewport?.width ?? window.innerWidth;
      const height = viewport?.height ?? window.innerHeight;
      const edge = Math.max(4, safeRight);
      const gutter = width - barRect.right;
      const room = Math.floor(gutter - edge);
      const size = Math.max(32, Math.min(barRect.height, room));
      button.style.width = `${size}px`;
      button.style.height = `${size}px`;
      button.style.right = `${edge}px`;
      button.style.bottom = `${Math.max(
        safeBottom,
        height - barRect.bottom + (barRect.height - size) / 2
      )}px`;
      button.style.fontSize = `${Math.max(10, Math.round(size * 0.28))}px`;
    };

    place();
    const bar = document.querySelector(".control-bar-island");
    const observer = new ResizeObserver(place);
    if (bar) observer.observe(bar);
    window.addEventListener("resize", place);
    window.visualViewport?.addEventListener("resize", place);
    return () => {
      observer.disconnect();
      safeProbe.remove();
      window.removeEventListener("resize", place);
      window.visualViewport?.removeEventListener("resize", place);
    };
  }, []);

  useLayoutEffect(() => {
    const badge = badgeRef.current;
    const label = labelRef.current;
    if (!badge) {
      previousCount.current = count;
      return;
    }

    if (previousCount.current === 0 && count > 0) {
      gsap.fromTo(
        badge,
        { scale: 0 },
        { scale: 1, duration: 0.8, ease: "elastic.out(1.3, 0.9)" }
      );
      if (label && window.innerWidth > 900 && window.innerHeight > 500) {
        gsap.fromTo(label, { x: 0 }, { x: 3, duration: 0.4, ease: "power2.out" });
      }
    } else if (count > previousCount.current) {
      gsap.fromTo(
        badge,
        { scale: 1.4 },
        { scale: 1, duration: 0.6, ease: "elastic.out(1.2, 0.6)" }
      );
    }

    previousCount.current = count;
  }, [count]);

  return (
    <button
      type="button"
      ref={buttonRef}
      className="cart-tab"
      onClick={onClick}
      aria-label={count > 0 ? `Cart, ${count} item${count === 1 ? "" : "s"}` : "Cart"}
    >
      <span ref={labelRef} className="cart-tab-label">
        cart.
      </span>
      {count > 0 && (
        <span ref={badgeRef} className="cart-tab-badge" aria-hidden="true">
          {count}
        </span>
      )}
      <style>{`
        .cart-tab {
          position: fixed;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 80;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0;
          padding: 11px 16px 11px 14px;
          border: none;
          border-radius: 0 999px 999px 0;
          background: #0a0a0a;
          color: #fff;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1;
          cursor: pointer;
          pointer-events: auto;
        }
        .cart-tab-label {
          display: inline-block;
        }
        @media (max-width: 900px), (max-height: 500px) {
          .cart-tab {
            left: auto;
            right: 14px;
            top: auto;
            bottom: 20px;
            transform: none;
            width: 48px;
            height: 48px;
            padding: 0;
            border-radius: 50%;
            font-size: 12px;
            letter-spacing: 0;
            line-height: 1;
            display: grid;
            place-items: center;
          }
          .cart-tab-label {
            display: block;
            margin: 0;
            padding: 0;
            letter-spacing: 0;
            line-height: 1;
            text-align: center;
            transform: none;
          }
        }
        @media (max-width: 480px) {
          .cart-tab {
            right: 12px;
            bottom: 16px;
            width: 44px;
            height: 44px;
            font-size: 11px;
          }
        }
        .cart-tab-badge {
          position: absolute;
          top: -9px;
          right: 2px;
          min-width: 18px;
          height: 18px;
          padding: 0 5px;
          border-radius: 999px;
          background: #ff3b30;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          line-height: 18px;
          text-align: center;
          box-sizing: border-box;
        }
      `}</style>
    </button>
  );
}
