import { getAllRecipesFilesIds, getRecipesFilesData } from "../../components/posts";
import Layout from "../../components/layout";

export async function getStaticProps({ params }) {
  const postData = await getRecipesFilesData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllRecipesFilesIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <p className="post-meta">{postData.date}</p>
      <h2 className="text-2xl font-bold">{postData.title}</h2>
      <br />
      <div className="recipeformat" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

