import Footer from '@/components/footer'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Postcard poems',
  description: 'Postcard poetry',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        <main className='bg-[url("/img/svg/cream-paper-texture.svg")] min-h-screen overflow-hidden relative'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
