import React,{useContext,useEffect,useRef} from 'react'
import styled from 'styled-components'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import {layoutRefsContext} from '../../context/LayoutRefsContext'
import { throttle } from 'lodash';
import { scrollerWrapperContext } from '../../context/ScrollWrapperContext';
import DataInterface from '../../types/DataInterface'
import {preloaderContext} from '../../context/PreloaderContext';
import InfoLink from '../InfoLink';
import useCursorInteraction from '../../hooks/useCursorInteraction';
import WorkGridItem from '../WorkGridItem';
import Link from 'next/link';


export default function Jobs({works}:{works:DataInterface}) 
{  
  const HeroTitle = useRef<HTMLDivElement>(null);
  const collective = useRef<HTMLSpanElement>(null);
  
  const Jobs = styled.div`
    background: #EEEEEE;
    position: relative;
    z-index: 4;
    .hero{
      width: calc(100% - 4rem);
      height: calc(100vh - 3rem);
      margin: auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-bottom: 3rem;
      .title{
        margin-bottom: 8vmax;
        div{
          line-height: 8vmax;
          height: 7.2vmax;
          overflow: hidden;
        }
        div:last-of-type{
          display: flex;
          height: 8vmax;
          justify-content: flex-end;
        }
        p
        {
          font-size: clamp(5vmax,8.2vw,8.2vmax);
          text-transform: uppercase;
        }
        span{
          font-size: clamp(5.5vmax,9.5vw,9.5vmax);
          display: block;
          font-family: 'Serif4';
          text-transform: uppercase;
        }
      }
      .desc{
        width: 25vmax;
        line-height: 1.5rem;
        font-size: 1rem;
      }
    }

    .jobs
    {
      border-top: 1px solid rgb(180, 180, 180);
      width: calc(100% - 4rem);
      margin: auto;
    }

    .works-top
    {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h2{
        font-size: 2.5vmax;
        font-weight: 400;
        text-transform: uppercase;
      }
      div{
        mix-blend-mode: difference;
      }
    }

    .recent-works
    {
      padding-top: 7rem;
      width: calc(100% - 4rem);
      margin: auto;
      .works{
        display: grid;
        padding-top: 2rem;
        grid-template-columns: repeat(2,1fr);
        grid-gap: 3rem;
        padding-bottom: 8vmax;
        @media screen and (max-width:720px)
          {
              grid-template-columns: 1fr;
          }
        h2,p{
          mix-blend-mode: difference;
        }

      }
    
    }


  `
  //header and top shadow
  useEffect(()=>{

    LogoRef.current.style.mixBlendMode = 'difference';
    NavLinksRef.current.style.mixBlendMode = 'difference';  
    
    
    ScrollerRef?.current?.addEventListener('scroll',throttle(()=>{
      
      if (!FooterRef.current || !ScrollerRef?.current ) return; 
      
      const FooterTop = FooterRef.current.getBoundingClientRect().top;
    
      if (FooterTop<=0 ) 
      {
        LogoRef.current.style.mixBlendMode = 'unset';
        NavLinksRef.current.style.mixBlendMode = 'unset';                  
        gsap.to(TopShadowRef.current,{
          opacity: 1,
          duration:.5,
          ease: "power3.out",
          })       
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


  useEffect(()=>{
      gsap.registerPlugin(ScrollTrigger);
          
      gsap.to(HeroTitle.current,{
          scrollTrigger:{
              trigger:'.hero',
              scroller: "#scroll-wrapper",
              start:'top top',
              scrub:1,
          },
          yPercent:-50,
          duration:1,
      })
      
      gsap.fromTo(collective.current,
        {
          xPercent:-10,
        },
        {
          scrollTrigger:{
              trigger:'.hero',
              scroller: "#scroll-wrapper",
              start:'top top',
              scrub:1,
          },
          xPercent:-25,
          duration:1,
      })
  },[])

  const LayoutrefsContext = useContext(layoutRefsContext);
  const wrapperContext = useContext(scrollerWrapperContext);
  const PreloaderContext = useContext(preloaderContext);
  
  if (!LayoutrefsContext) return null;
  const {TopShadowRef,LogoRef,NavLinksRef,FooterRef} = LayoutrefsContext;

  if (!wrapperContext) return null;
  const {ScrollerRef} = wrapperContext;
  
  return (
    <Jobs>
      <div className="hero">
        <div className="title" ref={HeroTitle}>
          <div>
            <p>join the</p>
          </div>
          <div>
            <span ref={collective}>collective®</span>
          </div>
        </div>
        <div className="desc">
          <p>We are a collective of highly talented creatives sharing one goal: developing the best visual productions in sports.</p>
        </div>
      </div>
      <div className="jobs">
        <Job title='visual designer' place='Amsterdam/Geleen'/>
        <Job title='collective®' place='Remote'/>
        <Job title='open application' place='Remote'/>
      </div>
      <div className="recent-works">
        <div className="works-top">
          <h2>recent work</h2>
          <InfoLink value={`overview (${works.allWorks.length+1})`} link={'/work'}/>
        </div>
        <ul className="works">
          {
            works.allWorks.slice(0,2).map((item:any)=>{
              return <WorkGridItem
                        key={item.id}
                        imgUrl={item.image.url}
                        pageUrl={item.slug}
                        title={item.title}
                        desc={item.desc}
                        overlayColor={item.laoder.hex}
                    />
            })

          }
        </ul>        
      </div>
    </Jobs>
  )
}

function Job({title,place}:{title:string,place:string}) 
{
  const Job = styled.div`
    border-bottom: 1px solid rgb(180, 180, 180);
    padding: 2rem 0;
    display: grid;
    grid-template-columns: 3fr 1fr 1fr;
    align-items: center;
    cursor: pointer;
    @media screen and (max-width:760px){
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 1fr);
      h2 { grid-area: 1 / 1 / 2 / 4; }
      p { grid-area: 2 / 1 / 3 / 4; }
      div { grid-area: 2 / 4 / 3 / 5; }
    }
    @media screen and (max-width:520px){
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 1fr);
      h2 { grid-area: 1 / 1 / 2 / 3; }
      p { grid-area: 2 / 1 / 3 / 3; }
      div { grid-area: 2 / 3 / 3 / 5; }
    }
    div{
      mix-blend-mode: difference;
      justify-self: end;
    }
    p{
      transition: opacity .3s;
    }
    h2{
      font-size: clamp(3vmax,4.5vw,4.5vmax);
      text-transform: uppercase;
      font-weight: 400;
      transition: transform .3s ,opacity .3s;
    }

    &:hover
    {
      h2{
        transform: translateX(5%);
        opacity: .5;
      } 
      p{
        opacity: .5;
      }
      div{
        border-bottom: 1px solid #9BFA00;
        a:last-of-type
        {
            transform: translateY(-100%);
            color: #9BFA00;
        }
        a:first-of-type
        {
            transform: translateY(-120%);
        }
      }
    }
  `

  return <Link href={'/contact'}>
            <Job>
              <h2>{title}</h2>
              <p>{place}</p>
              <InfoLink value='more info' link='/contact'/>
            </Job>
        </Link>
}