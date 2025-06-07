import Link from "next/link";
import { Movie } from "@/lib/types";
import Image from "next/image";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/${movie.id}`} className="group">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
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
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 truncate">{movie.title}</h3>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>{movie.release_date.split("-")[0]}</span>
            <span className="flex items-center gap-1">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
