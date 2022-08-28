import '../styles/globals.css'
import type { AppProps } from 'next/app'
import CursorProvider from '../context/CursorContext'
import ScrollerProvider from '../context/ScrollWrapperContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ScrollerProvider>
      <CursorProvider>
        <Component {...pageProps} />
      </CursorProvider>
    </ScrollerProvider>  
  )
  
}

export default MyApp
