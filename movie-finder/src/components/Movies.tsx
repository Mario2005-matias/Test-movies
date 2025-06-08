/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Styles from "../app/page.module.css";

export default function Movies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const handleSearch = async () => {
  if (!query) return;
  setLoading(true);
  setError("");

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR&include_adult=false`,
      {
        cache: "force-cache", 
        next: { revalidate: 60 } 
      }
    );

    if (!res.ok) throw new Error("Erro na resposta da API");

    const data = await res.json();

    if (data.results.length > 0) {
      setMovies(data.results);
    } else {
      setError("Filme não encontrado");
      setMovies([]);
    }
  } catch (err) {
    setError("Erro ao buscar filmes");
  }

  setLoading(false);
};


  return (
    <div className="p-4 max-w-4xl mx-auto ">
      <p className="text-center text-sm">
        Pronto para assistir? Desfrute dos melhores filmes de forma grátis e
        segura
      </p>
      <div className="flex gap-2 my-4">
        <input
          type="text"
          placeholder="Buscar filme..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`${Styles.input} flex-1 py-2 px-3 rounded border border-gray-500 outline-none backdrop-blur-xs`}
        />
        <button
          onClick={handleSearch}
          className="bg-red-600 flex flex-row gap-2 items-center justify-center text-white px-4 rounded  hover:bg-red-700 hover:duration-300"
        >
          Buscar
        </button>
      </div>

      {loading && (
        <div>
          <p>Carregando...</p>
        </div>
      )}
      {error && (
        <div>
          <p className="text-red-600">{error}</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-black border rounded overflow-hidden shadow hover:scale-105 transition"
          >
            <Image
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/placeholder.png"
              }
              width={500}
              height={750}
              alt={movie.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-2">
              <h2 className="font-bold">{movie.title}</h2>
              <p>{movie.release_date?.slice(0, 4)}</p>
            </div>
            <Link href={`/movie/${movie.id}`}>
              <span className="text-blue-600 underline p-2 block">
                Detalhes
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
