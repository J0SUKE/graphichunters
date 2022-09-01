import '../styles/globals.css'
import type { AppProps } from 'next/app'
import CursorProvider from '../context/CursorContext'
import ScrollerProvider from '../context/ScrollWrapperContext'
import MenuContext from '../context/MenuContext'
import LayoutRefsContext from '../context/LayoutRefsContext'
import HistoryContext from '../context/HistoryContext'
import PreloaderContext from '../context/PreloaderContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HistoryContext>
      <ScrollerProvider>
        <CursorProvider>
          <PreloaderContext>
            <LayoutRefsContext>
              <MenuContext>
                <Component {...pageProps} />
              </MenuContext>        
            </LayoutRefsContext>        
          </PreloaderContext>          
        </CursorProvider>
      </ScrollerProvider>  
    </HistoryContext>    
  )
  
}

export default MyApp
