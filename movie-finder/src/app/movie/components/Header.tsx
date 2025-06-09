import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className=" w-full flex items-center justify-center py-4 bg-[#020d19]">
      <div className="max-w-7xl container flex flex-row items-center justify-between px-4">
        <div className="flex flex-col items-center justify-center">
          <p className="text-red-600 text-2xl font-bold -mb-2">Movie</p>
          <span className="text-sm ">Finder</span>
        </div>
        <Link
          href="/"
          className="bg-red-600 text-white rounded-md py-2 px-4 flex flex-row items-center justify-center gap-2 hover:bg-red-800 hover:duration-300 hover:scale-100 text-sm hover:gap-1 duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>
      </div>
    </header>
  );
}
