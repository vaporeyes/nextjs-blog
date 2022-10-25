import Head from "next/head";
import styles from "./layout.module.css";
import Link from "next/link";
import ThemeChanger from "../components/themeChanger";

export const siteTitle = "a site";

export default function Layout({ children, home }) {
  return (
    <div className="dark">
      <div className={`${styles.container}`}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="a site" />
          <meta name="og:title" content={siteTitle} />
        </Head>
        <header className={styles.header}>
          
        </header>
        <ThemeChanger></ThemeChanger>
        <div className={styles.backToHome}>
          <Link href="/">
            <a>..</a>
          </Link>
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
}
