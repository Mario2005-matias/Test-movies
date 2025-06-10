import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "../components/Header";
import { FaCalendar, FaStar, FaUser, FaChild } from "react-icons/fa";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

async function getMovie(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`,
    {
      cache: "force-cache",
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) return null;
  return res.json();
}

type Params = Promise<{id: string}>

export default async function MoviePage({ params }: { params: Params }) {
  const { id } = await params
  const movie = await getMovie(id);
  if (!movie) return notFound();

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header />
      <div className="w-full h-full flex flex-row flex-wrap justify-center gap-6 pt-10 pb-10">
        <Image
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder.png"
          }
          loading="lazy"
          alt={movie.title}
          width={300}
          height={400}
          className="rounded-md max-sm:w-[90%]"
        />

        <div className="max-w-lg max-md:mb-10 max-sm:w-[90%] px-2">
          <h1 className="text-2xl font-bold mb-6">{movie.title}</h1>

          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-row items-center justify-center gap-2">
              <div
                className={`text-white py-1 px-2 rounded ${
                  movie.adult ? "bg-red-500" : "bg-green-500"
                }`}
                title={movie.adult ? "Adulto" : "Criança"}
              >
                <p className="flex flex-row gap-2 items-center justify-center">
                  {movie.adult ? <FaUser /> : <FaChild />}
                  {movie.adult ? "Adulto" : "Criança"}
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-center gap-1">
              <FaCalendar />
              <p>{movie.release_date.slice(0, 4)}</p>
            </div>

            <div className="flex flex-row items-center justify-center gap-1">
              <FaStar className="text-yellow-400" />
              <p>{movie.vote_count}</p>
            </div>
          </div>

          <p className="my-6">{movie.overview}</p>

          <div className="flex flex-col mt-2">
            <p>
              <strong>Idioma:</strong>{" "}
              {movie.original_language === "en"
                ? "Inglês"
                : movie.original_language.toUpperCase()}
            </p>
            <p>
              <strong>Título original:</strong> {movie.original_title}
            </p>
            <p>
              <strong>Popularidade:</strong> {movie.popularity}
            </p>
            <p>
              <strong>Data de Lançamento:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Nota:</strong> {movie.vote_average}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
