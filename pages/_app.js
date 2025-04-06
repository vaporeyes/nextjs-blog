import 'highlight.js/styles/tokyo-night-dark.css'
import '../styles/global.css'
import SimpleReactLightbox from 'simple-react-lightbox'
import { ThemeProvider } from 'next-themes'
import styles from '../components/layout.module.css'
import { ThemeSwitcher } from '../components/themeSwitcher'

export default function App ({ Component, pageProps }) {
  return (
    <SimpleReactLightbox>
      <ThemeProvider attribute="class">
        <div className={styles.lightButton}>
          <ThemeSwitcher />
        </div>
        <Component {...pageProps} />
      </ThemeProvider>
    </SimpleReactLightbox>
  )
}
