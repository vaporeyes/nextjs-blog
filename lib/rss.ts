// ABOUTME: RSS feed generation script that creates an RSS feed from all blog posts
// ABOUTME: Uses the feed package to generate rss.xml in the public directory

import { Feed } from 'feed'
import fs from 'fs'
import path from 'path'
import { getSortedPostsData, getPostData } from '../components/posts'

export async function generateRssFeed() {
  const postsMetadata = getSortedPostsData()
  
  const siteURL = process.env.SITE_URL || 'https://josh.contact'
  const author = {
    name: 'Josh',
    email: 'contact@josh.contact',
    link: siteURL
  }

  const feed = new Feed({
    title: 'ineluctable modalities',
    description: 'A personal blog covering various topics',
    id: siteURL,
    link: siteURL,
    language: 'en',
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Josh`,
    updated: new Date(),
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteURL}/rss.xml`,
      atom: `${siteURL}/atom.xml`
    },
    author
  })

  // Add posts to feed
  for (const postMeta of postsMetadata as any[]) {
    const fullPost = await getPostData(postMeta.id)
    const url = `${siteURL}/posts/${fullPost.id}`
    
    feed.addItem({
      title: fullPost.title,
      id: url,
      link: url,
      description: fullPost.contentHtml ? 
        fullPost.contentHtml.replace(/<[^>]*>?/gm, '').substring(0, 200) + '...' : 
        fullPost.title,
      content: fullPost.contentHtml || '',
      author: [author],
      date: new Date(fullPost.date),
      category: fullPost.tags?.map(tag => ({ name: tag })) || []
    })
  }

  // Generate RSS 2.0 feed
  const rss = feed.rss2()
  
  // Write RSS file to public directory
  const rssPath = path.join(process.cwd(), 'public', 'rss.xml')
  fs.writeFileSync(rssPath, rss)
  
  // Also generate Atom feed
  const atom = feed.atom1()
  const atomPath = path.join(process.cwd(), 'public', 'atom.xml')
  fs.writeFileSync(atomPath, atom)
  
  console.log('RSS and Atom feeds generated successfully')
}