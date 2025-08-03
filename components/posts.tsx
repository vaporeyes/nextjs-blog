import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import rehypeImgSize from 'rehype-img-size'
import rehypeFigure from 'rehype-figure'
import { ContentItem } from '../types'

const postsDirectory = path.join(process.cwd(), 'posts')
const fitnessFilesDirectory = path.join(process.cwd(), 'fitness')
const recipesFilesDirectory = path.join(process.cwd(), 'recipes')


function getAllFileIds(directory: string) {
  const fileNames = fs.readdirSync(directory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

async function getFileData(directory: string, id: string): Promise<ContentItem> {
  const fullPath = path.join(directory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(remarkParse)
    .use(remarkGfm, {
      tableCellPadding: true,
      tablePipeAlign: true,
      stringLength: (string: string) => string.length
    })
    .use(remarkRehype)
    .use(rehypeHighlight, {
      ignoreMissing: true
    })
    .use(rehypeImgSize, {
      dir: 'public'
    })
    .use(rehypeFigure)
    .use(rehypeStringify)
    .process(matterResult.content)

  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data
  } as ContentItem
}

function getSortedFilesData(directory: string) {
  const fileNames = fs.readdirSync(directory)
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(directory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    return {
      id,
      ...matterResult.data
    }
  })

  return allPostsData.sort(({ date: a }: any, { date: b }: any) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export const getAllPostIds = () => getAllFileIds(postsDirectory)
export const getPostData = (id: string) => getFileData(postsDirectory, id)
export const getSortedPostsData = () => getSortedFilesData(postsDirectory)

export const getAllFitnessFilesIds = () => getAllFileIds(fitnessFilesDirectory)
export const getFitnessFilesData = (id: string) => getFileData(fitnessFilesDirectory, id)
export const getSortedFitnessFilesData = () => getSortedFilesData(fitnessFilesDirectory)

export const getAllRecipesFilesIds = () => getAllFileIds(recipesFilesDirectory)
export const getRecipesFilesData = (id: string) => getFileData(recipesFilesDirectory, id)
export const getSortedRecipesFilesData = () => getSortedFilesData(recipesFilesDirectory)
