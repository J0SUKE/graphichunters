import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { cursorContext } from '../context/CursorContext'
import Image from 'next/image'
import { gsap } from "gsap";
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import InfoLink from './InfoLink'
import { scrollerWrapperContext } from '../context/ScrollWrapperContext'
import { layoutRefsContext } from '../context/LayoutRefsContext'

export default function HomeBrands() {
  
    const HomeBrands = styled.div`
        position: relative;
        z-index: 3;        
        .works
        {
            display: flex;
            width: calc(100% - 4rem);
            margin: auto;
            justify-content: space-between;
            align-items: center;
            padding: 9vw 0 6vw 0;

            h2
            {
                color: white;
                width: 45%;
                font-size: 4vmin;
            }
            @media screen and (max-width:750px){
                flex-direction: column;
                align-items: flex-start;
                h2{
                width: 90%;
                font-size: 5vw;
                margin-bottom: 1rem;
                }
                div{
                    padding-bottom:.1rem;
                }
                div,a{
                    font-size: 1rem;
                    height: 1rem;
                    line-height: 1rem;
                }
            }
        }         
    `
    return (
    <HomeBrands>
        <div className='works'>
            <h2>WE CREATE FOR THE BIGGEST BRANDS IN THE WORLD OF SPORTS.</h2>
            <InfoLink value='more work (6)' link='/work'/>
        </div>
        <Marquee/>
    </HomeBrands>
  )
}

export function Marquee() {
    
    const Marquee = styled.div`
        display: flex;
        padding-bottom: 10vw;
        //overflow: hidden;
        ul
        {
            display: flex;
            gap: 3vw;
            padding-right: 3vw;
        }                
    `
    
    useEffect(()=>{
        
        if (!MarqueeRef?.current) return;
        
        gsap.registerPlugin(ScrollTrigger);

        let toRight = gsap.fromTo(MarqueeRef.current.querySelectorAll("ul"),
        {
            xPercent:-100,
        },
        {
            xPercent:0,
            duration:15,
            repeat:-1,
            ease:"none"
        }).totalProgress(0.5);


        gsap.to(MarqueeRef.current,{
            scrollTrigger:{
                trigger:MarqueeRef.current,
                scroller: "#scroll-wrapper",
                start:"top bottom",
                end:"bottom top",
                scrub:1,
            },
            xPercent:-50,
            duration:10,
            ease:"none"
        })
        
        let lastSCroll = 0;
        ScrollerRef?.current?.addEventListener('scroll',()=>{
            if(!MarqueeRef.current || !ScrollerRef.current) return;
            
            const scrollTop = ScrollerRef.current.scrollTop;
            let delta = scrollTop - lastSCroll;
            lastSCroll = scrollTop;
            gsap.to(toRight, {
                timeScale: delta<0 ? 1 : -1 // -1 will reverse the animation
              });
                        
        })
    },[])
    

    const wrapperContext = useContext(scrollerWrapperContext);
    const LayoutrefsContext = useContext(layoutRefsContext);

    if (!wrapperContext) return null;
    const {ScrollerRef} = wrapperContext;

    if (!LayoutrefsContext) return null;
    const {MarqueeRef} = LayoutrefsContext;

    return  (
        <Marquee className="marquee" ref={MarqueeRef}>
            <ul>
                <MarqueeItem imgLink='/images/brands/zggo.svg'/>
                <MarqueeItem imgLink='/images/brands/mercedes.svg'/>
                <MarqueeItem imgLink='/images/brands/eredvisie.svg'/>
                <MarqueeItem imgLink='/images/brands/uefa.svg'/>
                <MarqueeItem imgLink='/images/brands/ea.svg'/>
                <MarqueeItem imgLink='/images/brands/knvb.svg'/>
                <MarqueeItem imgLink='/images/brands/ldc.svg'/>
            </ul>
            <ul>
                <MarqueeItem imgLink='/images/brands/zggo.svg'/>
                <MarqueeItem imgLink='/images/brands/mercedes.svg'/>
                <MarqueeItem imgLink='/images/brands/eredvisie.svg'/>
                <MarqueeItem imgLink='/images/brands/uefa.svg'/>
                <MarqueeItem imgLink='/images/brands/ea.svg'/>
                <MarqueeItem imgLink='/images/brands/knvb.svg'/>
                <MarqueeItem imgLink='/images/brands/ldc.svg'/>
            </ul>
        </Marquee>
    )
}


function MarqueeItem({imgLink}:{imgLink:string}) 
{   
    
    const MarqueeItem = styled.div`
        width: 15vmax;
        height: 15vmax;
        border: 1px solid rgba(255, 255, 255, .3);
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .img-container
        {
            width: 50%;
            max-width: 50%;
            height: 35%;
            max-height: 35%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }
    `
    
    return <MarqueeItem>
        <div className="img-container">
            <Image
                src={imgLink}
                alt={''}
                layout={'fill'}
                priority={true}
            />
        </div>
    </MarqueeItem>
}


