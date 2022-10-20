import fs from "fs";
import path from "path";
import matter from "gray-matter";

const photosDirectory = path.join(process.cwd(), "artwork");

export function getSortedPhotoData() {
  const fileNames = fs.readdirSync(photosDirectory);
  const markdownFiles = fileNames.filter((file) => {
    return path.extname(file).toLowerCase() === ".md";
  });
  const allPhotosData = markdownFiles.map((fileName) => {
    if (fileName.endsWith(".md")) {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "");
      // Read markdown file as string
      const fullPath = path.join(photosDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      // Combine the data with the id
      return {
        id,
        ...matterResult.data,
      };
    }
  });
  // Sort posts by date
  return allPhotosData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPhotoIds() {
  const fileNames = fs.readdirSync(photosDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.jpg$/, ""),
      },
    };
  });
}

export async function getPhotoData(id) {
  const fullPathMarkdown = path.join(photosDirectory, `${id}.md`);
  const fullPathPhoto = path.join(photosDirectory, `${id}.jpg`);
  const fileMdContents = fs.readFileSync(fullPathMarkdown, "utf8");
  const matterResult = matter(fileMdContents);

  return {
    id,
    fullPathPhoto,
    ...matterResult.data,
  };
}
