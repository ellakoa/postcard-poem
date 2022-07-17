import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { attributes, react as HomeContent } from '../content/home.md';
import fs from 'fs';
import { join } from 'path';
const POSTS_PATH = join(process.cwd(), 'content/posts');
import Postcard from '../components/postcard';
import Link from 'next/link';

const Home: NextPage = ({latest}:any) => {
  const { title, welcome } = attributes
  return (
    <>
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="relative">
            <div className="w-full h-auto object-cover bg-blend-darken">
                <Image src="/img/masthead-bg.jpg" width={4500} height={1385} alt="" />
            </div>
        </div>
        <div className="container prose lg:prose-xl text-center my-10 p-3">
            <h1 className="font-serif text-5xl">{title}</h1>
            <p>{welcome}</p>
        </div>
        <article className='container max-w-4xl px-3 md:px-6 my-10 flex flex-col'>
            <Postcard {...latest.attributes} />
            <Link href={`/posts/${latest.slug}`}>
                <a className='ml-auto underline'>Read more</a>
            </Link>
        </article>
        
    </>
  )
}

export async function getStaticProps() {
    // Get data for latest
    const paths = fs
      .readdirSync(POSTS_PATH)
      // Remove file extensions for page paths
      .map((path) => path.replace(/\.mdx?$/, ''))
      // Map the path into the static paths object required by Next.js
      .map((slug) => ({ params: { slug } }));
    // Load post front matter attributes from paths
    const posts = paths.map(({params}:{params:any}) => {
        const { slug } = params
        const markdown = require(`/content/posts/${slug}.md`)
        const { attributes } = markdown
        return { slug, attributes }
    })
    // Sort by most recent
    posts.sort((itemA:any,itemB:any) => {
        const dateA = (new Date(itemA.attributes.date)).getTime()
        const dateB = (new Date(itemB.attributes.date)).getTime()
        return dateB - dateA
    })
    return {
        props: { latest: posts[0] }, // will be passed to the page component as props
    }
}

export default Home
