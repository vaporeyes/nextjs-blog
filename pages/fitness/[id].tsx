import { GetStaticProps, GetStaticPaths } from 'next'
import {
  getAllFitnessFilesIds,
  getFitnessFilesData
} from '../../components/posts'
import ContentPage from '../../components/ContentPage'
import { ContentItem } from '../../types'
import Link from 'next/link'

interface FitnessData extends ContentItem {
  readingTime?: string;
  year?: number;
  month?: number | string;
}

export const getStaticProps: GetStaticProps<{ fitnessData: FitnessData }> = async ({ params }) => {
  const fitnessData = await getFitnessFilesData(params!.id as string) as FitnessData
  return {
    props: {
      fitnessData
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllFitnessFilesIds()
  return {
    paths,
    fallback: false
  }
}

interface FitnessProps {
  fitnessData: FitnessData;
}

export default function Fitness({ fitnessData }: FitnessProps) {
  return (
    <>
      <div className="mb-4">
        <Link href="/fitness" className="text-blue-500 hover:underline">
          &larr; Back to fitness posts
        </Link>
      </div>
      <ContentPage contentData={fitnessData} contentType="fitness" />
    </>
  )
}
