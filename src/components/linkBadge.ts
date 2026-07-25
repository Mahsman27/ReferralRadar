export function attachBadge(anchor: HTMLAnchorElement, network: string): void {
  if (anchor.dataset.rr) return;

  anchor.dataset.rr = network;

  anchor.addEventListener("mouseenter", showTooltip);
  anchor.addEventListener("mouseleave", hideTooltip);
}

let activeTooltip: HTMLElement | null = null;

function showTooltip(this: HTMLAnchorElement): void {
  const rect = this.getBoundingClientRect();
  const tooltip = document.createElement("div");
  tooltip.textContent = `Referral: ${this.dataset.rr}`;
  Object.assign(tooltip.style, {
    position: "fixed",
    top: `${rect.top - 8}px`,
    left: `${rect.left}px`,
    transform: "translateY(-100%)",
    background: "#1F2937",
    color: "#F9FAFB",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    whiteSpace: "nowrap",
    pointerEvents: "none",
    zIndex: "2147483647",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  });

  document.body.appendChild(tooltip);
  activeTooltip = tooltip;
}

function hideTooltip(): void {
  activeTooltip?.remove();
  activeTooltip = null;
}