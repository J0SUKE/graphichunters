import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import gsap from 'gsap'
import {preloaderContext} from '../../context/PreloaderContext';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import {layoutRefsContext} from '../../context/LayoutRefsContext'

import { scrollerWrapperContext } from '../../context/ScrollWrapperContext'

export default function Studio() {
  
    const Studio = styled.div`
        height: 200vh;
        background: white;
        position: relative;
        z-index: 4;
        .hero
        {
          height: calc(100vh - 4rem);
          width: calc(100% - 4rem);
          margin: auto;
          border-bottom: 1px solid rgb(180, 180, 180);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;          
          padding-bottom: 8vmax;
        }
        .hero__title
        {
          div{
            display: flex;
            justify-content: space-between;
            font-size: 8.2vmax;
            line-height: 8.2vmax;
            height: 7.2vmax;
            overflow: hidden;
            text-transform: uppercase;
            
            span{
              display: block;
              font-family: 'Serif4';
              font-size: 8.5vmax;
            }
          }
        }
        .presentation
        {
          height: 100vh;
        }

    `

    const HeroTitle = useRef<HTMLDivElement>(null);
    const creativeRef = useRef<HTMLParagraphElement>(null);
    const youngRef = useRef<HTMLSpanElement>(null);
    
    
    // hero parallax
    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(HeroTitle.current,{
          scrollTrigger:{
            trigger:'.presentation',
            scroller: "#scroll-wrapper",
            start:'top bottom',
            scrub:1,
          },
          yPercent:-50,
          duration:1,
        })

        gsap.to(youngRef.current,{
          scrollTrigger:{
            trigger:'.presentation',
            scroller: "#scroll-wrapper",
            start:'top bottom',
            scrub:1,
          },
          x:'-10vmax',
          duration:1
        })
        
        gsap.to(creativeRef.current,{
          scrollTrigger:{
            trigger:'.presentation',
            scroller: "#scroll-wrapper",
            start:'top bottom',
            scrub:1,
          },
          x:'10vmax',
          duration:1
        })

    },[])

    // header and top shadow
    useEffect(()=>{
      LogoRef.current.style.mixBlendMode = 'difference';
      NavLinksRef.current.style.mixBlendMode = 'difference';
    },[])

    // load animation
    useEffect(()=>{
      const tl = PreloaderContext?.preloadAnimation?.current;

      if (!HeroTitle.current || !tl) return;
        

      tl.fromTo([...HeroTitle.current.querySelectorAll('p'),...HeroTitle.current.querySelectorAll('span')],
      {
        rotate: 4,
        yPercent:100,
        transformOrigin:'top left',
      },{
        rotate: 0,
        yPercent:0,
        duration:.8,
        stagger:-.08
      },"-=0.7")
    },[])
    
    const wrapperContext = useContext(scrollerWrapperContext);
    const LayoutrefsContext = useContext(layoutRefsContext);
    const PreloaderContext = useContext(preloaderContext);

    if (!LayoutrefsContext) return null;
    const {TopShadowRef,ContentRef,LogoRef,NavLinksRef} = LayoutrefsContext;

    if (!wrapperContext) return null;
    const {ScrollerRef} = wrapperContext;

    return (
    <Studio>
      <div className='hero'>
        <div className="hero__title" ref={HeroTitle}>
          <div>
            <p>a</p>
            <span ref={youngRef}>young +</span>
          </div>
          <div>
            <p ref={creativeRef}>creative</p>
          </div>
          <div>
            <span>studio</span>
          </div>
        </div>
      </div>
      <div className="presentation">

      </div>
    </Studio>
  )
}
