import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';

interface preloaderContextInterface{
    [name:string] : any
}

export const preloaderContext = React.createContext<preloaderContextInterface | null>(null);

export default function PreloaderContext({children}:{children:React.ReactNode}) {
    
    const preloadAnimation = useRef<gsap.core.Timeline>(gsap.timeline());
    
    return (
    <preloaderContext.Provider value={{preloadAnimation}}>
        {children}
    </preloaderContext.Provider>
  )
}
