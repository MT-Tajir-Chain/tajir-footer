import type { FooterColumn, FooterSettings, TajirFooterApp } from "./types";

export const DEFAULT_API_URL = "https://dev-api.tajirchain.com/settings";
export const DEFAULT_NEWSLETTER_URL = "https://dev-api.tajirchain.com/newsletter";
export const DEFAULT_SITE_URL = "https://tajirchain.com";
export const DEFAULT_SUBTITLE = "Commerce infrastructure on Ethereum";

export const APP_ORIGINS: Record<string, string> = {
  website: "https://tajirchain.com",
  explorer: "https://tjrscan.com",
  bridge: "https://bridge.tajirchain.com",
  faucet: "https://faucet.tajirchain.com",
  docs: "https://docs.tajirchain.com",
};

export const FALLBACK_SETTINGS: FooterSettings = {
  logoDark:
    "https://d3emih4hj77qgs.cloudfront.net/images/c5b07635-dcaf-4a7a-ad7c-b6994b51fbcf",
  logoLight:
    "https://d3emih4hj77qgs.cloudfront.net/images/fb570bd8-6fe0-4417-aacc-490b2ebf164d",
  footerDescription: "© 2026 Tajir Protocol Ltd. All rights reserved.",
  footerSubtitle: DEFAULT_SUBTITLE,
  footerDisclaimer:
    "Tajir Chain is an EVM-compatible Layer 2 network built on the OP Stack, issued and operated by Tajir Protocol Ltd., a company incorporated in the British Virgin Islands under company number 2217680, registered office Craigmuir Chambers, Road Town, Tortola. TJR is the native token of Tajir Chain.\n\nThis website is for informational purposes only and does not constitute an offer, solicitation, or recommendation to buy, sell, or hold any digital asset, security, or financial instrument in any jurisdiction. Nothing herein constitutes investment, legal, accounting, or tax advice.\n\nDigital assets carry significant risk, including total loss of value. Availability of the network and related services may be restricted in certain jurisdictions. Read the risk disclosure before using any Tajir Chain service.",
  footerAuditBadgeDark:
    "https://res.cloudinary.com/dd98ifrkd/image/upload/v1787733955/Auditted_By_Badge_dark_with_box_1_zjvwvx.svg",
  footerAuditBadgeLight:
    "https://res.cloudinary.com/dd98ifrkd/image/upload/v1787733955/Auditted_By_Badge_light_with_box_1_lgfyok.svg",
  footerAuditBadgeUrl:
    "https://github.com/Quillhash/QuillAudit_smart_contract_audit_Reports/blob/master/Tajir%20chain%20Smart%20Contract%20Audit%20Report%20-%20QuillAudits.pdf",
  footerAuditBadgeName: "Audited by QuillAudits",
  contactEmail: "support@tajirchain.com",
  socials: [
    {
      icon: "https://d3emih4hj77qgs.cloudfront.net/images/4b4ad236-03d3-4ce3-810e-8314f13509c7",
      englishUrl: "https://x.com/tajirchain",
    },
    {
      icon: "https://d3emih4hj77qgs.cloudfront.net/images/7d8a337b-022a-4660-8a68-a565236a51c9",
      englishUrl: "https://www.instagram.com/",
    },
    {
      icon: "https://d3emih4hj77qgs.cloudfront.net/images/2f5acb88-9bda-48ab-94a5-3c90a45e75ca",
      englishUrl: "https://www.linkedin.com/",
    },
    {
      icon: "https://d3emih4hj77qgs.cloudfront.net/images/b9fa225f-3658-4066-90b0-0e6bccf65c7b",
      englishUrl: "https://t.me/TajirChain",
    },
  ],
};

export function getFooterColumns(siteUrl: string): FooterColumn[] {
  const site = siteUrl.replace(/\/$/, "");

  return [
    {
      title: "Network",
      links: [
        { label: "Tajir Chain", href: `${site}/`, app: "website" },
        { label: "Key Features", href: `${site}/key-features`, app: "website" },
        { label: "Infrastructure", href: `${site}/infrastructure`, app: "website" },
        { label: "Solutions", href: `${site}/solutions`, app: "website" },
        { label: "Roadmap", href: `${site}/roadmap`, app: "website" },
      ],
    },
    {
      title: "Developers",
      links: [
        {
          label: "Documentation",
          href: "https://docs.tajirchain.com",
          app: "docs",
          external: true,
        },
        {
          label: "Explorer",
          href: "https://tjrscan.com",
          app: "explorer",
          external: true,
        },
        {
          label: "Bridge",
          href: "https://bridge.tajirchain.com",
          app: "bridge",
          external: true,
        },
        {
          label: "GitHub",
          href: "https://github.com/Tajir-Chain",
          external: true,
        },
        {
          label: "Network Status",
          href: "https://tjrscan.com",
          app: "explorer",
          external: true,
        },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Whitepaper", href: `${site}/whitepaper`, app: "website" },
        { label: "Lite paper", href: `${site}/litepaper`, app: "website" },
        { label: "Economics", href: `${site}/economics`, app: "website" },
        { label: "Blog / news", href: `${site}/blog`, app: "website" },
        { label: "Brand kit", href: `${site}/brand-kit`, app: "website" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy policy", href: `${site}/privacy-policy`, app: "website" },
        { label: "Terms of use", href: `${site}/terms-of-use`, app: "website" },
        { label: "Cookie policy", href: `${site}/cookie-policy`, app: "website" },
        { label: "Risk disclosure", href: `${site}/risk-disclosure`, app: "website" },
        { label: "Contact", href: `${site}/contact`, app: "website" },
      ],
    },
  ];
}

export function resolveHref(href: string, app: TajirFooterApp, linkApp?: TajirFooterApp) {
  if (linkApp && linkApp === app) {
    return "/";
  }
  return href;
}

export function isExternalHref(href: string, app: TajirFooterApp) {
  if (!href.startsWith("http")) return false;
  const currentOrigin = APP_ORIGINS[app];
  if (!currentOrigin) return true;
  try {
    return new URL(href).origin !== new URL(currentOrigin).origin;
  } catch {
    return true;
  }
}

export function cleanText(value?: string) {
  return (value || "").replace(/[\u2028\u2029]/g, " ").replace(/\s+/g, " ").trim();
}

export function splitDisclaimer(value?: string) {
  if (!value) return [];
  return value
    .replace(/[\u2028\u2029]/g, "\n")
    .split(/\n{2,}/)
    .map((part) => part.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}
