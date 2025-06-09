/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Info } from "lucide-react";
import Styles from "../app/page.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function Movies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const handleSearch = async () => {
    if (!query) {
      toast.warn("Digite algo para buscar!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&language=pt-BR&include_adult=false`,
        {
          cache: "force-cache",
          next: { revalidate: 60 },
        }
      );

      if (!res.ok) throw new Error("Erro na resposta da API");

      const data = await res.json();

      if (data.results.length > 0) {
        setMovies(data.results);
        //toast.success("Filmes carregados com sucesso!");
      } else {
        setMovies([]);
        toast.info("Nenhum filme encontrado.");
      }
    } catch (err) {
      toast.error("Erro ao buscar filmes. Tente novamente.");
    }

    setLoading(false);
  };

  return (
    <div className="px-4 max-w-4xl mx-auto">
      <p className="text-center">
        Pronto para assistir? Desfrute dos melhores filmes de forma grátis e
        segura
      </p>

      <div className="flex items-center justify-center gap-2 my-4 ">
        <input
          type="text"
          placeholder="Buscar filme..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`${Styles.input} flex-1 py-2 px-3 rounded border border-gray-500 outline-none backdrop-blur-xs`}
        />
        <button
          onClick={handleSearch}
          className="bg-red-600 flex flex-row gap-2 items-center justify-center text-white px-4 py-2 rounded hover:bg-red-700 hover:duration-300"
        >
          Buscar
        </button>
      </div>

      {loading && (
        <div>
          <p>Carregando...</p>
        </div>
      )}

      <div className="grid grid-cols-1 min-[413px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 mb-10">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-black rounded overflow-hidden">
            <Image
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/placeholder.png"
              }
              width={500}
              height={750}
              alt={movie.title}
              className="w-full h-60 object-cover hover:scale-110 duration-300"
            />
            <div className="flex flex-row items-center justify-between px-3 py-2">
              <div>
                <div className="h-6 overflow-clip">
                  <h2 className="font-bold">{movie.title}</h2>
                </div>
                <p>{movie.release_date?.slice(0, 4)}</p>
              </div>
              <div>
                <Link href={`/movie/${movie.id}`}>
                  <Info />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
