'use client'
import Header from "@/components/Header";
import Movies from "@/components/Movies";
import Styles from "./page.module.css";
import { ProgressProvider } from '@bprogress/next/pages';
import Head from "next/head";

export default function Home() {
  return (
    <div>
       <Head>
        <title>Home | MovieFinder</title>
        <meta name="description" content="Página principal do website moviefinder" />
      </Head>
      <ProgressProvider
      height="4px"
      color="#fffd00"
      options={{ showSpinner: false }}
      shallowRouting
    >
        <Header />
        <main
          className={`${Styles.bgImage} w-full min-h-screen flex flex-col items-center justify-center`}
        >
          <h1 className="max-w-xl text-3xl sm:text-5xl text-center pt-24 text-white font-bold px-4">
            Filmes, programas de TV e muito mais ilimitados
          </h1>
          <Movies />
        </main>
      </ProgressProvider>
    </div>
  );
}
