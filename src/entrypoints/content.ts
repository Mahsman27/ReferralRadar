export default defineContentScript({
  matches: ["<all_urls>"],
  main() {
    console.log("ReferralRadar content script injected");
  },
});