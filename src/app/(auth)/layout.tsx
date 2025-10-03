import React, {ReactNode} from 'react'

import Link from "next/link";
import Image from "next/image";

const AuthLayout   = ({children} : {children: ReactNode}) => {
  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo">
          <Image src="/assets/icons/logo.svg" alt={"Signalist Logo"} width={140} height={32}
            className="h-8 w-auto"
          />
        </Link>
        <div className="pb-6 lg:pb-8 flex-1 ">
          {children}
        </div>
      </section>
      <section className="auth-right-section">
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <blockquote className="auth-blockquote">
            Signalist is your gateway to the financial markets, providing real-time data, expert analysis, and powerful tools to help you make informed investment decisions with confidence.
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <cite className='auth-testimonial-author'>- Ethan R.</cite>
              <p className='max-md:text-xs text-gray-400'>Retail Investor</p>
            </div>
            <div className='flex items-center gap-4'>
              {[1,2,3,4,5].map((index) => (
                <Image key={index} 
                  src="/assets/icons/star.svg" 
                  alt="star" 
                  width={20} 
                  height={20}
                  className='w-5 h-5'
                  />
              ))}
            </div>
          </div>
        </div>
        <div className='flex-1 relative'>
          <Image src="/assets/images/dashboard.png" alt="dashboard-preview" 
          height={1440} 
          width={1150}
          className='auth-dashboard-preview absolute top-0'
          />
        </div>
      </section>
    </main>
  )
}

export default AuthLayout
