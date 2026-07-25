import { detect } from "../lib/detect";
import { showToast } from "../components/toast";
import { attachBadge } from "../components/linkBadge";

export default defineContentScript({
  matches: ["<all_urls>"],
  main() {
    scanPage();
    observeNewLinks();
  },
});

function scanPage(): void {
  const anchors = document.querySelectorAll<HTMLAnchorElement>("a[href]");
  let toastShown = false;

  anchors.forEach((a) => {
    const matches = detect(a.href);
    if (matches.length > 0) {
      const network = matches[0].network;
      attachBadge(a, network);
      if (!toastShown) {
        showToast(`ReferralRadar: ${network} link detected on this page`);
        toastShown = true;
      }
    }
  });
}

function observeNewLinks(): void {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node instanceof HTMLAnchorElement && node.href) {
          const matches = detect(node.href);
          if (matches.length > 0) {
            attachBadge(node, matches[0].network);
          }
        }
        if (node instanceof Element) {
          node.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) => {
            const matches = detect(a.href);
            if (matches.length > 0) {
              attachBadge(a, matches[0].network);
            }
          });
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}