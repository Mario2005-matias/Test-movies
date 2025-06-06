'use client'
import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function Home() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (!query) return
    setLoading(true)
    setError('')
    try {
      const res = await axios.get(`https://www.omdbapi.com/?apikey=SEU_API_KEY&s=${query}`)
      if (res.data.Response === 'True') {
        setMovies(res.data.Search)
      } else {
        setError(res.data.Error)
        setMovies([])
      }
    } catch {
      setError('Erro ao buscar filmes')
    }
    setLoading(false)
  }

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">🎬 MovieFinder</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar filme..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 rounded">Buscar</button>
      </div>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {movies.map(movie => (
          <Link key={movie.imdbID} href={`/movie/${movie.imdbID}`} className="border rounded overflow-hidden shadow">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-72 object-cover" />
            <div className="p-2">
              <h2 className="font-bold">{movie.Title}</h2>
              <p>{movie.Year}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}