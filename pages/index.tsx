import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import {
  getSortedPostsData,
  getSortedFitnessFilesData,
  getSortedRecipesFilesData
} from '../components/posts'
import fs from 'fs'
import path from 'path'
import { generateRssFeed } from '../lib/rss'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  const fitnessFilesData = getSortedFitnessFilesData()
  const recipeFilesData = getSortedRecipesFilesData()
  
  // Create search index
  const searchIndex = [
    ...allPostsData.map(post => ({ ...post, type: 'post', url: `/posts/${post.id}` })),
    ...fitnessFilesData.map(item => ({ ...item, type: 'fitness', url: `/fitness/${item.id}` })),
    ...recipeFilesData.map(recipe => ({ ...recipe, type: 'recipe', url: `/recipes/${recipe.id}` }))
  ]
  
  // Write search index to public directory
  const searchIndexPath = path.join(process.cwd(), 'public', 'search.json')
  fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2))
  
  // Generate RSS feed
  await generateRssFeed()
  
  return {
    props: {
      allPostsData,
      fitnessFilesData,
      recipeFilesData
    }
  }
}

export default function Home({
  allPostsData,
  recipeFilesData
}) {
  return (
    <Layout home>
      <Head>
        <title>ineluctable modalities</title>
      </Head>
      <section>
        <h1 className='text-xl font-bold'>
          <Link href='/about'>about me</Link>
          <br />
          <Link href='/reading'>reading list</Link>
          <br />
          <Link href='/fitness'>fitness</Link>
          <br />
          <Link href="https://notes.josh.contact">notes</Link>
        </h1>
        <h1 className='text-xl font-bold'>blog posts</h1>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <span>{date}</span>
              {` `}
              <Link href={`/posts/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
        <h1 className='text-xl font-bold'>recipe posts</h1>
        <ul>
          {recipeFilesData.map(({ id, date, title }) => (
            <li key={id}>
              <span>{date}</span>
              {` `}
              <Link href={`/recipes/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
