import { log } from 'console'
import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import DataInterface from '../../types/DataInterface'
import WorkGridItem from '../WorkGridItem'
import {CommingSoon} from '../WorkGridItem';
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import {preloaderContext} from '../../context/PreloaderContext';
import {layoutRefsContext} from '../../context/LayoutRefsContext';
import { throttle } from 'lodash'
import {scrollerWrapperContext} from '../../context/ScrollWrapperContext';


interface workInterface {
  [nameField:string]:any
}

export default function Work({data}:{data:DataInterface}) {
  
  const PreloaderContext = useContext(preloaderContext);
  
  const HeroTitle = useRef<HTMLDivElement>(null);
  const BottomnRef = useRef<HTMLDivElement>(null);
  const LooakAtRef = useRef<HTMLParagraphElement>(null);
  const inches16Ref = useRef<HTMLSpanElement>(null);
  const workRef = useRef<HTMLDivElement>(null);

  const Work = styled.div`
    background: black;
    position: relative;
    z-index: 4;    
    .container{
      width: calc(100% - 4rem);
      margin: auto;
      display: grid;
      grid-template-columns: repeat(2,1fr);
      border-top: 1px solid #a9a9a956;
      padding-top: 3rem;
      grid-gap: 3rem;
      padding-bottom: 6vmax;

      @media screen and (max-width:720px)
      {
          grid-template-columns: 1fr;
      }

    }

    .hero{
      height: calc(100vh - 3rem);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 0 2rem 6rem 2rem;
      color: white;


      &__main
      {
        font-size: 7.7vmax;
        line-height: 7.7vmax;
        margin-bottom: 2rem;

        div{
          display: flex;
          justify-content: space-between;
          height: 7.2vmax;
          text-transform: uppercase;
          overflow: hidden;
          @media screen and (max-width:500px)
          {
            flex-direction: column;
            flex-flow: column-reverse;
          }
        }
        span{
          display: block;
          font-family: 'Serif4';
          font-size: 8.8vmax;
        }
        #in16
        {
          transform: translateX(-10vmax);
        }
      }
    }
  `
  // load animation
  useEffect(()=>{        
    
    const tl = PreloaderContext?.preloadAnimation?.current;

    if (!HeroTitle.current || !BottomnRef.current  || !tl) return;
      

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
    .fromTo(BottomnRef.current,{
      y:'3rem',
    },{
      y:0,
      duration:.8,
      stagger:-0.1
    },'<')
  },[])
  
  // hero parallax
  useEffect(()=>{
    if (!LooakAtRef.current || !inches16Ref.current) return;

    gsap.registerPlugin(ScrollTrigger);

    
    gsap.to(LooakAtRef.current,{
      scrollTrigger:{
        trigger:'.container',
        scroller: "#scroll-wrapper",
        start:'top bottom',
        scrub:1,
      },
      x:'30vmax',
      duration:1
    })
    
    gsap.to(inches16Ref.current,{
      scrollTrigger:{
        trigger:'.container',
        scroller: "#scroll-wrapper",
        start:'top bottom',
        scrub:1,
      },
      x:'-30vmax',
      duration:1
    })
    
    gsap.to(HeroTitle.current,{
      scrollTrigger:{
        trigger:'.container',
        scroller: "#scroll-wrapper",
        start:'top bottom',
        scrub:1,
      },
      yPercent:-80,
      duration:1,
      opacity: .2,
    })    
  },[])

  // top shadow and header
  useEffect(()=>{
    
    // top shadow
    gsap.to(TopShadowRef.current,{
    scrollTrigger:{
        trigger:ContentRef.current,
        scroller: "#scroll-wrapper",
        start:()=>window.innerHeight*0.7+' center',
        toggleActions:'play pause pasue reverse'
    },      
    opacity: 1,
    duration:.5,
    ease: "power3.out",
    })    

    // header
    ScrollerRef?.current?.addEventListener('scroll',throttle(()=>{
      // if the bottom - 3rem is in top of the viewport ==> header.mixBlend = differnce + shadow opacity = 0
      if (!workRef.current || !ScrollerRef.current) return;

      const bottom = workRef.current.getBoundingClientRect().bottom;
      let bottomPadding = parseFloat(window.getComputedStyle(workRef.current.querySelector('.container') as HTMLElement).getPropertyValue('padding-bottom'));

      if (bottom - bottomPadding <= 0 ) 
      {
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


  },[])

  const wrapperContext = useContext(scrollerWrapperContext);
  const LayoutrefsContext = useContext(layoutRefsContext);

  if (!LayoutrefsContext) return null;
  const {TopShadowRef,ContentRef,LogoRef,NavLinksRef} = LayoutrefsContext;

  if (!wrapperContext) return null;
  const {ScrollerRef} = wrapperContext;

  return (
    <Work ref={workRef}>
      <div className='hero'>
        <div className="hero__main" ref={HeroTitle}>
          <div>
            <p>take a</p>
            <span ref={inches16Ref} id='in16'>16’</span>
          </div>
          <div>
            <p ref={LooakAtRef}>look at</p>
            <span>22’</span>
          </div>
          <div>
            <span>our work</span>
          </div>
        </div>
        <div className="hero__bottom" ref={BottomnRef}>
          <p>GraphicHunters develops distinctive brand and campaign styles.</p>
        </div>
      </div>
      <div className="container">
      {
        data.allWorks.map((item:workInterface)=>{
          return  <WorkGridItem 
                      key={item.id}
                      imgUrl={item.image.url as string}
                      pageUrl={item.slug as string}
                      title={item.title as string}
                      desc={item.desc as string}
                      overlayColor={item.laoder.hex as string}
                  />
        })
      }
        <CommingSoon 
            imgUrl='/images/logo-mark-2.jpg' 
            title='knvb' 
            desc='a brand new look for TOTO KNVB Beker'
            overlayColor='#8C8783'
        />
        <WorkGridItem 
            imgUrl={'/images/thumb-3.jpg'}
            pageUrl={'eredivisie-one-to-watch'}
            title={'Eredivisie'}
            desc={'A NEW SEASON OF ONE TO WATCH'}
            overlayColor={'#DEF4E3'}
        />
        <WorkGridItem 
            imgUrl={'/images/thumb-4.jpg'}
            pageUrl={'easports-fgs22'}
            title={'EA Sports'}
            desc={'ARTWORK FOR FIFA GLOBAL SERIES \'22'}
            overlayColor={'#F36329'}
        />
      </div>      
    </Work>
  )
}
