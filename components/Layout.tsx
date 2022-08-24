import React, { useEffect, useRef, useState } from 'react'
import RightRibbon from './RightRibbon'
import styled from 'styled-components'
import Hero from './Hero'
import Header from './Header'
import Footer from './Footer'
import gsap from 'gsap';

export default function Layout() {

  const FooterRef = useRef<HTMLElement>(null);
  const RibbonRef = useRef<HTMLLIElement>(null);  
  const LogoRef = useRef<HTMLAnchorElement>(null);
  const NavLinksRef = useRef<HTMLElement>(null);

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

  return (
    <>
        <Header logoRef={LogoRef} NavLinksRef={NavLinksRef}/>
        <Content>
          <Hero/>        
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
  `