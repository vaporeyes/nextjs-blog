import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout, { siteTitle } from "../components/layout";

const interests = {
  reading: "/reading",
  artwork: "/artwork",
  photography: "/photography",
  fitness: "/fitness",
  cooking: "/cooking",
};

export default function About() {
  return (
    <Layout>
      <Head>
        <title>about</title>
      </Head>
      <section>
        <h1 className="text-center text-4xl font-bold">About Me</h1>i'm a devops
        engineer in middle tennessee with a myriad of interests, including but
        not limited to:
        <br></br>
        <br></br>
        <ul>
          {Object.entries(interests).map(([interest, path]) => (
            <li id={interest}>
              <Link href={`${path}`}>{interest}</Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
