import Navbar from './navbar'
import Footer from './footer'
import Head from 'next/head'

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <main className='min-h-screen bg-[rgba(102,90,52,0.2)] overflow-hidden'>
        {children}
      </main>
      <Footer />
    </>
  )
}
