import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import gsap from 'gsap';
import HoverMenu from './HoverMenu';
import Link from 'next/link';
import useCursorInteraction from '../../hooks/useCursorInteraction';

export default function Services({ServicesRef}:{ServicesRef:React.RefObject<HTMLDivElement>}) {
    
    const ServiceParallaxRef = useRef<HTMLSpanElement>(null);
    const TheParallaxRef = useRef<HTMLSpanElement>(null);

    useEffect(()=>{
      if (!ServiceParallaxRef.current || !TheParallaxRef.current || !ServicesRef.current) return;

      gsap.fromTo(ServiceParallaxRef.current,
      {
        xPercent:-20,
      },
      {
        scrollTrigger:{
          trigger:ServicesRef.current,
          scroller: "#scroll-wrapper",
          start:'top bottom',
          scrub:1,
        },
        xPercent:0,
        duration:2,        
        ease: "power2.out"
      })
      
      gsap.fromTo(TheParallaxRef.current,
      {
        xPercent:-20,
      },
      {
        scrollTrigger:{
          trigger:TheParallaxRef.current,
          scroller: "#scroll-wrapper",
          start:'top bottom',
          scrub:1,
        },
        xPercent:0,
        duration:8,        
        ease: "power2.out"
      })

    },[]);


    const Services = styled.div`
        position: relative;
        z-index: 4;
        background: #EEEEEE;
        .top{
          justify-content: space-between;
          align-items: center;
          width: calc(100% - 4rem);
          margin:auto;
          padding: 9vw 0;
          p{
            font-size: clamp(6vmax,9vw,9vmax);
          }
          div{
            display: flex;
            align-items: center;
            &:first-of-type{
              justify-content: space-between;
            }
            &:last-of-type{
              justify-content: flex-end;
            }
            line-height: clamp(6vmax,9vw,9vmax);
            //height: 9vmax;
            span{
              display: block;
              font-size: clamp(6vmax,9vw,9vmax);
              text-transform: uppercase;
            }
            #services
            {
              font-family: 'Serif4';
              font-weight: 500;
            }
            #t14
            {
              font-family: 'Serif4';
              font-weight: 500;
            }
          }
        }
    `
  
    return (
    <Services ref={ServicesRef}>
      <div className='top'>
        <div>
          <p id='t14'>1-4</p>
          <span ref={TheParallaxRef}>the</span>
          <span></span>
        </div>
        <div>
          <span id='services' ref={ServiceParallaxRef}>services</span>
        </div>
      </div>
      <HoverMenu/>
      <div style={{height:10 + 'vmax'}}></div>
      <LogoVideo/>
    </Services>
  )
}

export function LogoVideo() {
  
  const videoRef = useCursorInteraction('onArchive') as React.RefObject<HTMLDivElement>;
  
  const LogoVideo = styled.div`
      background: white;
      position: relative;
      .video-container
      {
        filter: brightness(1.2) invert(1) saturate(1.5);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 45vw;
        video{
          height: 100%;

        }
      }
      a{
        position: absolute;
        inset: 0;
        display: block;
        width: 100%;

        background: rgba(30, 30, 30, .15);
      }
  `

  return (
    <LogoVideo ref={videoRef}>
      <div className="video-container">
        <video autoPlay loop muted src="/video/rotate-g.mp4"></video>
      </div>
      <Link href={'/archive'}>
        <a>
        </a>
      </Link>
    </LogoVideo>
  )
}