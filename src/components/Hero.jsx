import React from 'react'

const Hero = () => {
  return (
    <section className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-24'>
        <div className='container mx-auto px-6 text-center'>
            
            <h1 className='text-4x1 md:text-6x1 font-bold mb-6'>
                Comercio
            </h1>

            <p className='text-gray-600 text-lg mb-8'>
                los mejores productos
            </p>

            <button className='bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition'>
                Ver productos
            </button>

        </div>
    </section>
  )
}

export default Hero


