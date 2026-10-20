import gsap from "gsap";

const COPIES = 6;
const IMAGE_SIZE = 150;

function getCartTarget(cart) {
  const rect = cart.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

export function flyImagesToCart({ imageUrl, origin, cartSelector = ".cart-tab" }) {
  const cart = document.querySelector(cartSelector);
  if (!cart || !origin || !imageUrl) return Promise.resolve();

  const isMobile = window.matchMedia(
    "(max-width: 767px), (max-height: 500px)"
  ).matches;
  const imageSize = isMobile ? 110 : IMAGE_SIZE;

  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  layer.style.cssText =
    "position:fixed;inset:0;pointer-events:none;z-index:200;overflow:hidden;";

  const nodes = [];
  for (let i = 0; i < COPIES; i += 1) {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "";
    img.style.cssText = [
      "position:absolute",
      `width:${imageSize}px`,
      `height:${imageSize}px`,
      "object-fit:contain",
      "transform-origin:center center",
      `left:${origin.x - imageSize / 2}px`,
      `top:${origin.y - imageSize / 2}px`,
      "pointer-events:none",
      "will-change:transform,opacity",
    ].join(";");
    layer.appendChild(img);
    nodes.push(img);
  }

  document.body.appendChild(layer);

  return new Promise((resolve) => {
    gsap
      .timeline({
        onStart: () => {
          cart.classList.add("is-receiving");
          const target = getCartTarget(cart);
          const dx = target.x - origin.x;
          const dy = target.y - origin.y;
          gsap.set(nodes, { x: 0, y: 0 });
          nodes.forEach((node) => {
            node.dataset.targetX = String(dx);
            node.dataset.targetY = String(dy);
          });
        },
        onComplete: () => {
          cart.classList.remove("is-receiving");
          layer.remove();
          resolve();
        },
      })
      .to(nodes, {
        keyframes: {
          "40%": {
            y: -imageSize * 1.5,
            scale: 0.5,
            autoAlpha: 1,
          },
          "100%": {
            x: (_index, target) => Number(target.dataset.targetX),
            y: (_index, target) => Number(target.dataset.targetY),
            scale: 0,
            autoAlpha: 0,
          },
        },
        stagger: { from: "end", each: 0.04 },
        duration: isMobile ? 1.45 : 1.8,
        ease: "power2.inOut",
      });
  });
}

export function popCartBadge(badge) {
  if (!badge) return;
  const parts = badge.querySelectorAll(".cart-tab-badge-number, .cart-tab-badge-bg");
  gsap.fromTo(
    parts,
    { scale: 0 },
    { scale: 1, stagger: 0.1, duration: 0.8, ease: "elastic.out(1.3, 0.9)" }
  );
}
