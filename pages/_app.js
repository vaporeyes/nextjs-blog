import 'highlight.js/styles/tokyo-night-dark.css';
import "../styles/global.css";
import SimpleReactLightbox from "simple-react-lightbox"; 

export default function App({ Component, pageProps }) {
  return <SimpleReactLightbox><Component {...pageProps} /></SimpleReactLightbox>;
}
