export function attachBadge(anchor: HTMLAnchorElement, network: string): void {
  if (anchor.nextElementSibling?.classList.contains("rr-badge")) return;

  const badge = document.createElement("span");
  badge.className = "rr-badge";
  badge.textContent = network;
  Object.assign(badge.style, {
    display: "inline-block",
    marginLeft: "4px",
    padding: "1px 6px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "600",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    lineHeight: "1.5",
    verticalAlign: "middle",
    cursor: "default",
    color: "#fff",
    background: network === "Unknown" ? "#D97706" : "#059669",
    userSelect: "none",
  });

  anchor.insertAdjacentElement("afterend", badge);
}