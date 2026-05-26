import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import PublicShell from "@/components/layout/PublicShell";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/react";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-hanken",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SOMHi Arquitectura Técnica — Precisión y Alma",
    template: "%s | SOMHi Arquitectura Técnica",
  },
  description:
    "SOMHi Arquitectura Técnica. Dirección de obra, gestión de proyectos y control de calidad en Barcelona. Arquitecto técnico Benito Villa.",
  keywords: [
    "arquitectura técnica",
    "dirección de obra",
    "Barcelona",
    "arquitecto técnico",
    "Benito Villa",
    "SOMHi",
    "rehabilitación edificios",
    "obra nueva",
  ],
  authors: [{ name: "Benito Villa", url: "https://somhiat.com" }],
  creator: "SOMHi Arquitectura Técnica",
  metadataBase: new URL("https://somhiat.com"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: "ca_ES",
    url: "https://somhiat.com",
    siteName: "SOMHi Arquitectura Técnica",
    title: "SOMHi Arquitectura Técnica — Precisión y Alma",
    description:
      "Dirección de ejecución de obra, coordinación de seguridad y salud, y control de calidad en construcción. Barcelona.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOMHi Arquitectura Técnica",
    description: "Dirección de obra y control de calidad en Barcelona.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/api/favicon",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`dark ${hankenGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning className="bg-background text-on-background antialiased min-h-screen flex flex-col">
        <LanguageProvider>
          <PublicShell>{children}</PublicShell>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}

