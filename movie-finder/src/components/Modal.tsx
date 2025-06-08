'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"

export default function Modal () {
    const [close, setClose] = useState(false)

    const hendleCloseModal = () => {
        setClose(true)
    }

    return (
        <div>
            <button onClick={hendleCloseModal}>X</button>
            <h1>Modal</h1>
        </div>
    )
}