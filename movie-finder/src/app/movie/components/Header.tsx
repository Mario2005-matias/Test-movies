import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-screen px-4 py-4">
      <div className="container flex flex-row items-center justify-between ">
          <p>MovieFinder</p>
          <Link href="/" className="bg-blue-700 text-white rounded-md py-2 px-4 flex flex-row items-center justify-center gap-2 hover:bg-blue-800 hover:duration-300 hover:scale-100 text-sm">
            <ArrowLeft className='w-4 h-4'/>
            Voltar
          </Link>
      </div>
    </header>
  );
}
