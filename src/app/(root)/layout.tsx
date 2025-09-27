import React, {ReactNode} from 'react'
import Header from "@/app/(root)/_components/Header";

const RootLayout   = ({children} : {children: ReactNode}) => {
  return (
    <main className="min-h-screen text-gray-400">
      <Header />
      <div className="container py-10">
        {children}
      </div>
    </main>
  )
}
export default RootLayout  
