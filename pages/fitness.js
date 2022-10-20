import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { getSortedFitnessFilesData } from "./lib/posts";
import Layout, { siteTitle } from "../components/layout";

export async function getStaticProps() {
  const allPostsData = getSortedFitnessFilesData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Fitness({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>my fitness page</title>
      </Head>
      <section>
        <h1 className="text-2xl font-bold text-center">fitness posts</h1>
        <ul>
        {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <span>{date}</span>
              {` `}
              <Link href={`/fitness/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
