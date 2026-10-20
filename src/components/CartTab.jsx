import { useLayoutEffect, useRef } from "react";
import { popCartBadge } from "./flyToCart";

export default function CartTab({ count = 0, onClick }) {
  const badgeRef = useRef(null);
  const previousCount = useRef(0);

  useLayoutEffect(() => {
    if (count > 0 && previousCount.current === 0) {
      popCartBadge(badgeRef.current);
    }
    previousCount.current = count;
  }, [count]);

  return (
    <button
      type="button"
      className="cart-tab"
      onClick={onClick}
      aria-label={count > 0 ? `Cart, ${count} item${count === 1 ? "" : "s"}` : "Cart"}
    >
      cart.
      {count > 0 && (
        <span className="cart-tab-badge" ref={badgeRef} aria-hidden="true">
          <span className="cart-tab-badge-bg" />
          <span className="cart-tab-badge-number">{count}</span>
        </span>
      )}
      <style>{`
        .cart-tab {
          position: fixed;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 60;
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
          transition: transform 180ms ease, background-color 180ms ease;
          min-height: 44px;
        }
        .cart-tab:hover { background: #222; }
        .cart-tab.is-receiving {
          animation: cart-receive 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes cart-receive {
          0%, 100% { transform: translateY(-50%) scale(1); }
          45% { transform: translateY(-50%) scale(1.08); }
        }
        .cart-tab:active { transform: translateY(-50%) scale(0.96); }
        .cart-tab:focus-visible {
          outline: 3px solid rgba(10, 10, 10, 0.25);
          outline-offset: 3px;
        }
        .cart-tab-badge {
          position: absolute;
          top: -9px;
          right: 2px;
          width: 18px;
          height: 18px;
          display: grid;
          place-items: center;
          pointer-events: none;
        }
        .cart-tab-badge-bg,
        .cart-tab-badge-number {
          grid-area: 1 / 1;
        }
        .cart-tab-badge-bg {
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: #ff3b30;
        }
        .cart-tab-badge-number {
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          line-height: 1;
          text-align: center;
        }
        @media (max-width: 767px) {
          .cart-tab {
            top: auto;
            bottom: calc(12px + env(safe-area-inset-bottom));
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 16px;
            border-radius: 999px;
            font-size: 13px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.16);
          }
          .cart-tab:active { transform: translateX(-50%) scale(0.96); }
          .cart-tab-badge { top: -7px; right: -4px; }
          .cart-tab.is-receiving { animation-name: cart-receive-mobile; }
          @keyframes cart-receive-mobile {
            0%, 100% { transform: translateX(-50%) scale(1); }
            45% { transform: translateX(-50%) scale(1.08); }
          }
        }
        @media (max-height: 500px) and (max-width: 900px) {
          .cart-tab {
            top: auto;
            bottom: calc(12px + env(safe-area-inset-bottom));
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 16px;
            border-radius: 999px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.16);
          }
          .cart-tab:active { transform: translateX(-50%) scale(0.96); }
          .cart-tab.is-receiving { animation-name: cart-receive-mobile; }
        }
      `}</style>
    </button>
  );
}
