export type TajirFooterTheme = "dark" | "light";

export type TajirFooterApp =
  | "website"
  | "explorer"
  | "bridge"
  | "faucet"
  | "docs"
  | (string & {});

export type FooterSocial = {
  icon: string;
  englishUrl?: string;
  turkishUrl?: string;
  arabicUrl?: string;
  subAccounts?: Array<{ name: string; url: string }>;
  _id?: string;
};

export type FooterSettings = {
  _id?: string;
  logo?: string;
  logoDark?: string;
  logoLight?: string;
  footerDescription?: string;
  footerSubtitle?: string;
  footerDisclaimer?: string;
  footerAuditBadgeDark?: string;
  footerAuditBadgeLight?: string;
  footerAuditBadgeUrl?: string;
  footerAuditBadgeName?: string;
  contactEmail?: string;
  socials?: FooterSocial[];
  privacyPolicy?: string;
  termConditions?: string;
  cookiePolicy?: string;
  securityComplaince?: string;
};

export type FooterLink = {
  label: string;
  href: string;
  app?: TajirFooterApp;
  external?: boolean;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type TajirFooterProps = {
  app: TajirFooterApp;
  theme?: TajirFooterTheme;
  apiUrl?: string;
  siteUrl?: string;
  newsletterUrl?: string;
  settings?: FooterSettings;
  className?: string;
  paddingX?: number | string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  onSubscribe?: (email: string) => Promise<void> | void;
};
