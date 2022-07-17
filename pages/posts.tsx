import fs from 'fs';
import { join } from 'path';
import Preview from '../components/preview';

const POSTS_PATH = join(process.cwd(), 'content/posts');

export default function Posts({posts}:{posts:any}) {
    
    return (
        <div className='container max-w-3xl my-10 px-6'>
            <h1 className='font-bold text-5xl mb-10'>Posts</h1>
            <ul className=''>{posts && posts.map(Preview)}</ul>
            {!posts && <p>No posts found!</p>}
        </div>
    )
}
export async function getStaticProps(context:any) {
    // Get post paths
    const paths:any = fs
        .readdirSync(POSTS_PATH)
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        //   Map the path into the static paths object required by Next.js
        .map((slug) => ({params: { slug }}))
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
        props: { posts }, // will be passed to the page component as props
    }
}