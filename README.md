# @tajir/footer

Shared Tajir Chain footer for website, explorer, bridge, faucet, and any other app. Dark and light themes, Tailwind CSS, live data from the settings API.

```tsx
import { TajirFooter } from "@tajir/footer";
import "@tajir/footer/styles.css";

<TajirFooter app="explorer" theme={theme} paddingX={40} />
<TajirFooter app="bridge" theme={theme} paddingLeft={24} paddingRight={48} />
```

## Install

```bash
npm install @tajir/footer
```

From a GitHub repo until the package is published:

```bash
npm install https://github.com/MT-Tajir-Chain/tajir-footer
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `app` | `"website" \| "explorer" \| "bridge" \| "faucet" \| "docs"` | required | Current product. Matching links (for example Explorer on the explorer app) resolve to `/`. |
| `theme` | `"dark" \| "light"` | `"dark"` | Host app should pass its own theme. |
| `apiUrl` | `string` | `https://dev-api.tajirchain.com/settings` | Switch to prod when ready. |
| `siteUrl` | `string` | `https://tajirchain.com` | Used for Network / Resources / Legal paths. |
| `newsletterUrl` | `string` | `https://dev-api.tajirchain.com/newsletter` | POST `{ email }`. |
| `settings` | object | fetched | Pass preloaded API data to skip the client fetch (useful in Next.js). |
| `onSubscribe` | `(email) => void` | API POST | Optional custom subscribe handler. |
| `paddingX` | `number \| string` | `64` | Left and right padding. A number is `px` (`24` → `24px`). A string is used as-is (`"2rem"`). |
| `paddingLeft` | `number \| string` | `paddingX` | Overrides left padding only. |
| `paddingRight` | `number \| string` | `paddingX` | Overrides right padding only. |

## Next.js

```tsx
"use client";

import { TajirFooter } from "@tajir/footer";
import "@tajir/footer/styles.css";

export default function LayoutFooter({ theme }: { theme: "dark" | "light" }) {
  return <TajirFooter app="explorer" theme={theme} />;
}
```

Add the package to `transpilePackages` in `next.config`:

```js
const nextConfig = {
  transpilePackages: ["@tajir/footer"],
};
```

## Vite

```tsx
import { TajirFooter } from "@tajir/footer";
import "@tajir/footer/styles.css";

<TajirFooter app="bridge" theme={theme} />
```

## Develop

```bash
npm install
npm run dev
```

Playground runs at `http://localhost:5173`. Use the toolbar to switch `app`, theme, or preview dark and light together.

```bash
npm run build
```

Builds `dist/index.js`, `dist/index.cjs`, `dist/index.d.ts`, and `dist/styles.css`.
