import type { Metadata } from "next";
import { Poppins } from 'next/font/google'
import "./globals.css";
import RouteProgress from '@/components/RouteProgress';
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] })


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
        className={`${poppins.className} bg-[#020d19] text-white min-h-screen`}
      >
        <RouteProgress />
        {children}
      </body>
    </html>
  );
}
