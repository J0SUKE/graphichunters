import '../styles/globals.css'
import type { AppProps } from 'next/app'
import CursorProvider from '../context/CursorContext'

function MyApp({ Component, pageProps }: AppProps) {
  return <CursorProvider>
      <Component {...pageProps} />
  </CursorProvider>
}

export default MyApp
