import { type } from 'os'
import React,{useRef,useEffect} from 'react'
import { ImageData } from '../../types/ImageData'
import Image from 'next/image'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import styled from 'styled-components'

export default function ParallaxImagesGrid({images,bgColor}:{images:ImageData[],bgColor?:string}) {
  
  
    const ParallaxImagesGrid = styled.div`
        
        padding: 8vmax 0;
        background: ${bgColor ? bgColor : 'unset'};
        .parallax-grid-content{
            display: grid;
            width: calc(100% - 25vmax);
            margin: auto;
            grid-template-columns: repeat(2,1fr);
            grid-gap: 33%;
            li{
                position: relative;
                aspect-ratio: ${images[0].width} / ${images[0].height};
                width: 100%;
                //min-height: 300px;
                .img-container{
                    width: 100%;
                    height: 100%;
                    position: relative;
                }
            }
        }
    `
    
    const ImagesRef = useRef<HTMLUListElement>(null)


    useEffect(()=>{
        if (!ImagesRef.current) return;
        
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo([...ImagesRef.current.querySelectorAll('li')][0],
            {
                yPercent:10,
            },
            {
            scrollTrigger:{
              trigger:'.parallax-grid-content',
              scroller: "#scroll-wrapper",
              start:'top bottom',
              end:'bottom top',
              scrub:1,
            },
            yPercent:-10,
            duration:1
          })
        
          gsap.fromTo([...ImagesRef.current.querySelectorAll('li')][1],
            {
                yPercent:-10,
            },
            {
            scrollTrigger:{
              trigger:'.parallax-grid-content',
              scroller: "#scroll-wrapper",
              start:'top bottom',
              end:'bottom top',
              scrub:1,
            },
            yPercent:10,
            duration:1
          })
    },[])

    return (
    <ParallaxImagesGrid>
        <ul className="parallax-grid-content" ref={ImagesRef}>
            {
                images.map((item:ImageData)=>(
                    <li key={item.url}>
                        <div className="img-container">
                            <Image
                                src={item.url}
                                layout={'fill'}
                                alt={''}
                                priority={true}
                            />
                        </div>
                    </li>
                ))
            }          
        </ul>
    </ParallaxImagesGrid>
  )
}
