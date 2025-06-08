import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RouteProgress from '@/components/RouteProgress';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MovieFinder",
  description: "Encontre informações sobre seus filmes favoritos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} bg-[#020d19] text-white min-h-screen`}
      >
        <RouteProgress />
        {children}
      </body>
    </html>
  );
}
