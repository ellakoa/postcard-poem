import { NextResponse } from 'next/server'

export async function GET(slug: string) {
  // Get post paths
  const data = require(`/content/posts/${slug}`)
  return NextResponse.json({ data: data.attributes })
}
