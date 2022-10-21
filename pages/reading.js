import Head from "next/head";
import Layout from "../components/layout";
import books from "../data/books.json";

export default function Reading() {
  return (
    <Layout>
      <Head>
        <title>books i have read or am reading</title>
      </Head>
      <section>
        <h1 className="text-center text-4xl font-bold">books i&apos;ve read recently</h1>
      </section>
      <section>
        <br />
        {Object.entries(books).map(([year, booksList]) => (
          <section>
            <h1 className="text-1xl font-bold text-right">{year}</h1>
            <ul>
              <li key={`${year}`}>
                <ul>
                  {Object.entries(booksList).map(([idx, book]) => (
                    <li key={`${idx}`}>
                      <span className="text-1xl font-black text-slate-400 hover:text-slate-50">
                        {book.title}:{` `}
                      </span>
                      {book.author}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </section>
        ))}
      </section>
    </Layout>
  );
}
