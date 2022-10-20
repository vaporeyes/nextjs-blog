import { getAllPostIds, getPostData } from "../../components/posts";
import Layout from "../../components/layout";

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
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
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

