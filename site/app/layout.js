import "./globals.css";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollReveal from "./components/ScrollReveal/ScrollReveal";

// Self-hosted via Next.js → zéro round-trip réseau externe, préchargé automatiquement
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata = {
  title: "PriStyle | Haute Couture Africaine — Mode Wax Sur Mesure",
  description:
    "Découvrez nos créations uniques en tissu wax : boubous, robes africaines, ensembles homme, tenues de mariage. Haute couture africaine confectionnée avec passion.",
  keywords:
    "wax, mode africaine, haute couture, boubou, robe africaine, tenue mariage africain, pristyle",
  openGraph: {
    title: "PriStyle | Haute Couture Africaine",
    description:
      "Des créations uniques en tissu wax, confectionnées avec passion et savoir-faire artisanal.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${playfairDisplay.variable} ${inter.variable} ${cormorantGaramond.variable}`}
    >
      <head>
        {/* Préconnexion Supabase pour charger les images plus vite */}
        <link rel="preconnect" href="https://hycvllacbcyetrvogpdl.supabase.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://hycvllacbcyetrvogpdl.supabase.co" />
      </head>
      <body>
        <noscript>
          <style>{`.reveal,.reveal-left,.reveal-right,.reveal-scale{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Navbar />
        {children}
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
