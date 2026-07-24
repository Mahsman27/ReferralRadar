export interface AffiliateNetwork {
  name: string;
  domains: string[];
  params: string[];
}

export interface AffiliateMatch {
  network: string;
  param: string;
  value: string;
}

export interface DetectedPage {
  url: string;
  detectedAt: number;
  matches: AffiliateMatch[];
}