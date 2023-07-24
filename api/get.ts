import { headers } from 'next/headers'

export const fetchData = async (path: 'posts' | 'settings' | 'post') => {
  const headersList = headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto')
  const res = await fetch(`${protocol}://${host}/api/${path}`)
  const data = await res.json()
  return data
}
export const fetchPost = async (slug: string) => {
  const headersList = headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto')
  const res = await fetch(`${protocol}://${host}/api/posts/${slug}`)
  const data = await res.json()
  const posts = await fetchData('posts')
  const currentIndex = posts.indexOf(data)
  data.next = posts[currentIndex + 1]
  data.prev = posts[currentIndex - 1]
  return data
}
