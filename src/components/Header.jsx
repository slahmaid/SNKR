import React from "react";

export default function Header() {
  return (
    <header
      className="site-header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "20px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          pointerEvents: "auto",
        }}
      >
        {/* Text logo */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
          }}
        >
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "18px",
              fontWeight: "700",
              letterSpacing: "0.04em",
              color: "#000",
            }}
          >
            chlah.
          </span>
        </div>
      </div>

    </header>
  );
}
