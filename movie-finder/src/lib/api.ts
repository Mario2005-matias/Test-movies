import { Movie, MovieDetails } from "./types"

const API_KEY = process.env.TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export async function fetchPopularMovies(): Promise<Movie[]> {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`)
  
  if (!res.ok) {
    throw new Error('Falha ao buscar filmes populares')
  }
  
  const data = await res.json()
  return data.results
}

export async function fetchMovieDetails(id: string): Promise<MovieDetails | null> {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`)
    
    if (!res.ok) {
      return null
    }
    
    return await res.json()
  } catch {
    return null 
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`)
  
  if (!res.ok) {
    throw new Error('Falha ao buscar filmes')
  }
  
  const data = await res.json()
  return data.results
}