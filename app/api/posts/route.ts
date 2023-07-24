import { NextResponse } from 'next/server'
import fs from 'fs'
import { join } from 'path'

export async function GET() {
  // Get post paths
  const POSTS_PATH = join(process.cwd(), 'content/posts')
  const posts: any = fs
    .readdirSync(POSTS_PATH)
    // Load data from file paths
    .map((slug: string) => {
      const data = require(`/content/posts/${slug}`)
      return { slug, data: data.attributes }
    })

  // Sort by most recent
  posts.sort((itemA: any, itemB: any) => {
    const dateA = new Date(itemA.data.date).getTime()
    const dateB = new Date(itemB.data.date).getTime()
    return dateB - dateA
  })

  return NextResponse.json(posts || [])
}
