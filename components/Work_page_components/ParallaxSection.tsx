import React ,{useRef,useEffect} from 'react'
import Image from 'next/image';
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import styled from 'styled-components'



export default function ParallaxSection() {
    
    const ParallaxRef = useRef<HTMLDivElement>(null);
    const ParallaxSection = styled.div` 
        .content
        {
            width: 100%;
            aspect-ratio: 1.5/1;
            overflow: hidden;
            .img-container{
                position: relative;
                width: 100%;
                height: 130%;
            }
        }
    `;

    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(ParallaxRef.current,
            {
                yPercent:-40,
            },
            {
            scrollTrigger:{
              trigger:'.content',
              scroller: "#scroll-wrapper",
              start:'top bottom',
              end:'bottom top',
              scrub:true,
            },
            yPercent:0,
            duration:1
          })

    },[]);
  
    return (
    <ParallaxSection>
        <div className="content">
            <div className="img-container" ref={ParallaxRef}>
                <Image
                    src={'/images/parallax.jpg'}
                    alt={''}
                    layout={'fill'}
                    objectFit={'cover'}
                />
            </div>
        </div>
    </ParallaxSection>
  )
}
