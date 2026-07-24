/// <reference types="wxt/vite-builder-env" />
import { defineConfig } from "wxt";

export default defineConfig({
  srcDir: "src",
  extensionApi: "chrome",
  modules: [],
  manifest: {
    name: "ReferralRadar",
    version: "0.1.0",
    description: "Detects affiliate/referral links for transparency",
    permissions: ["webNavigation", "storage", "activeTab", "scripting"],
    host_permissions: ["<all_urls>"],
    icons: {
      16: "/icons/icon-16.png",
      48: "/icons/icon-48.png",
      128: "/icons/icon-128.png",
    },
  },
});