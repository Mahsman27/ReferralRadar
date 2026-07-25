let toastEl: HTMLDivElement | null = null;

export function showToast(message: string, durationMs = 5000): void {
  removeToast();

  toastEl = document.createElement("div");
  toastEl.textContent = message;
  Object.assign(toastEl.style, {
    position: "fixed",
    bottom: "0",
    right: "16px",
    background: "#1F2937",
    color: "#F9FAFB",
    padding: "12px 20px",
    borderRadius: "8px 8px 0 0",
    fontSize: "14px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    boxShadow: "0 -4px 12px rgba(0,0,0,0.15)",
    zIndex: "2147483647",
    transition: "transform 0.3s ease, opacity 0.3s ease",
    transform: "translateY(100%)",
    opacity: "0",
    maxWidth: "360px",
    lineHeight: "1.4",
  });

  document.body.appendChild(toastEl);
  requestAnimationFrame(() => {
    if (toastEl) {
      toastEl.style.transform = "translateY(0)";
      toastEl.style.opacity = "1";
    }
  });

  setTimeout(() => {
    if (toastEl) {
      toastEl.style.transform = "translateY(100%)";
      toastEl.style.opacity = "0";
      toastEl.addEventListener("transitionend", removeToast, { once: true });
    }
  }, durationMs);
}

function removeToast(): void {
  if (toastEl) {
    toastEl.remove();
    toastEl = null;
  }
}