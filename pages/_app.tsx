import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import Script from 'next/script'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl${
            process.env.NODE_ENV === 'development'
              ? `+ '&gtm_auth=8WpaeRg2dKCsVy37UTNwDw&gtm_preview=env-3&gtm_cookies_win=x'`
              : ``
          };f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NSDL34V')
        `}
      </Script>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
