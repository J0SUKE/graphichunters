import React, { useRef, useState,useEffect } from 'react'
import gsap from 'gsap';
import { useRouter } from 'next/router';

interface menuContextInterface {
    menuIsOpen:React.MutableRefObject<boolean>,
    MenuRef:React.RefObject<HTMLDivElement>,
    MenuLinksRef:React.RefObject<HTMLDivElement>,
    openMenu:(MenuButtonRef: React.RefObject<HTMLDivElement>)=>void,
    closeMenu:(MenuButtonRef: React.RefObject<HTMLDivElement>)=>void,
}

export const menuContext = React.createContext<menuContextInterface|null>(null);

export default function MenuContext({children}:{children:React.ReactNode}) {
  
    const router = useRouter();
    const MenuRef = useRef<HTMLDivElement>(null);
    const MenuLinksRef = useRef<HTMLDivElement>(null);
    const menuIsOpen = useRef(false);


    useEffect(() => {
        menuIsOpen.current = false;
        closeMenu();
    }, [router])
    

    function openMenu(MenuButtonRef?: React.RefObject<HTMLDivElement>) {
        
        menuIsOpen.current = true;
        MenuButtonRef?.current?.classList.add('active');
        
        if (!MenuRef.current || !MenuLinksRef.current) return;
        MenuRef.current.style.display = 'unset';
        
        gsap.fromTo(MenuRef.current,
        {
            xPercent:300,
        },
        {
            xPercent:0,
            duration:1,
        })

        MenuLinksRef.current.style.zIndex = '99';
        gsap.fromTo(MenuLinksRef.current.querySelectorAll('p'),
        {
            yPercent:100,
            rotate: 10,            
        },
        {
            yPercent:0,
            duration:1,
            rotate: 0,
            ease: "power4.out",
        })
    }
    
    function closeMenu(MenuButtonRef?: React.RefObject<HTMLDivElement>) 
    {           
        
        MenuButtonRef?.current?.classList.remove('active');
        
        gsap.to(MenuRef.current,
        {
            xPercent:300,
            ease: "power4.in",
            duration:1.3,
            onComplete:()=>{
                if (!MenuRef.current) return;
                MenuRef.current.style.display = 'none';
                menuIsOpen.current = false;
            }
        })  
        if (!MenuLinksRef.current?.querySelectorAll('p')) return;

        gsap.to(MenuLinksRef.current.querySelectorAll('p'),
        {
            yPercent:100,
            duration:1,
            rotate: 10,
            ease: "power4.in",
            onComplete:()=>{
                if (!MenuLinksRef.current) return;
                MenuLinksRef.current.style.zIndex = '-1';
            }
        })
    }

    

    return (
    <menuContext.Provider value={{menuIsOpen,MenuRef,openMenu,closeMenu,MenuLinksRef} as menuContextInterface}>
        {children}
    </menuContext.Provider>
  )
}
