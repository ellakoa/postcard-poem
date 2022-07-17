import fs from 'fs';
import { join } from 'path';
const POSTS_PATH = join(process.cwd(), 'content/posts');
import Postcard from '../../components/postcard';
import Link from 'next/link';

export default function Post({attributes,html,next,prev}:any) {
    const { title, description, date, author } = attributes
    return (
        <article className='container max-w-4xl px-3 md:px-6 my-10'>
            <header className='prose lg:prose-xl pb-5 mb-5 border-b border-gray-100 text-center mx-auto'>
                <h1>{ title }</h1>
                <p>{ description }</p>
                <p className=" text-base leading-6 font-medium text-gray-500">
                    <time> { (new Date(date)).toDateString() } by <a>{ author }</a> </time>
                </p>
            </header>
            <Postcard {...attributes}/>
            { html && <div className='prose lg:prose-xl my-10' dangerouslySetInnerHTML={{__html: html}}/> }
            {next && 
                <ul className='flex justify-between flex-wrap my-10'>
                    { 
                        prev.slug && 
                        <li>
                            <Link href={prev.slug}>
                                <a className='hover:underline'>&#8592; {prev.title}</a>
                            </Link>
                        </li>
                    }
                    { 
                        next.slug && 
                        <li className='ml-auto'>
                            <Link href={next.slug}>
                                <a className='hover:underline'>{next.title} &#8594;</a>
                            </Link>
                        </li>
                    }
                </ul>
            }
        </article>
    )
}
export async function getStaticProps(context:any) {
    const { slug } = context.params

    // Get data for next/prev links
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
    const postIndex:any = posts.findIndex(post => post.slug === slug)
    const next = {
        title: posts[postIndex-1]?.attributes.title || null,
        slug: posts[postIndex-1]?.slug || null
    }
    const prev = {
        title: posts[postIndex+1]?.attributes.title || null,
        slug: posts[postIndex+1]?.slug || null
    }
    
    // Get article data
    const markdown = require(`/content/posts/${slug}.md`)
    const { attributes, html } = markdown
    if (!markdown) {
        return {
            notFound: true,
        }
    }
    return {
        props: { slug, attributes, html, next, prev }, // will be passed to the page component as props
    }
}
export async function getStaticPaths(args:any) {
    // Get paths
    const paths = fs
      .readdirSync(POSTS_PATH)
      // Remove file extensions for page paths
      .map((path) => path.replace(/\.mdx?$/, ''))
      // Map the path into the static paths object required by Next.js
      .map((slug) => ({ params: { slug } }));
    return {
      paths: paths,
      fallback: false,
    };
};