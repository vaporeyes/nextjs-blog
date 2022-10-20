import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import { getSortedRecipesFilesData } from "../components/posts";

export async function getStaticProps() {
    const allPostsData = getSortedRecipesFilesData();
    return {
        props: {
            allPostsData,
        },
    };
}

export default function Recipes({ allPostsData }) {
    return (
      <Layout>
        <Head>
          <title>recipes and whatnot</title>
        </Head>
        <section>
          <ul>
          {allPostsData.map(({ id, date, title }) => (
              <li key={id}>
                <span>{date}</span>
                {` `}
                <Link href={`/recipes/${id}`}>{title}</Link>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    );
  }