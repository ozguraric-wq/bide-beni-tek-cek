import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bi’de Beni Tek Çek | Belgesel Dizi Projesi",
  description:
    "Eskişehir’in 14 ilçesini insan, mekân ve hafıza üzerinden anlatan belgesel dizi projesi sunumu.",
  icons: {
    icon: "./favicon.svg",
    shortcut: "./favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
