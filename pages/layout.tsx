import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        <main className=' min-h-screen overflow-hidden relative'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
