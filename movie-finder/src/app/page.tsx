"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import Header from "@/components/Header"
import Movies from "@/components/Movies"
import Styles from "./page.module.css"
import { useState } from "react"
export default function Home() {
  const [modal, setModal] = useState(false)

  const handleOpenModal = () => {
    setModal(true)
  }
  return (
      <div className="">
        <Header/>
        <main className={`${Styles.bgImage} w-full min-h-screen flex flex-col items-center justify-center`}>
          <h1 className="max-w-xl text-3xl sm:text-5xl text-center text-white font-bold px-4">
            Filmes, programas de TV e muito mais ilimitados
          </h1>
          <Movies/>

          <p onClick={handleOpenModal} >Modal</p>
        </main>
      </div>
  );
}
