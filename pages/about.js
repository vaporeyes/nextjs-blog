import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import SkillVisualizer from '../components/skillCharts/skillVisualizer'

const interests = {
  reading: '/reading',
  fitness: '/fitness',
  cooking: '/cooking'
}

export default function About() {
  return (
    <Layout>
      <Head>
        <title>about me</title>
      </Head>
      <section>
        <h1 className='text-center text-3xl md:text-4xl font-bold relative z-10'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400'>
            About Me
          </span>
        </h1>
        <br />
        my name is josh and i&apos;m a devops engineer in middle tennessee with
        a myriad of interests, including but not limited to:
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
        <div className='relative py-8 mb-8'>
          <h1 className='text-center text-3xl md:text-4xl font-bold relative z-10'>
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400'>
              Stats
            </span>
          </h1>
          {/* <div className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full opacity-70'></div> */}
          <p className='text-center text-sm text-gray-500 dark:text-gray-400 mt-2 italic'>
            as I see them
          </p>
        </div>
        <SkillVisualizer />
      </section>
    </Layout>
  )
}
