import { describe, it, expect } from "vitest";
import { parseUrl, matchParams, matchDomain, detect } from "../src/lib/detect";

describe("parseUrl", () => {
  it("parses a valid URL", () => {
    const result = parseUrl("https://example.com/page?ref=123");
    expect(result).not.toBeNull();
    expect(result!.hostname).toBe("example.com");
  });

  it("returns null for an invalid URL", () => {
    expect(parseUrl("not-a-url")).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(parseUrl("")).toBeNull();
  });
});

describe("matchParams", () => {
  it("detects Amazon tag param", () => {
    const url = parseUrl("https://amazon.com/dp/B0EXAMPLE?tag=myid-20")!;
    const matches = matchParams(url);
    expect(matches).toHaveLength(1);
    expect(matches[0]).toMatchObject({ network: "Amazon", param: "tag" });
  });

  it("detects common affiliate ref param", () => {
    const url = parseUrl("https://example.com?ref=someone")!;
    const matches = matchParams(url);
    expect(matches).toHaveLength(1);
    expect(matches[0]).toMatchObject({ network: "Unknown", param: "ref", value: "someone" });
  });

  it("returns empty for clean URL", () => {
    const url = parseUrl("https://example.com/page")!;
    expect(matchParams(url)).toHaveLength(0);
  });

  it("detects multiple affiliate params", () => {
    const url = parseUrl("https://example.com?ref=user&affid=123")!;
    const matches = matchParams(url);
    expect(matches.length).toBeGreaterThanOrEqual(2);
  });
});

describe("matchDomain", () => {
  it("detects CJ Affiliate redirect domain", () => {
    const url = parseUrl("https://anrdoezrs.net/click-123")!;
    const matches = matchDomain(url);
    expect(matches).toHaveLength(1);
    expect(matches[0]).toMatchObject({ network: "CJ Affiliate", param: "domain" });
  });

  it("detects Awin domain with subdomain", () => {
    const url = parseUrl("https://www.awin1.com/awclick.php")!;
    const matches = matchDomain(url);
    expect(matches).toHaveLength(1);
    expect(matches[0].network).toBe("Awin");
  });

  it("returns empty for non-affiliate domain", () => {
    const url = parseUrl("https://example.com")!;
    expect(matchDomain(url)).toHaveLength(0);
  });
});

describe("detect", () => {
  it("detects Amazon URL with tag param", () => {
    const matches = detect("https://amazon.com/dp/B0EXAMPLE?tag=myid-20");
    expect(matches.length).toBeGreaterThanOrEqual(1);
    expect(matches.some((m) => m.network === "Amazon")).toBe(true);
  });

  it("detects CJ Affiliate redirect domain", () => {
    const matches = detect("https://anrdoezrs.net/click-123");
    expect(matches.some((m) => m.network === "CJ Affiliate")).toBe(true);
  });

  it("detects both domain and param match", () => {
    const matches = detect("https://shareasale.com/r.cfm?afftrack=abc");
    expect(matches.some((m) => m.network === "ShareASale")).toBe(true);
  });

  it("returns empty for clean URL", () => {
    expect(detect("https://example.com")).toHaveLength(0);
  });

  it("returns empty for invalid URL", () => {
    expect(detect("")).toHaveLength(0);
  });
});