import gsap from "gsap";

const COPIES = 5;

export function flyImagesToCart({ imageUrl, origin, cartSelector = ".cart-tab" }) {
  const cart = document.querySelector(cartSelector);
  if (!cart || !origin || !imageUrl) return Promise.resolve();

  const cartRect = cart.getBoundingClientRect();
  const targetX = cartRect.left + cartRect.width / 2;
  const targetY = cartRect.top + cartRect.height / 2;

  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  layer.style.cssText =
    "position:fixed;inset:0;pointer-events:none;z-index:70;overflow:hidden;";

  const nodes = [];
  for (let i = 0; i < COPIES; i += 1) {
    const size = 150 - i * 8;
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "";
    img.style.cssText = [
      "position:absolute",
      `width:${size}px`,
      `height:${size}px`,
      "object-fit:contain",
      `left:${origin.x - size / 2}px`,
      `top:${origin.y - size / 2}px`,
      "pointer-events:none",
    ].join(";");
    layer.appendChild(img);
    nodes.push(img);
  }

  document.body.appendChild(layer);

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        layer.remove();
        resolve();
      },
    });

    tl.to(
      nodes,
      {
        keyframes: {
          "40%": {
            y: -90,
            scale: 0.72,
            autoAlpha: 1,
          },
          "100%": {
            x: targetX - origin.x,
            y: targetY - origin.y,
            scale: 0,
            autoAlpha: 0,
          },
        },
        stagger: { from: "end", each: 0.04 },
        duration: 1.15,
        ease: "power2.inOut",
      },
      0
    );
  });
}
