import type { AffiliateNetwork } from "./types";

export const NETWORKS: readonly AffiliateNetwork[] = [
  {
    name: "Amazon",
    domains: ["amazon.com", "amazon.co.uk", "amazon.de", "amazon.fr", "amazon.it", "amazon.es", "amazon.ca", "amazon.co.jp", "amazon.in", "amazon.com.au", "amazon.com.br", "amazon.nl", "amazon.se", "amazon.pl", "amazon.sg", "amazon.ae", "amazon.sa"],
    params: ["tag", "linkCode", "ascsubtag"],
  },
  {
    name: "eBay",
    domains: ["ebay.com", "ebay.co.uk", "ebay.de", "ebay.fr", "ebay.it", "ebay.es", "ebay.ca", "ebay.com.au", "ebay.in"],
    params: ["campid", "mkevt", "mkrid", "mkcid"],
  },
  {
    name: "CJ Affiliate",
    domains: ["anrdoezrs.net", "dpbolvw.net", "kqzyfj.com", "jdoqocy.com", "tkqlhce.com", "qksrv.net", "emjcd.com", "afcyhf.com"],
    params: ["afftrack", "cjevent"],
  },
  {
    name: "Impact",
    domains: ["sjv.io", "impact.com"],
    params: ["irclickid", "irgwc"],
  },
  {
    name: "Awin",
    domains: ["awin1.com"],
    params: ["awinaffid", "awc", "mid"],
  },
  {
    name: "ShareASale",
    domains: ["shareasale.com"],
    params: ["afftrack"],
  },
  {
    name: "Rakuten",
    domains: ["rakuten.com", "linksynergy.com", "click.linksynergy.com"],
    params: ["raf", "sid"],
  },
  {
    name: "PartnerStack",
    domains: ["grsm.io", "partnerstack.com", "pstk.io"],
    params: [],
  },
  {
    name: "FirstPromoter",
    domains: ["firstpromoter.com"],
    params: ["fpr"],
  },
  {
    name: "Skimlinks",
    domains: ["skimlinks.com", "skimresources.com", "redirectingat.com"],
    params: [],
  },
  {
    name: "Rewardful",
    domains: [],
    params: ["via"],
  },
];

export const COMMON_AFFILIATE_PARAMS: readonly string[] = [
  "ref",
  "aff",
  "aff_id",
  "affiliate_id",
  "affid",
  "sub_id",
  "subid",
  "click_id",
  "clickid",
  "partner",
  "referral",
  "r",
];