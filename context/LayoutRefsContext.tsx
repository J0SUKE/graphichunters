import React, { useRef } from 'react'
import useCursorInteraction from '../hooks/useCursorInteraction';

interface layoutRefsContextInterface {
    [keyName:string]:any
}

export const layoutRefsContext = React.createContext<layoutRefsContextInterface | null>(null);

export default function LayoutRefsContext({children}:{children:React.ReactNode}) 
{    
    const FooterRef = useRef<HTMLElement>(null);
    const RibbonRef = useRef<HTMLLIElement>(null);  
    const MarqueeRef = useRef<HTMLDivElement>(null);
    const LogoRef = useCursorInteraction('onLink') as React.RefObject<HTMLDivElement>;
    const NavLinksRef = useRef<HTMLElement>(null);
    const homePreladerRef = useRef<HTMLDivElement>(null);
    const pageTransitionRef = useRef<HTMLDivElement>(null);
    const loaderText = useRef<HTMLDivElement>(null);
    const TopShadowRef = useRef<HTMLDivElement>(null);
    const ContentRef = useRef<HTMLDivElement>(null);
    const MenuButtonRef = useCursorInteraction('onLink') as React.RefObject<HTMLDivElement>;
    
    return (
    <layoutRefsContext.Provider 
        value={{FooterRef,RibbonRef,LogoRef,NavLinksRef,homePreladerRef,loaderText,TopShadowRef,pageTransitionRef,ContentRef,MenuButtonRef,MarqueeRef}}
    >
        {children}
    </layoutRefsContext.Provider>
  )
}
