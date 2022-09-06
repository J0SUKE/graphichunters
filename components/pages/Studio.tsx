import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import {preloaderContext} from '../../context/PreloaderContext';
import {layoutRefsContext} from '../../context/LayoutRefsContext'
import useCursorInteraction from '../../hooks/useCursorInteraction';
import { scrollerWrapperContext } from '../../context/ScrollWrapperContext'
import {Marquee} from '../HomeBrands';
import KeyValues from '../Studio/KeyValues';
import Image from 'next/image';
import { LogoVideo } from '../Home/Services';
import { log } from 'console';
import { throttle } from 'lodash';
import useShadowHeader from '../../hooks/useShadowHeader';

export default function Studio() {
  
    const Studio = styled.div`
        background: #EEEEEE;
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
            font-size: clamp(6.2vmax,8.2vw,8.2vmax);
            line-height: clamp(6.2vmax,8.2vw,8.2vmax);
            height: clamp(5.2vmax,7.2vw,7.2vmax);
            overflow: hidden;
            text-transform: uppercase;
            
            span{
              display: block;
              font-family: 'Serif4';
              font-size: lamp(6.5vmax,8.5vw,8.5vmax);
            }
          }
        }
        .presentation
        {
          width: calc(100% - 4rem);
          margin: auto;
          background: #EEEEEE;
          padding-top: 3rem;
          padding-bottom: 8vmax;
          display: flex;
          justify-content: space-between;
          &__right
          {
            width: 65%;
            aspect-ratio: 1/1;
            overflow: hidden;
            background: darkgray;
            pointer-events: none;
            &__img-container
            {
              width: 100%;
              pointer-events: none;
              height: 140%;
              position: relative;
            }
          }  
          
          &__left
          {
            width: 30%;
            h2{
              font-weight: 300;
              font-size: clamp(2vmax,2.5vw,2.5vmax);
            }            
          }

          @media screen and (max-width:730px){
            flex-direction: column;
            &__right,&__left{
              width: 100%;
            }
            &__left
            {
              font-size: 3.5vmax;
            }
            &__right
            {
              margin-top: 10vmax;
            }
          }

        }
        .middle-section
        {
          background: black;
          color: white;
          padding-top: 8vmax;
          padding-bottom: 10vmax;
          h2{
            width: calc(100% - 4rem);
            margin: auto;          
            font-size: 2.5vmax;
            font-weight: 400;
            padding-bottom: 6vmax;
          }
        }

    `

    const StudioRef = useCursorInteraction('blend') as React.RefObject<HTMLDivElement>;
    const HeroTitle = useRef<HTMLDivElement>(null);
    const creativeRef = useRef<HTMLParagraphElement>(null);
    const youngRef = useRef<HTMLSpanElement>(null);
    const ImageParallaxRef = useRef<HTMLDivElement>(null);
    const midSectionRef = useShadowHeader() as React.RefObject<HTMLDivElement>;
    const keyValuesRef = useRef<HTMLDivElement>(null);
        
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

        gsap.fromTo(ImageParallaxRef.current,
          {
            yPercent:-25
          },
          {
          scrollTrigger:{
            trigger:'.presentation',
            scroller: "#scroll-wrapper",
            start:'top bottom',
            endTrigger:'.presentation__right',
            end:'bottom top',
            scrub:1,
          },
          yPercent:0,
          ease:"none",
          duration:1,
        })

    },[])

    // header and top shadow
    useEffect(()=>{

      LogoRef.current.style.mixBlendMode = 'difference';
      NavLinksRef.current.style.mixBlendMode = 'difference';  
      (MenuButtonRef.current as HTMLDivElement).classList.add('dark');                  

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
    const {TopShadowRef,LogoRef,NavLinksRef,MenuButtonRef} = LayoutrefsContext;

    if (!wrapperContext) return null;
    const {ScrollerRef} = wrapperContext;

    return (
    <Studio ref={StudioRef}>
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
        <div className="presentation__left">
          <h2>GRAPHICHUNTERS DEVELOPS DISTINCTIVE BRAND AND CAMPAIGN STYLES, DELIVERING NEXT LEVEL VISUAL CONTENT.</h2>
        </div>        
        <div className="presentation__right">
            <div className="presentation__right__img-container" ref={ImageParallaxRef}>
              <Image
                src={'/images/office-image.jpg'}
                alt={''}
                layout={'fill'}
                objectFit={'contain'}
                priority={true}
              />
            </div>
        </div>
      </div>
      <div className="middle-section" ref={midSectionRef}>
          <h2>
            <p>WE CREATE FOR THE BIGGEST</p>
            <p>BRANDS IN THE WORLD OF SPORTS.</p>
          </h2>
          <Marquee/>
          <KeyValues keyValuesRef={keyValuesRef}/>
      </div>
      <LogoVideo/>
    </Studio>
  )
}
