// ABOUTME: Reusable component for content pages with dynamic meta tags
// ABOUTME: Handles SEO meta tags, layout, and content rendering for posts/recipes/fitness

import Head from 'next/head'
import Layout from './layout'
import { ContentItem } from '../types'

interface ContentPageProps {
  contentData: ContentItem & {
    readingTime?: string;
  };
  contentType: 'post' | 'recipe' | 'fitness';
}

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

function getDescription(contentHtml: string, maxLength: number = 155): string {
  const plainText = stripHtmlTags(contentHtml)
  if (plainText.length <= maxLength) {
    return plainText
  }
  return plainText.substring(0, maxLength - 3) + '...'
}

export default function ContentPage({ contentData, contentType }: ContentPageProps) {
  const description = getDescription(contentData.contentHtml)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://josh.contact'
  const contentUrl = `${siteUrl}/${contentType}s/${contentData.id}`
  
  return (
    <Layout>
      <Head>
        <title>{contentData.title} | ineluctable modalities</title>
        <meta name="description" content={description} />
        
        {/* Open Graph meta tags */}
        <meta property="og:title" content={contentData.title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={contentUrl} />
        <meta property="og:site_name" content="ineluctable modalities" />
        {contentData.date && (
          <meta property="article:published_time" content={new Date(contentData.date).toISOString()} />
        )}
        {contentData.tags && contentData.tags.length > 0 && (
          <meta property="article:tag" content={contentData.tags.join(', ')} />
        )}
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={contentData.title} />
        <meta name="twitter:description" content={description} />
        
        {/* Additional SEO meta tags */}
        {contentData.tags && contentData.tags.length > 0 && (
          <meta name="keywords" content={contentData.tags.join(', ')} />
        )}
        <link rel="canonical" href={contentUrl} />
      </Head>
      
      <article className="article-container">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {contentData.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            {contentData.date && (
              <time dateTime={contentData.date}>
                {new Date(contentData.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
            {contentData.readingTime && (
              <span>• {contentData.readingTime}</span>
            )}
          </div>
          {contentData.tags && contentData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {contentData.tags.map(tag => (
                <a
                  key={tag}
                  href={`/tags/${tag}`}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
          )}
        </header>
        
        <div 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: contentData.contentHtml }}
        />
      </article>
    </Layout>
  )
}