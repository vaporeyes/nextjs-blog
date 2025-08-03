import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'
import { ReactNode } from 'react'
import Search from './Search'

export const siteTitle = 'ineluctable modalities'

interface LayoutProps {
  children: ReactNode;
  home?: boolean;
}

export default function Layout ({ children, home }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='a site' />
        <meta name='og:title' content={siteTitle} />
      </Head>
      <div className='mb-8'>
        <header>
          {home ? (
            <div>
              <div className='flex justify-between items-start gap-4 mb-4'>
                <h1 className={styles.heading2Xl}>{siteTitle}</h1>
                <div className='flex-1 max-w-md'>
                  <Search />
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link href='/' className='backToHome'>
                ← Back to home
              </Link>
            </>
          )}
        </header>
      </div>
      <main>{children}</main>
    </div>
  )
}
