"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function Movies() {
  const [query, setQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError("");

    try {
      const res = await axios.get("https://api.themoviedb.org/3/search/movie", {
        params: {
          api_key: API_KEY,
          query: query,
          language: "pt-BR",
          include_adult: false,
        },
      });
      console.log(res.data.results)

      if (res.data.results.length > 0) {
        setMovies(res.data.results);
      } else {
        setError("Filme não encontrado");
        setMovies([]);
      }
    } catch (err) {
      console.log(err);
      setError("Erro ao buscar filmes");
    }

    setLoading(false);
  };

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">
        🎬 MovieFinder (TMDb)
      </h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar filme..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Buscar
        </button>
      </div>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="border rounded overflow-hidden shadow hover:scale-105 transition"
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
              className="w-full h-72 object-cover"
            />
            <div className="p-2">
              <h2 className="font-bold">{movie.title}</h2>
              <p>{movie.release_date}</p>
            </div>
            <Link href={`/movie/${movie.id}`}>
              <span className="text-blue-600 underline p-2 block">
                Detalhes
              </span>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
