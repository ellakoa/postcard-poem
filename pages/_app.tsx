import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import Head from 'next/head'
import Meta from '../components/meta'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <Meta />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
