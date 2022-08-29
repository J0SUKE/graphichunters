import React, { useContext, useEffect, useRef, useState } from 'react'
import RightRibbon from './RightRibbon'
import styled from 'styled-components'
import Hero from './Hero'
import Header from './Header'
import Footer from './Footer'
import WorkGrid from './WorkGrid'
import HomeBrands from './HomeBrands'
import Services from './Services'
import Cursor from './Cursor'
import HomePreloader from './preloaders/HomePreloader'
import Menu from './Menu'
import gsap from 'gsap';
import Link from 'next/link'
import { scrollerWrapperContext } from '../context/ScrollWrapperContext'
import { throttle } from 'lodash'


export default function Layout() {

  const FooterRef = useRef<HTMLElement>(null);
  const RibbonRef = useRef<HTMLLIElement>(null);  
  const LogoRef = useRef<HTMLAnchorElement>(null);
  const NavLinksRef = useRef<HTMLElement>(null);
  const ServicesRef = useRef<HTMLDivElement>(null);
  const MarqueeRef = useRef<HTMLDivElement>(null);
  const homePreladerRef = useRef<HTMLDivElement>(null);
  const loaderText = useRef<HTMLDivElement>(null);;

  useEffect(()=>{
    
    if (!RibbonRef.current || !FooterRef.current || !LogoRef.current || !NavLinksRef.current) return;

    gsap.to(RibbonRef.current,{
      scrollTrigger:{
        trigger:'.presentation',
        scroller: "#scroll-wrapper",
        start:'top bottom',
        endTrigger:FooterRef.current,
        end:'bottom bottom',
        scrub:1,
      },
      xPercent:-50,
      duration:15
    })

    gsap.to([LogoRef.current,NavLinksRef.current],{
      scrollTrigger:{
        trigger:'.presentation',
        scroller: "#scroll-wrapper",
        start:'50% bottom',
        toggleActions:'play pause pasue reverse'
      },      
      scale: 0.8,
      duration:.5,
      ease: "power3.out"
    })

  },[])

  useEffect(()=>{
    ScrollerRef?.current?.addEventListener('scroll',throttle(()=>{
      
      const bottom = MarqueeRef.current?.querySelector('ul')?.getBoundingClientRect().bottom;
      if (!bottom || !LogoRef.current || !NavLinksRef.current) return;

      if (bottom<=0) {
        LogoRef.current.style.mixBlendMode = 'difference'
        NavLinksRef.current.style.mixBlendMode = 'difference'
      }
      else
      {
        LogoRef.current.style.mixBlendMode = 'unset'
        NavLinksRef.current.style.mixBlendMode = 'unset'
      }          
    },100))
    

  },[]);

  const wrapperContext = useContext(scrollerWrapperContext);

  if (!wrapperContext) return null;
  const {ScrollerRef} = wrapperContext;



  const ScrollContainer = styled.div`
    position: fixed;
    top: 0;
    min-height: 100vh;
    max-height: 100vh;
    width: 100%;
    z-index: 1;
    overflow-y: scroll;
    scroll-behavior: smooth;
  `

  return (
    <>
        <HomePreloader homePreladerRef={homePreladerRef} loaderText={loaderText}/>
        <Cursor/>
        <Header logoRef={LogoRef} NavLinksRef={NavLinksRef}/>
        <Menu/>
        <ScrollContainer data-scroll-container id='scroll-wrapper' ref={ScrollerRef}>
          <Content>
            <Hero homePreladerRef={homePreladerRef} loaderText={loaderText}/>
            <WorkGrid/>
            <HomeBrands MarqueeRef={MarqueeRef}/>
            <Services ServicesRef={ServicesRef}/>
            <Footer FooterRef={FooterRef}/>
          </Content>
          <RightRibbon RibbonRef={RibbonRef}/>
        </ScrollContainer>        
    </>    
  )
}

var Content = styled.div`
    width: 92vw;
    top: 0;
    left: 0;
    @media screen and (max-width:1024px)
    {
        width: 100%;
    }
  `