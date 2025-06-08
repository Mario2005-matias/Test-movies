import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "../components/Header";
import { Calendar, StarIcon } from "lucide-react"

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

async function getMovie(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovie(params.id);

  if (!movie) return notFound();

  return (
    <div className='flex flex-col items-center'>
      <Header />
      <div className="max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-md shadow mb-4 max-w-md px-2 ">
            <Image
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/placeholder.png"
              }
              alt={movie.title}
              width={100}
              height={100}
              className="object-fill"
            />
        </div>
        <div className="text-sm">
          <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row items-center justify-center gap-2">
                <p className={`${movie.adult} ? "bg-red-500" : "bg-white"`}>adult</p>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
                <Calendar/>
                <p>{movie.release_date}</p>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
                <StarIcon/>
                <p>{movie.vote_count}</p>
            </div>
          </div>

          <p className="mt-2">{movie.overview}</p>

          <div className="flex flex-col items-center justify-center text-sm">
              <p>Idioma: {movie.original_language}</p>
              <p>Titulo original: {movie.title}</p>
              <p>Poster maior: {movie.popularity}</p>
              <p><strong>Data de Lançamento:</strong> {movie.release_date}</p>
              <p><strong>Nota:</strong> {movie.vote_average}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
