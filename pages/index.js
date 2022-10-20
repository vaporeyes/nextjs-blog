import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData, getSortedFitnessFilesData } from "../components/posts";
import useDarkMode from "../components/useDarkMode";


export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const fitnessFilesData = getSortedFitnessFilesData();
  return {
    props: {
      allPostsData,
      fitnessFilesData,
    },
  };
}

export default function Home({ allPostsData, fitnessFilesData }) {
  const [colorTheme, setTheme] = useDarkMode();

  return (
    
    <Layout home>
      <Head>
        <title>...</title>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/default.min.css"
        ></link>
        <script src="./styles/hljs.js"></script>
      </Head>
      <section>
        <p>a site of posts and thoughts</p>
      </section>
      <section>
        <h1 className="text-2xl font-bold">
          <Link href="/about">about me</Link>
        </h1>
        <br />
        <h1 className="text-2xl font-bold">
          <Link href="/reading">books i've read</Link>
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
      </section>
    </Layout>
  );
}
