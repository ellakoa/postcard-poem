import Preview from '../components/preview'

interface PostListProps {
  posts: any
}
export default function PostList(props: PostListProps) {
  const { posts } = props
  return (
    <ul className='grid gap-4 sm:grid-cols-2 md:grid-cols-1 '>
      {posts.map(Preview)}
    </ul>
  )
}
