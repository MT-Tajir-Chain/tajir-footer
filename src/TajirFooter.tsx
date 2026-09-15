"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { NewsletterForm } from "./NewsletterForm";
import {
  DEFAULT_API_URL,
  DEFAULT_NEWSLETTER_URL,
  DEFAULT_SITE_URL,
  DEFAULT_SUBTITLE,
  FALLBACK_SETTINGS,
  cleanText,
  getFooterColumns,
  isExternalHref,
  resolveHref,
  splitDisclaimer,
} from "./constants";
import { fetchFooterSettings } from "./fetchSettings";
import type { FooterSettings, TajirFooterProps } from "./types";

function classNames(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

function toCssSize(value?: number | string) {
  if (value == null || value === "") return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

export function TajirFooter({
  app,
  theme = "dark",
  apiUrl = DEFAULT_API_URL,
  siteUrl = DEFAULT_SITE_URL,
  newsletterUrl = DEFAULT_NEWSLETTER_URL,
  settings: settingsProp,
  className,
  paddingX = 200,
  paddingLeft,
  paddingRight,
  onSubscribe,
}: TajirFooterProps) {
  const [settings, setSettings] = useState<FooterSettings>(
    settingsProp || FALLBACK_SETTINGS,
  );

  useEffect(() => {
    if (settingsProp) {
      setSettings(settingsProp);
      return;
    }

    const controller = new AbortController();
    fetchFooterSettings(apiUrl, controller.signal)
      .then(setSettings)
      .catch(() => {
        setSettings(FALLBACK_SETTINGS);
      });

    return () => controller.abort();
  }, [apiUrl, settingsProp]);

  const logo =
    theme === "light"
      ? settings.logoLight || settings.logo || FALLBACK_SETTINGS.logoLight
      : settings.logoDark || settings.logo || FALLBACK_SETTINGS.logoDark;

  const subtitle = cleanText(settings.footerSubtitle) || DEFAULT_SUBTITLE;
  const copyright = cleanText(settings.footerDescription) || FALLBACK_SETTINGS.footerDescription;
  const disclaimer = splitDisclaimer(
    settings.footerDisclaimer || FALLBACK_SETTINGS.footerDisclaimer,
  );
  const columns = useMemo(() => getFooterColumns(siteUrl), [siteUrl]);
  const privacyHref = `${siteUrl.replace(/\/$/, "")}/privacy-policy`;

  const padX = toCssSize(paddingX) || "200px";
  const padLeft = toCssSize(paddingLeft) || padX;
  const padRight = toCssSize(paddingRight) || padX;

  return (
    <footer
      className={classNames("tajir-footer", className)}
      data-theme={theme}
      data-app={app}
      style={
        {
          "--tj-pad-left": padLeft,
          "--tj-pad-right": padRight,
        } as CSSProperties
      }
    >
      <div className="bg-[var(--tj-bg)] font-footer">
        <div className="tj-footer-inner mx-auto w-full py-12 lg:py-14">
          <div>
            <a href={siteUrl} className="inline-flex">
              <img src={logo} alt="Tajir Chain" className="h-8 w-auto md:h-9" />
            </a>
            <p className="mt-3 text-[13px] text-[var(--tj-muted)]">{subtitle}</p>
          </div>

          <div className="mt-10 flex flex-col gap-10 lg:mt-12 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 lg:flex lg:justify-between lg:gap-8">
              {columns.map((column) => (
                <nav key={column.title} aria-label={column.title} className="min-w-0 lg:flex-1">
                  <h3 className="mb-4 text-[15px] font-semibold leading-none text-[var(--tj-heading)]">
                    {column.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {column.links.map((link) => {
                      const href = resolveHref(link.href, app, link.app);
                      const external = link.external || isExternalHref(href, app);
                      return (
                        <li key={link.label}>
                          <a
                            href={href}
                            className="text-[14px] text-[var(--tj-link)] transition-colors hover:text-[var(--tj-link-hover)]"
                            {...(external
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                          >
                            {link.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              ))}
            </div>

            <div className="w-full shrink-0 lg:w-[260px]">
              <NewsletterForm
                privacyHref={privacyHref}
                newsletterUrl={newsletterUrl}
                theme={theme}
                onSubscribe={onSubscribe}
              />
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between gap-6">
            <a
              href={settings.footerAuditBadgeUrl || FALLBACK_SETTINGS.footerAuditBadgeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tj-audit-badge"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M2.2 7.3 5.4 10.4 11.8 3.6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {settings.footerAuditBadgeName || "Audited by QuillAudits"}
            </a>

            <div className="flex items-center gap-4">
              {(settings.socials || FALLBACK_SETTINGS.socials || []).map((social) => (
                <a
                  key={social._id || social.englishUrl || social.icon}
                  href={social.englishUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-5 w-5 items-center justify-center opacity-90 transition hover:opacity-100"
                >
                  <img src={social.icon} alt="" className="h-5 w-5 object-contain" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--tj-border)]">
          <div className="tj-footer-inner tj-legal mx-auto w-full py-8 lg:py-10">
            <p className="tj-legal-copy">{copyright}</p>
            <div className="tj-legal-body">
              {disclaimer.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
