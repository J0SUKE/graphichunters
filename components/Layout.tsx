import React, { useEffect, useRef, useState } from 'react'
import RightRibbon from './RightRibbon'
import styled from 'styled-components'
import Hero from './Hero'
import Header from './Header'
import Footer from './Footer'
import WorkGrid from './WorkGrid'
import HomeBrands from './HomeBrands'
import Services from './Services'
import gsap from 'gsap';
import { throttle } from 'lodash'



export default function Layout() {

  const FooterRef = useRef<HTMLElement>(null);
  const RibbonRef = useRef<HTMLLIElement>(null);  
  const LogoRef = useRef<HTMLAnchorElement>(null);
  const NavLinksRef = useRef<HTMLElement>(null);
  const ServicesRef = useRef<HTMLDivElement>(null);
  const MarqueeRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    
    if (!RibbonRef.current || !FooterRef.current || !LogoRef.current || !NavLinksRef.current) return;

    gsap.to(RibbonRef.current,{
      scrollTrigger:{
        trigger:'.presentation',
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
        start:'50% bottom',
        toggleActions:'play pause pasue reverse'
      },      
      scale: 0.8,
      duration:.5,
      ease: "power3.out"
    })

  },[])

  useEffect(()=>{
    window.addEventListener('scroll',throttle(()=>{
      
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

  return (
    <>
        <Header logoRef={LogoRef} NavLinksRef={NavLinksRef}/>
        <Content>
          <Hero/>
          <WorkGrid/>
          <HomeBrands MarqueeRef={MarqueeRef}/>
          <Services ServicesRef={ServicesRef}/>
          <Footer FooterRef={FooterRef}/>
        </Content>
        <RightRibbon RibbonRef={RibbonRef}/>
    </>    
  )
}

var Content = styled.div`
    position: absolute;
    width: 92vw;
    top: 0;
    left: 0;
    @media screen and (max-width:1024px)
    {
        width: 100%;
    }
  `