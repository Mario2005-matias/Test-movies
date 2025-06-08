
export default function Header () {

    return (
        <header className="fixed top-0 w-screen flex items-center justify-center py-4">
            <div className="max-w-7xl container flex flex-row items-center justify-between px-4">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-red-600 text-2xl font-bold -mb-2">Movie</p>
                    <span className="text-sm ">Finder</span>
                </div>
                <button className="bg-red-600 rounded-md px-4 py-2 text-sm hover:bg-red-700 hover:duration-300">Entrar</button>
            </div>
        </header>
    )
}