import "./globals.css";

export const metadata = {
  title: "Sublime Wax | Haute Couture Africaine — Mode Wax Sur Mesure",
  description:
    "Découvrez nos créations uniques en tissu wax : boubous, robes africaines, ensembles homme, tenues de mariage. Haute couture africaine confectionnée avec passion.",
  keywords:
    "wax, mode africaine, haute couture, boubou, robe africaine, tenue mariage africain, sublime wax",
  openGraph: {
    title: "Sublime Wax | Haute Couture Africaine",
    description:
      "Des créations uniques en tissu wax, confectionnées avec passion et savoir-faire artisanal.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
