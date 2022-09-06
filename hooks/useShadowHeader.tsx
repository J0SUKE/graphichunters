import { throttle } from 'lodash';
import React,{useRef,useEffect,useContext} from 'react'
import {layoutRefsContext} from '../context/LayoutRefsContext';
import gsap from 'gsap'
import { scrollerWrapperContext } from '../context/ScrollWrapperContext';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import { log } from 'console';
import useCursorInteraction from './useCursorInteraction';

export default function useShadowHeader()
{   
    const HTMLElement = useRef<HTMLElement>(null);    

    useEffect(()=>{        
        gsap.registerPlugin(ScrollTrigger);        
        ScrollerRef?.current?.addEventListener('scroll',throttle(ShadowParallaxFiorMiddleSection,100))
    },[])


    function ShadowParallaxFiorMiddleSection() {
      if (!HTMLElement.current || !ScrollerRef?.current ) return; 
            
            const HTMLElementTop = HTMLElement.current.getBoundingClientRect().top;
            const HTMLElementBottom = HTMLElement.current.getBoundingClientRect().bottom;        
            
            const Decallage = Math.min(GetVmax(8),100);
    
            if (HTMLElementTop<=Decallage && (HTMLElementBottom-Decallage)>=0) 
            {
              LogoRef.current.style.mixBlendMode = 'unset';
              NavLinksRef.current.style.mixBlendMode = 'unset';  
              
              gsap.to(TopShadowRef.current,{
                opacity: 1,
                duration:.5,
                ease: "power3.out",
                })        
            }
            else{
              LogoRef.current.style.mixBlendMode = 'difference';
              NavLinksRef.current.style.mixBlendMode = 'difference';  
              
              gsap.to(TopShadowRef.current,{
                opacity: 0,
                duration:.5,
                ease: "power3.out",
                })       
            }
    }



    const LayoutrefsContext = useContext(layoutRefsContext);
    const wrapperContext = useContext(scrollerWrapperContext);
    
    if (!LayoutrefsContext) return null;
    const {LogoRef,NavLinksRef,TopShadowRef} = LayoutrefsContext;

    if (!wrapperContext) return null;
    const {ScrollerRef} = wrapperContext;

    return HTMLElement;
}

function GetVmax(value:number) : number
{
  let percentage = value / 100;
  return window.innerWidth > window.innerHeight ? window.innerWidth * percentage  : window.innerHeight * percentage;
}