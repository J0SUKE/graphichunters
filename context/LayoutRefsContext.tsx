import React, { useRef } from 'react'

interface layoutRefsContextInterface {
    [keyName:string]:any
}

export const layoutRefsContext = React.createContext<layoutRefsContextInterface | null>(null);

export default function LayoutRefsContext({children}:{children:React.ReactNode}) 
{    
    const FooterRef = useRef<HTMLElement>(null);
    const RibbonRef = useRef<HTMLLIElement>(null);  
    const LogoRef = useRef<HTMLAnchorElement>(null);
    const NavLinksRef = useRef<HTMLElement>(null);
    const homePreladerRef = useRef<HTMLDivElement>(null);
    const loaderText = useRef<HTMLDivElement>(null);
    const TopShadowRef = useRef<HTMLDivElement>(null);
    
    return (
    <layoutRefsContext.Provider 
        value={{FooterRef,RibbonRef,LogoRef,NavLinksRef,homePreladerRef,loaderText,TopShadowRef}}
    >
        {children}
    </layoutRefsContext.Provider>
  )
}
