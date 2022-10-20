import 'highlight.js/styles/tokyo-night-dark.css';
import "../styles/global.css";
import { ThemeProvider } from 'next-themes';
import SimpleReactLightbox from "simple-react-lightbox";


export default function App({ Component, pageProps }) {
  return <ThemeProvider><SimpleReactLightbox><Component {...pageProps} /></SimpleReactLightbox></ThemeProvider>;
}
