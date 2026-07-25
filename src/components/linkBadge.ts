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
  tooltip.style.position = "fixed";
  tooltip.style.left = `${rect.left + rect.width / 2}px`;
  tooltip.style.top = `${rect.top - 8}px`;
  tooltip.style.transform = "translate(-50%, -100%)";
  tooltip.style.background = "#1F2937";
  tooltip.style.color = "#F9FAFB";
  tooltip.style.padding = "4px 10px";
  tooltip.style.borderRadius = "6px";
  tooltip.style.fontSize = "12px";
  tooltip.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  tooltip.style.whiteSpace = "nowrap";
  tooltip.style.pointerEvents = "none";
  tooltip.style.zIndex = "2147483647";
  tooltip.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";

  document.body.appendChild(tooltip);
  activeTooltip = tooltip;
}

function hideTooltip(): void {
  activeTooltip?.remove();
  activeTooltip = null;
}
