import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home'

function App() {
  

  return (
      <>
    <header className="absolute inset-x-0 top-0 h-16 py-8 mx-10 bg-white">
    <h1 className="text-3xl font-semibold  font-bold rounded-sm">
      iwebstermusic
    </h1>
    </header>
    <Routes>
      <Route path="/" element={<Home className="py-8 px-8 my-8 mx-8" />} />
    </Routes>
     
  </>
  )
}

export default App
