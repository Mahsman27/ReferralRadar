import type { AffiliateMatch } from "./types";
import { COMMON_AFFILIATE_PARAMS, NETWORKS } from "./networks";

export function parseUrl(url: string): URL | null {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

export function matchParams(url: URL): AffiliateMatch[] {
  const matches: AffiliateMatch[] = [];

  for (const [key, value] of url.searchParams) {
    const network = NETWORKS.find((n) => n.params.includes(key));
    if (network) {
      matches.push({ network: network.name, param: key, value });
      continue;
    }

    if (COMMON_AFFILIATE_PARAMS.includes(key)) {
      matches.push({ network: "Unknown", param: key, value });
    }
  }

  return matches;
}