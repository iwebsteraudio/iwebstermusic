import { useState } from 'react'
import './App.css'

function App() {
  

  return (
      <>
    <header className="absolute inset-x-0 top-0 h-16 py-8 mx-10 bg-white">
    <h1 className="text-3xl font-semibold  font-bold rounded-sm">
      iwebstermusic
    </h1>
    </header>
    </ Nav>
     <section className='flex flex-col text-1 font-sans bg-white'>
        <p className='py-8 px-8 my-8 mx8 text-gray-900'>Hello! I'm &nbsp;
         <b>Ian Webster,</b>
         &nbsp; an acoustic guitarist and singer based in Greater Manchester. I'm available for weddings and events across the UK.</p>
         <p className='px-8 my-8 mx8 text-gray-900'>I have been performing in bands as a bass-player and also as a solo acoustic player for over 20 years in various venues across the north-west.</p>
      </section>
  </>
  )
}

export default App
