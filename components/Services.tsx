import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import gsap from 'gsap';

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
          start:'top bottom',
          scrub:true,
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
          start:'top bottom',
          scrub:true,
        },
        xPercent:0,
        duration:8,        
        ease: "power2.out"
      })

    },[]);


    const Services = styled.div`
        position: relative;
        z-index: 3;
        background: #EEEEEE;
        height: 200vh;
        .top{
          justify-content: space-between;
          align-items: center;
          width: calc(100% - 4rem);
          margin:auto;
          padding: 9vw 0;
          p{
            font-size: 9vmax;
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
            line-height: 9vmax;
            //height: 9vmax;
            span{
              display: block;
              font-size: 9vmax;
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
    </Services>
  )
}
