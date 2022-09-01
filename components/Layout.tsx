import React, { useContext, useEffect, useRef, useState } from 'react'
import RightRibbon from './RightRibbon'
import styled from 'styled-components'
import Header from './Header'
import Footer from './Footer'
import Cursor from './Cursor'
import HomePreloader from './preloaders/HomePreloader'
import Menu from './Menu'
import gsap from 'gsap';
import { scrollerWrapperContext } from '../context/ScrollWrapperContext'
import {layoutRefsContext} from '../context/LayoutRefsContext';
import { useRouter } from 'next/router'
import { log } from 'console'

export default function Layout({children,blackFooter,blackSide}:{children:React.ReactNode,blackFooter?:boolean,blackSide?:boolean}) {

  const router = useRouter();
  useEffect(()=>{
    console.log(router);
    
  },[])

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
      ease: "power3.out",
    })

    gsap.to(TopShadowRef.current,{
      scrollTrigger:{
        trigger:'.presentation',
        scroller: "#scroll-wrapper",
        start:'50% bottom',
        toggleActions:'play pause pasue reverse'
      },      
      opacity: 1,
      duration:.5,
      ease: "power3.out",
    })    
  },[])
   

  //   ScrollerRef?.current?.addEventListener('scroll',throttle(()=>{
      
  //     const bottom = MarqueeRef.current?.querySelector('ul')?.getBoundingClientRect().bottom;    

  //     if (!bottom || !LogoRef.current || !NavLinksRef.current || !ScrollerRef.current) return;

  //     if (bottom<=0) {
  //       LogoRef.current.style.mixBlendMode = 'difference';
  //       NavLinksRef.current.style.mixBlendMode = 'difference';
  //       gsap.to(TopShadowRef.current,{
  //         opacity: 0,
  //         duration:.7,
  //       })
  //     }
  //     else
  //     {
  //       LogoRef.current.style.mixBlendMode = 'unset'
  //       NavLinksRef.current.style.mixBlendMode = 'unset'
        
  //       if (ScrollerRef.current.scrollTop > document.documentElement.clientHeight) {
  //         gsap.to(TopShadowRef.current,{
  //           opacity: 1,
  //           duration:.7,
  //         }) 
  //       }        
  //     }          
  //   },100))
    

  // },[]);

  const wrapperContext = useContext(scrollerWrapperContext);
  const LayoutrefsContext = useContext(layoutRefsContext);

  if (!wrapperContext) return null;
  const {ScrollerRef} = wrapperContext;


  if (!LayoutrefsContext) return null;
  const {LogoRef,NavLinksRef,TopShadowRef,homePreladerRef,loaderText,RibbonRef,FooterRef} = LayoutrefsContext;

  const ScrollContainer = styled.div`
    position: fixed;
    top: 0;
    min-height: 100vh;
    max-height: 100vh;
    width: 100%;
    z-index: 1;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-behavior: smooth;
  `

  const TopShadow = styled.div`
    position: fixed;
    opacity: 0;
    z-index: 97;
    transform: translateY(-140%);
    width: 92vw;
    left: 0;
    height: 100vh;
    background: black;
    box-shadow: 0px -20vh 100vmin 70vmin black;        
  `  

  return (
    <>
        <HomePreloader homePreladerRef={homePreladerRef} loaderText={loaderText}/>
        <Cursor/>
        <Header logoRef={LogoRef} NavLinksRef={NavLinksRef} />
        <ScrollContainer data-scroll-container id='scroll-wrapper' ref={ScrollerRef}>
          <TopShadow ref={TopShadowRef}/>
          <Menu/>
          <Content>
            {children}
            <Footer FooterRef={FooterRef} white={blackFooter}/>
          </Content>
          <RightRibbon RibbonRef={RibbonRef} black={blackSide}/>
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