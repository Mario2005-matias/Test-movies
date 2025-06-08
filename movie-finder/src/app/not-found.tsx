import Link from "next/link"

export default function Notfound() {
    return (
        <div className="w-screen h-screen  flex flex-col items-center justify-center px-4">
            <h2 className="font-bold text-8xl">404</h2>
            <p className="text-center">Está página ainda não esta preparada para ti. Relaxa!! kkkk</p>
            <p>Você não deveria estar aqui</p>
            <Link href="/" className="bg-red-600 text-white px-4 py-2 rounded-md mt-2">
                Voltar
            </Link>
        </div>
    )
}