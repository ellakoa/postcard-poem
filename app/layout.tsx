import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <main className='bg-[url("/img/svg/cream-paper-texture.svg")] min-h-screen overflow-hidden relative'>
        {children}
      </main>
      <Footer />
    </>
  )
}
