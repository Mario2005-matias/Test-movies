import axios from 'axios'

export default async function MovieDetail({ params }: { params: { id: string } }) {
  const res = await axios.get(`https://www.omdbapi.com/?apikey=SEU_API_KEY&i=${params.id}&plot=full`)
  const movie = res.data

  if (!movie || movie.Response === 'False') {
    return <p className="p-4 text-red-500">Filme não encontrado</p>
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <img src={movie.Poster} alt={movie.Title} className="w-full max-w-xs mx-auto mb-4" />
      <h1 className="text-2xl font-bold">{movie.Title}</h1>
      <p><strong>Gênero:</strong> {movie.Genre}</p>
      <p><strong>Lançamento:</strong> {movie.Released}</p>
      <p><strong>Nota:</strong> {movie.imdbRating}</p>
      <p className="mt-2">{movie.Plot}</p>
    </div>
  )
}