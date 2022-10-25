import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function getSortedPhotoData (photoType) {
  let filesDirectory = path.join(process.cwd(), 'artwork')
  if (photoType === 'photography') {
    filesDirectory = path.join(process.cwd(), 'photography')
  }
  const fileNames = fs.readdirSync(filesDirectory)
  const markdownFiles = fileNames.filter(file => {
    return path.extname(file).toLowerCase() === '.md'
  })
  const allPhotosData = markdownFiles.map(fileName => {
    if (fileName.endsWith('.md')) {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '')
      // Read markdown file as string
      const fullPath = path.join(filesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)
      // Combine the data with the id
      return {
        id,
        ...matterResult.data
      }
    }
  })
  // Sort posts by date
  return allPhotosData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export function getAllPhotoIds () {
  let filesDirectory = path.join(process.cwd(), 'artwork')
  if (photoType === 'photography') {
    filesDirectory = path.join(process.cwd(), 'photography')
  }
  const fileNames = fs.readdirSync(filesDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.jpg$/, '')
      }
    }
  })
}

export async function getPhotoData (id) {
  let filesDirectory = path.join(process.cwd(), 'artwork')
  if (photoType === 'photography') {
    filesDirectory = path.join(process.cwd(), 'photography')
  }
  const fullPathMarkdown = path.join(filesDirectory, `${id}.md`)
  const fullPathPhoto = path.join(filesDirectory, `${id}.jpg`)
  const fileMdContents = fs.readFileSync(fullPathMarkdown, 'utf8')
  const matterResult = matter(fileMdContents)

  return {
    id,
    fullPathPhoto,
    ...matterResult.data
  }
}
