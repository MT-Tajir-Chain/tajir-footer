"use client";

import { FormEvent, useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import type { TajirFooterTheme } from "./types";

type NewsletterFormProps = {
  privacyHref: string;
  newsletterUrl: string;
  theme?: TajirFooterTheme;
  onSubscribe?: (email: string) => Promise<void> | void;
};

function ToastMessage({ title, description }: { title: string; description: string }) {
  return (
    <div className="tajir-toast-copy">
      <p className="tajir-toast-title">{title}</p>
      <p className="tajir-toast-desc">{description}</p>
    </div>
  );
}

function SuccessIcon() {
  return (
    <span className="tajir-toast-icon tajir-toast-icon--success" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M2.5 7.2 5.4 10.1 11.5 3.8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ErrorIcon() {
  return (
    <span className="tajir-toast-icon tajir-toast-icon--error" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M4 4l6 6M10 4l-6 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function NewsletterForm({
  privacyHref,
  newsletterUrl,
  theme = "dark",
  onSubscribe,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!value) return;

    setStatus("loading");

    try {
      if (onSubscribe) {
        await onSubscribe(value);
      } else {
        const response = await fetch(newsletterUrl, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: value }),
        });
        if (!response.ok) {
          throw new Error("Unable to subscribe right now.");
        }
      }
      toast.success(
        <ToastMessage
          title="You're on the list"
          description="You can unsubscribe at any time."
        />,
        { icon: <SuccessIcon /> },
      );
      setEmail("");
    } catch {
      toast.error(
        <ToastMessage
          title="Couldn't subscribe"
          description="Please try again in a moment."
        />,
        { icon: <ErrorIcon /> },
      );
    } finally {
      setStatus("idle");
    }
  }

  return (
    <div className="w-full">
      <h3 className="text-[18px] font-semibold leading-[1.3] tracking-tight text-[var(--tj-heading)]">
        Stay ahead of the future of commerce
      </h3>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex h-[52px] items-center rounded-[8px] border border-[var(--tj-input-border)] bg-[var(--tj-input-bg)] p-1.5 pl-4">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            disabled={status === "loading"}
            className="min-w-0 flex-1 bg-transparent text-[14px] text-[var(--tj-heading)] outline-none placeholder:text-[var(--tj-placeholder)]"
            aria-label="Email address"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[var(--tj-gold)] text-[#1a1a1a] transition hover:bg-[var(--tj-gold-hover)] disabled:opacity-60"
            aria-label="Subscribe"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M3.5 9h10.2M10.2 5.2 14.2 9l-4 3.8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </form>
      <p className="mt-3 text-[12px] leading-[1.55] text-[var(--tj-muted)]">
        By subscribing you agree to our{" "}
        <a href={privacyHref} className="text-[var(--tj-muted)] hover:text-[var(--tj-link-hover)]">
          privacy policy
        </a>
        .
      </p>
      <ToastContainer
        className={`tajir-toast-root tajir-toast-root--${theme}`}
        toastClassName="tajir-toast"
        progressClassName="tajir-toast-progress"
        position="top-right"
        autoClose={4200}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable={false}
        theme={theme}
        transition={Slide}
      />
    </div>
  );
}
