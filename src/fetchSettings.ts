import type { FooterSettings } from "./types";
import { DEFAULT_API_URL } from "./constants";

export async function fetchFooterSettings(
  apiUrl: string = DEFAULT_API_URL,
  signal?: AbortSignal,
): Promise<FooterSettings> {
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: { Accept: "application/json" },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to load footer settings (${response.status})`);
  }

  return (await response.json()) as FooterSettings;
}

export async function subscribeToNewsletter(url: string, email: string) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Unable to subscribe right now.");
  }
}
