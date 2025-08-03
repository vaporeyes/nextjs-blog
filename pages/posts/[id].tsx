import { getAllPostIds, getPostData } from '../../components/posts'
import Layout from '../../components/layout'
import { formatDate } from '../../components/utils'

export async function getStaticProps ({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths () {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export default function Post ({ postData }) {
  return (
    <Layout>
      <article className='prose prose-lg dark:prose-invert mx-auto'>
        <header className='mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold mb-2'>
            {postData.title}
          </h1>
          <div className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
            <time dateTime={postData.date}>{formatDate(postData.date)}</time>
            <span className='mx-2'>•</span>
            <span>{postData.readingTime}</span>
          </div>
          {postData.tags && (
            <div className='flex flex-wrap gap-2 mt-4'>
              {postData.tags.map(tag => (
                <span
                  key={tag}
                  className='px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <div
          className='markdown'
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  )
}
