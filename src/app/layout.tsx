import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import Script from "next/script";
import RevealObserver from "@/components/RevealObserver";
import "./globals.css";

const serif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Whitecombe Roofing | Pitched roofing across Surrey since 1994",
  description:
    "Family-run pitched and flat roofing across Surrey. Full reroofs, repairs and leadwork with one written price and a 15-year insurance-backed guarantee.",
};

export const viewport: Viewport = {
  themeColor: "#F2EFE8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={serif.variable} suppressHydrationWarning>
      <head>
        {/* Reveal styles only hide content once we know scripts are running. */}
        <Script id="js-flag" strategy="beforeInteractive">
          {"document.documentElement.classList.add('js')"}
        </Script>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=swap"
        />
      </head>
      <body>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
