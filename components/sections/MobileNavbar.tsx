"use client"
import { bottomBarOptions } from '@/constants'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const MobileNavbar = () => {
  const pathname = usePathname();
  return (
    <section className='bottombar'>
      <div className='flex w-full flex-1 flex-row  justify-around p-4'>
        {bottomBarOptions.map((options) => {
          const isActive = (pathname === options.routes)
          return (
            <Link
              href={options.routes}
              key={options.label}>
              <div className={`flex flex-col items-center rounded-full p-4 ${isActive ? 'bg-white text-primary-500' : ""}`}>
                <Image
                  src={isActive ? options.activeImgDest : options.imgDestination}
                  alt={options.label}
                  height={20} width={20}
                  className='text-primary-500'
                />
                <h4 className='max-sm:hidden'>
                  {options.label}
                </h4>
              </div>
            </Link>
          )
        })
        }
      </div>
    </section>
  )
}

export default MobileNavbar