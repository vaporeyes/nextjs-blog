import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import { getSortedPostsData, getSortedFitnessFilesData, getSortedRecipesFilesData } from "../components/posts";


export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const fitnessFilesData = getSortedFitnessFilesData();
  const recipeFilesData = getSortedRecipesFilesData();
  return {
    props: {
      allPostsData,
      fitnessFilesData,
      recipeFilesData,
    },
  };
}

export default function Home({ allPostsData, fitnessFilesData, recipeFilesData }) {
  return (
    <Layout home>
      <Head>
        <title>...</title>
      </Head>
      <section>
        <p className="text-3xl font-bold">ineluctable modalities</p>
      </section>
      <section>
        <h1 className="text-2xl font-bold">
          <Link href="/about">about me</Link>
        </h1>
        <br />
        <h1 className="text-2xl font-bold">
          <Link href="/reading">books i&apos;ve read</Link>
        </h1>
        <br />
        <h1 className="text-2xl font-bold">fitness posts</h1>
        <ul>
          {fitnessFilesData.map(({ id, date, title }) => (
            <li key={id}>
              <span>{date}</span>
              {` `}
              <Link href={`/fitness/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
        <br />
        <h1 className="text-2xl font-bold">blog posts</h1>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <span>{date}</span>
              {` `}
              <Link href={`/posts/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
        <br />
        <h1 className="text-2xl font-bold">recipe posts</h1>
        <ul>
          {recipeFilesData.map(({ id, date, title }) => (
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
