import Movies from "@/components/Movies"
export default function Home() {
  return (
      <div>
        {/*<main className="w-screen h-60 bg-[url('/assets/bg.jpg')] bg-cover bg-center flex flex-col items-center justify-center">
          <h1 className="text-white text-3xl">
            Filmes, programas de TV e muito mais ilimitados
          </h1>
        </main>*/}
        <Movies/>
      </div>
  );
}
