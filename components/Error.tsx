import Image from 'next/image'
import React from 'react'

const Error = () => {
  return (
    <>
      <section className='absolute flex justify-center items-center h-screen w-full bg-cyan-950 top-0 bottom-0 left-0 right-0 z-50'>
      <div className="flex flex-col-reverse min-w-48">
        <div className="block px-5 py-10 w-full ">
          <h1 className='text-primary-500 text-heading1-bold'>Page Not Found</h1>
          <p className='text-violet-400 text-base-medium'>We can't seem to find the page you're looking for. Please check the URL for any typos.</p>
          
        </div>
        <div>
          <Image src="/assets/Error.png" alt="" className='flex self-center justify-center m-auto' height={200} width={200}/>
        </div>
      </div>
    </section>
    </>
  )
}

export default Error