import React, { useContext } from 'react'
import HomePreloader from './HomePreloader'
import PageTransition from './PageTransition'
import {layoutRefsContext} from '../../context/LayoutRefsContext'
import {historyContext} from '../../context/HistoryContext'

export default function PreloaderWrapper({children}:{children:React.ReactNode}) {
    
    const HistContext = useContext(historyContext);
    const LayoutrefsContext = useContext(layoutRefsContext);

    if (!LayoutrefsContext) return null;
    const {homePreladerRef,loaderText,pageTransitionRef} = LayoutrefsContext;

    return (
    <>
        {
          HistContext?.history?.current?.length == 0 ? // first time the page load
          <HomePreloader homePreladerRef={homePreladerRef} loaderText={loaderText}/>
          :
          <PageTransition pageTransitionRef={pageTransitionRef}/>
        }
        {children}
    </>
  )
}
