import { detect } from "../lib/detect";

export default defineBackground(() => {
  chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.frameId !== 0) return;

    const matches = detect(details.url);
    if (matches.length > 0) {
      chrome.action.setBadgeText({ text: "AFF", tabId: details.tabId });
      chrome.action.setBadgeBackgroundColor({ color: "#DC2626" });
    } else {
      chrome.action.setBadgeText({ text: "", tabId: details.tabId });
    }
  });
});