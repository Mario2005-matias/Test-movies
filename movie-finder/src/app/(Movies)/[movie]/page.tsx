import { fetchMovieDetails } from '@/lib/api'
import { notFound } from 'next/navigation'
import Image from "next/image"

export default async function MovieDetails({ params }: { params: { id: string } }) {
  const movie = await fetchMovieDetails(params.id)
  
  if (!movie) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
         {movie.poster_path && (
                   <Image
                     src={
                       movie.poster_path
                         ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                         : "/fallback.jpg"
                     } // uma imagem local de fallback
                     width={500}
                     height={750}
                     alt={movie.title}
                     className="w-full h-72 object-cover"
                   />
                 )}
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-blue-500 px-2 py-1 rounded">
              {movie.vote_average.toFixed(1)}
            </span>
            <span>{movie.release_date.split('-')[0]}</span>
            <span>{movie.runtime} min</span>
          </div>
          
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Sinopse</h2>
            <p className="text-gray-300">{movie.overview}</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Gêneros</h2>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}