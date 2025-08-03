import { GetStaticProps, GetStaticPaths } from 'next'
import {
  getAllRecipesFilesIds,
  getRecipesFilesData
} from '../../components/posts'
import ContentPage from '../../components/ContentPage'
import { ContentItem } from '../../types'

interface RecipeData extends ContentItem {
  readingTime?: string;
}

export const getStaticProps: GetStaticProps<{ recipeData: RecipeData }> = async ({ params }) => {
  const recipeData = await getRecipesFilesData(params!.id as string) as RecipeData
  return {
    props: {
      recipeData
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllRecipesFilesIds()
  return {
    paths,
    fallback: false
  }
}

interface RecipeProps {
  recipeData: RecipeData;
}

export default function Recipe ({ recipeData }: RecipeProps) {
  return <ContentPage contentData={recipeData} contentType="recipe" />
}
