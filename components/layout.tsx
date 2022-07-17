import Navbar from './navbar'
import Footer from './footer'
import Head from 'next/head'

export default function Layout({ children }:any) {
    return (
        <>
            <Head>
                <link href="http://fonts.cdnfonts.com/css/dk-au-revoir" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet" />
            </Head>
            <Navbar />
            <main className="min-h-screen bg-[rgba(102,90,52,0.2)] overflow-hidden">{children}</main>
            <Footer />
        </>
    )
}