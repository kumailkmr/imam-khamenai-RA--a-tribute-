import { Amiri, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import SoundToggle from "@/components/SoundToggle";

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["latin", "arabic"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "In Memoriam: Sayyid Ali Khamenei",
  description: "Official memorial and state funeral arrangements for the Supreme Leader of the Islamic Republic of Iran.",
  openGraph: {
    title: "In Memoriam: Sayyid Ali Khamenei",
    description: "Official memorial and state funeral arrangements for the Supreme Leader of the Islamic Republic of Iran.",
    url: "https://khamenei-tribute.example.com",
    siteName: "State Memorial",
    images: [
      {
        url: "/images/portrait-placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "Portrait of Sayyid Ali Khamenei",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "In Memoriam: Sayyid Ali Khamenei",
    description: "Official memorial and state funeral arrangements for the Supreme Leader of the Islamic Republic of Iran.",
    images: ["/images/portrait-placeholder.jpg"],
  },
};

export default function RootLayout({ children }) {
  const analyticsUrl = process.env.NEXT_PUBLIC_ANALYTICS_URL;
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  return (
    <html lang="en">
      <body
        className={`${amiri.variable} ${inter.variable} ${ibmPlexMono.variable} font-inter antialiased bg-ink text-parchment overflow-x-hidden`}
      >
        {analyticsUrl && analyticsId && (
          <script defer data-domain={analyticsId} src={analyticsUrl}></script>
        )}
        <AccessibilityProvider>
          {children}
          <SoundToggle />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
