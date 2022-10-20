import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData, getSortedFitnessFilesData } from "./lib/posts";
import useDarkMode from "../components/useDarkMode";
import bg from "../public/images/hawaii_sunrise_2022.png"


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
      {/* {colorTheme === "light" ? (
        <svg
          onClick={() => setTheme("light")}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ) : (
        <svg
          onClick={() => setTheme("dark")}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )} */}
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
