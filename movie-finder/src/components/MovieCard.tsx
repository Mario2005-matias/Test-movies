/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

export default function MovieCard({id, imgUrl, title, date}: any) {
  return (
    <div key={id} className="border rounded overflow-hidden shadow hover:scale-105 transition">
      <Image
        src={imgUrl}
        width={500}
        height={750}
        alt={title}
        className="w-full h-72 object-cover"
      />
      <div className="p-2">
        <h2 className="font-bold">{title}</h2>
        <p>{date}</p>
      </div>
    </div>
  );
}
