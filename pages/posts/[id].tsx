import { GetStaticProps, GetStaticPaths } from 'next'
import { getAllPostIds, getPostData } from '../../components/posts'
import ContentPage from '../../components/ContentPage'
import { ContentItem } from '../../types'

interface PostData extends ContentItem {
  readingTime?: string;
}

export const getStaticProps: GetStaticProps<{ postData: PostData }> = async ({ params }) => {
  const postData = await getPostData(params!.id as string) as PostData
  return {
    props: {
      postData
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

interface PostProps {
  postData: PostData;
}

export default function Post ({ postData }: PostProps) {
  return <ContentPage contentData={postData} contentType="post" />
}
