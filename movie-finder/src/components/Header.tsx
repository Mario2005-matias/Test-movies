import { useEffect, useState } from 'react';
import Link from "next/link"

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <header className={`fixed top-0 w-screen flex items-center justify-center py-2 z-50 transition-colors duration-300 ${scrolled ? 'bg-black' : 'bg-transparent'}`}>
            <div className="max-w-7xl container flex flex-row items-center justify-between px-4">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-red-600 text-2xl font-bold -mb-2">Movie</p>
                    <span className="text-sm">Finder</span>
                </div>
                <Link href="/ca" className="bg-red-600 rounded-md px-4 py-2 text-sm hover:bg-red-700 hover:duration-300">Entrar</Link>
            </div>
        </header>
    );
}
