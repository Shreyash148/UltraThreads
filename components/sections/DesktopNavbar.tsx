"use client"
import { leftBarOptions } from '@/constants'
import { SignOutButton, SignedIn } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const DesktopNavbar = () => {
  const pathname = usePathname();
  // const userId=auth();
  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col p-6'>
      <div className="flex items-center gap-3 pb-20 p-3">
          <Image
            src="/assets/logo.svg"
            alt="ultra threads"
            width={48} height={48}
          />
          <div className="text-heading3-bold text-light-1 max-lg:hidden">
            UltraThreads
          </div>
      </div>
        {
          leftBarOptions.map((options) => {
            const isActive = (pathname === options.routes)
            return (
              <Link
                href={options.routes}
                key={options.label}>
                  
                <div className={`flex flex-row gap-4 p-3 rounded-lg max-lg:justify-center ${isActive ? 'bg-white text-primary-500' : ""}`}>
                  <Image
                    src={isActive ? options.activeImgDest : options.imgDestination}
                    alt={options.label}
                    height={20} width={20}
                    className='text-primary-500'
                  />
                  <h4 className='max-lg:hidden px-4'>
                    {options.label}
                  </h4>
                </div>
              </Link>
            )
          })
        }
      </div>
      <div className="p-8">
        <SignedIn>
          <SignOutButton redirectUrl='/sign-in'>
            <Link href='/sign-in' className='flex flex-row gap-4 p-3 cursor-pointer'>
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24} height={24}
              />
              <h3 className='max-lg:hidden'>Logout</h3>
            </Link>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  )
}

export default DesktopNavbar