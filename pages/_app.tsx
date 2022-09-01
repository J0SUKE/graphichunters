import '../styles/globals.css'
import type { AppProps } from 'next/app'
import CursorProvider from '../context/CursorContext'
import ScrollerProvider from '../context/ScrollWrapperContext'
import MenuContext from '../context/MenuContext'
import Head from 'next/head'
import LayoutRefsContext from '../context/LayoutRefsContext'
import HistoryContext from '../context/HistoryContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HistoryContext>
      <ScrollerProvider>
        <CursorProvider>
          <LayoutRefsContext>
            <MenuContext>
              <Component {...pageProps} />
            </MenuContext>        
          </LayoutRefsContext>        
        </CursorProvider>
      </ScrollerProvider>  
    </HistoryContext>    
  )
  
}

export default MyApp
