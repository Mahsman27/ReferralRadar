import { detect } from "../lib/detect";
import { savePage } from "../lib/storage";
import type { DetectedPage } from "../lib/types";

export default defineBackground(() => {
  chrome.webNavigation.onCommitted.addListener(async (details) => {
    if (details.frameId !== 0) return;

    const matches = detect(details.url);
    if (matches.length > 0) {
      chrome.action.setBadgeText({ text: "AFF", tabId: details.tabId });
      chrome.action.setBadgeBackgroundColor({ color: "#DC2626" });

      const page: DetectedPage = {
        url: details.url,
        detectedAt: Date.now(),
        matches,
      };
      await savePage(page);
    } else {
      chrome.action.setBadgeText({ text: "", tabId: details.tabId });
    }
  });
});