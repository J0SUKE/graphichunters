import React, { useContext, useEffect, useRef } from 'react'
import Hero from '../Hero'
import WorkGrid from '../WorkGrid'
import HomeBrands from '../HomeBrands'
import Services from '../Services'
import { scrollerWrapperContext } from '../../context/ScrollWrapperContext'
import gsap from 'gsap'
import { throttle } from 'lodash'
import {layoutRefsContext} from '../../context/LayoutRefsContext';
import DataInterface from '../../types/DataInterface'
import Head from 'next/head'

export default function Home({data}:{data:DataInterface,}) 
{
    
    const ServicesRef = useRef<HTMLDivElement>(null);
    const MarqueeRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        ScrollerRef?.current?.addEventListener('scroll',throttle(()=>{
          
        const bottom = MarqueeRef.current?.querySelector('ul')?.getBoundingClientRect().bottom;    

        if (!bottom || !LogoRef.current || !NavLinksRef.current || !ScrollerRef.current) return;

        if (bottom<=0) {
        LogoRef.current.style.mixBlendMode = 'difference';
        NavLinksRef.current.style.mixBlendMode = 'difference';
        gsap.to(TopShadowRef.current,{
            opacity: 0,
            duration:.7,
        })
        }
        else
        {
        LogoRef.current.style.mixBlendMode = 'unset'
        NavLinksRef.current.style.mixBlendMode = 'unset'
        
        if (ScrollerRef.current.scrollTop > document.documentElement.clientHeight) {
            gsap.to(TopShadowRef.current,{
            opacity: 1,
            duration:.7,
            }) 
        }        
        }          
    },100))
        
    
      },[]);

    
    const wrapperContext = useContext(scrollerWrapperContext);
    const LayoutrefsContext = useContext(layoutRefsContext);

    if (!wrapperContext) return null;
    const {ScrollerRef} = wrapperContext;

    if (!LayoutrefsContext) return null;
    const {LogoRef,NavLinksRef,TopShadowRef,homePreladerRef,loaderText,pageTransitionRef} = LayoutrefsContext;

    return (
    <>        
        <Hero  images={data.heroSlideshow.images}/>
        <WorkGrid works={data.allWorks}/>
        <HomeBrands MarqueeRef={MarqueeRef}/>
        <Services ServicesRef={ServicesRef}/>
    </>
  )
}
