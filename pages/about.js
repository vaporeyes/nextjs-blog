import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import ProgressBar from "../components/progressBar";

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
        <h1 className="text-center text-4xl font-bold">About Me</h1>
        <br />
        my name is josh and i&apos;m a devops engineer in middle tennessee
        with a myriad of interests, including but not limited to:
        <br />
        <br />
        <ul>
          {Object.entries(interests).map(([interest, path]) => (
            <li key={interest}>
              <Link href={`${path}`}>{interest}</Link>
            </li>
          ))}
        </ul>
        <br />
        
      </section>
      <br />
      <section>
        <h1 title="as i see them :D" className="text-center text-3xl font-bold">╰My Skills╮</h1>
        <br />
        <h1 className="text-1xl font-bold">Life</h1>
        <br />
        <ProgressBar key="Cooking" bgcolor="#6a1b9a" completed="65" labelName="Cooking" />
        <ProgressBar key="Drawing" bgcolor="#6a1b9a" completed="80" labelName="Drawing" />
        <ProgressBar key="Painting" bgcolor="#6a1b9a" completed="55" labelName="Painting" />
        <ProgressBar key="Model Building" bgcolor="#6a1b9a" completed="45" labelName="Model Building" />
        <ProgressBar key="Existing" bgcolor="#6a1b9a" completed="42" labelName="Just Existing..." />
        <br />
        <h1 className="text-1xl font-bold">Programming</h1>
        <br />
        <ProgressBar key="Python" bgcolor="#6a1b9a" completed="85" labelName="Python" />
        <ProgressBar key="Shell" bgcolor="#6a1b9a" completed="90" labelName="Bash/Shell" />
        <ProgressBar key="Javascript" bgcolor="#6a1b9a" completed="65" labelName="Javascript" />
        <ProgressBar key="Rust" bgcolor="#6a1b9a" completed="35" labelName="Rust" />
        <ProgressBar key="Elixir" bgcolor="#6a1b9a" completed="45" labelName="Elixir" />
        <br />
      </section>
    </Layout>
  );
}
