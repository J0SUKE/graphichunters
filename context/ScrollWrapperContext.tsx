import React, { useRef } from 'react'

interface ScrollerContextInterface {
    ScrollerRef:React.RefObject<HTMLDivElement> | null
}

export const scrollerWrapperContext = React.createContext<ScrollerContextInterface | null>(null);


export default function ScrollerProvider({children}:{children:React.ReactNode}) {
  
    const ScrollerRef = useRef<HTMLDivElement>(null);

    return (
    <scrollerWrapperContext.Provider value={{ScrollerRef}}>
        {children}
    </scrollerWrapperContext.Provider>
  )
}
