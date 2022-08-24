import React, { useEffect, useRef, useState } from 'react'
import RightRibbon from './RightRibbon'
import styled from 'styled-components'
import Hero from './Hero'
import Header from './Header'
import SlideShowContext from '../context/SlideShowContext'
import Footer from './Footer'
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';

export default function Layout() {

  const FooterRef = useRef<HTMLElement>(null);
  const RibbonRef = useRef<HTMLLIElement>(null);  

  useEffect(()=>{
    
    if (!RibbonRef.current || !FooterRef.current) return;

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
  },[])

  return (
    <>
      <SlideShowContext>
        <Header/>
        <Content>
          <Hero/>        
          <Footer FooterRef={FooterRef}/>
        </Content>
        <RightRibbon RibbonRef={RibbonRef}/>
      </SlideShowContext>
    </>    
  )
}

var Content = styled.div`
    position: absolute;
    width: 92vw;
    top: 0;
    left: 0;
  `