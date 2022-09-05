import { throttle } from 'lodash';
import React,{useRef,useEffect,useContext} from 'react'
import {layoutRefsContext} from '../context/LayoutRefsContext';
import gsap from 'gsap'
import { scrollerWrapperContext } from '../context/ScrollWrapperContext';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import { log } from 'console';

export default function useShadowHeader() {
  
    const HTMLElement = useRef<HTMLElement>(null);    

    useEffect(()=>{
        
        gsap.registerPlugin(ScrollTrigger);
        
        ScrollerRef?.current?.addEventListener('scroll',throttle(()=>{
            
            if (!HTMLElement.current || !ScrollerRef?.current ) return; 
            
            const MoreWorkTop = HTMLElement.current.getBoundingClientRect().top;
            const MoreWorkBottom = HTMLElement.current.getBoundingClientRect().bottom;        
    
            if (MoreWorkTop<=0 && MoreWorkBottom>=0) 
            {
              LogoRef.current.style.mixBlendMode = 'unset';
              NavLinksRef.current.style.mixBlendMode = 'unset';  
              
              if (MoreWorkBottom>=0) {
                gsap.to(TopShadowRef.current,{
                  opacity: 1,
                  duration:.5,
                  ease: "power3.out",
                  })        
              }          
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
    
          },100))
    },[])


    const LayoutrefsContext = useContext(layoutRefsContext);
    const wrapperContext = useContext(scrollerWrapperContext);
    
    if (!LayoutrefsContext) return null;
    const {LogoRef,NavLinksRef,TopShadowRef} = LayoutrefsContext;

    if (!wrapperContext) return null;
    const {ScrollerRef} = wrapperContext;

    return HTMLElement;
}
