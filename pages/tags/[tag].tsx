// ABOUTME: Dynamic tag page that displays all content items with a specific tag
// ABOUTME: Uses getStaticPaths for all unique tags and getStaticProps to fetch matching content

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import { formatDate } from '../../components/utils'
import {
  getSortedPostsData,
  getSortedFitnessFilesData,
  getSortedRecipesFilesData,
} from '../../components/posts'

interface TaggedItem {
  id: string
  title: string
  date?: string
  year?: number
  month?: number
  tags?: string[]
  type: 'post' | 'fitness' | 'recipe'
  url: string
}

interface TagPageProps {
  tag: string
  items: TaggedItem[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all content
  const allPosts = getSortedPostsData()
  const allFitness = getSortedFitnessFilesData()
  const allRecipes = getSortedRecipesFilesData()

  // Collect all unique tags
  const tagSet = new Set<string>()

  // Add tags from posts
  allPosts.forEach((post: any) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => tagSet.add(tag))
    }
  })

  // Add tags from fitness
  allFitness.forEach((item: any) => {
    if (item.tags && Array.isArray(item.tags)) {
      item.tags.forEach((tag) => tagSet.add(tag))
    }
  })

  // Add tags from recipes
  allRecipes.forEach((recipe: any) => {
    if (recipe.tags && Array.isArray(recipe.tags)) {
      recipe.tags.forEach((tag) => tagSet.add(tag))
    }
  })

  // Generate paths for each unique tag
  const paths = Array.from(tagSet).map((tag) => ({
    params: { tag },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<TagPageProps> = async ({
  params,
}) => {
  const tag = params!.tag as string

  // Get all content
  const allPosts = getSortedPostsData()
  const allFitness = getSortedFitnessFilesData()
  const allRecipes = getSortedRecipesFilesData()

  // Filter items that have this tag
  const items: TaggedItem[] = []

  // Add matching posts
  allPosts.forEach((post: any) => {
    if (post.tags && post.tags.includes(tag)) {
      items.push({
        ...post,
        type: 'post',
        url: `/posts/${post.id}`,
      })
    }
  })

  // Add matching fitness items
  allFitness.forEach((item: any) => {
    if (item.tags && item.tags.includes(tag)) {
      items.push({
        ...item,
        type: 'fitness',
        url: `/fitness/${item.id}`,
      })
    }
  })

  // Add matching recipes
  allRecipes.forEach((recipe: any) => {
    if (recipe.tags && recipe.tags.includes(tag)) {
      items.push({
        ...recipe,
        type: 'recipe',
        url: `/recipes/${recipe.id}`,
      })
    }
  })

  // Sort items by date (newest first)
  items.sort((a, b) => {
    const dateA = a.date || `${a.year}-${String(a.month).padStart(2, '0')}`
    const dateB = b.date || `${b.year}-${String(b.month).padStart(2, '0')}`
    return dateB.localeCompare(dateA)
  })

  return {
    props: {
      tag,
      items,
    },
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'post':
      return 'Blog Post'
    case 'fitness':
      return 'Fitness'
    case 'recipe':
      return 'Recipe'
    default:
      return type
  }
}

export default function TagPage({ tag, items }: TagPageProps) {
  const pageTitle = `Posts tagged with "${tag}" | ineluctable modalities`

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <article className="prose prose-lg dark:prose-invert mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Posts tagged with &ldquo;{tag}&rdquo;
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Found {items.length} {items.length === 1 ? 'item' : 'items'} tagged
            with &ldquo;{tag}&rdquo;
          </p>
        </header>

        {items.length === 0 ? (
          <p>No items found with this tag.</p>
        ) : (
          <ul className="space-y-6">
            {items.map((item) => (
              <li
                key={`${item.type}-${item.id}`}
                className="border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <div className="p-2 -m-2 rounded">
                  <Link href={item.url} className="block hover:underline">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                      {item.title}
                    </h2>
                  </Link>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                      {getTypeLabel(item.type)}
                    </span>
                    {item.date && (
                      <time dateTime={item.date}>{formatDate(item.date)}</time>
                    )}
                    {item.year && item.month && (
                      <time>
                        {item.year}-{String(item.month).padStart(2, '0')}
                      </time>
                    )}
                  </div>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.tags.map((t) => (
                        <Link
                          key={t}
                          href={`/tags/${t}`}
                          className={`px-2 py-1 text-xs rounded-full ${
                            t === tag
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {t}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </article>
    </Layout>
  )
}
