import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { cursorContext } from '../context/CursorContext'
import Image from 'next/image'
import gsap from 'gsap'
import InfoLink from './InfoLink'

export default function HomeBrands({MarqueeRef}:{MarqueeRef:React.RefObject<HTMLDivElement>}) {
  
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
        <Marquee MarqueeRef={MarqueeRef}/>
    </HomeBrands>
  )
}

export function Marquee({MarqueeRef}:{MarqueeRef?:React.RefObject<HTMLDivElement>}) {
    
    const Marquee = styled.div`
        display: flex;
        //padding-bottom: 10vw;
        overflow: hidden;
        ul
        {
            display: flex;
            gap: 3vw;
            padding-right: 3vw;
            animation: animateMarquee 17s linear infinite;
            transform: translateX(-100%);
        }        

        @keyframes animateMarquee {
            from{
                transform: translateX(-100%);
            }to{
                transform: translateX(0%);
            }
        }
    `
    
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


