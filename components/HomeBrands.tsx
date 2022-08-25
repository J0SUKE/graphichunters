import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'

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
        }
        .our-works
        {
            text-transform: uppercase;
            padding-bottom: .3rem;
            box-sizing: content-box;
            border-bottom: 1px solid white;
            display: inline-block;
            transition: border-bottom .5s;
            color: white;
            font-size: 1.3rem;
            height: 1.3rem;
            overflow-y: hidden;
            margin: .5rem 0;
            cursor: pointer;
            &:hover
            {
                border-bottom: 1px solid #9BFA00;
                a:last-of-type
                {
                    transform: translateY(-120%);
                    color: #9BFA00;
                }
                a:first-of-type
                {
                    transform: translateY(-100%);
                }
            }
            a{
                display: block;
                transition: transform .6s cubic-bezier( 0.52, 0.26, 0.05, 0.9 ) ;
            }      
        }

        .marquee
        {
            display: flex;
            padding-bottom: 10vw;
            overflow: hidden;
        }
        ul{
            display: flex;
            gap: 3vw;
            padding-right: 3vw;
        }        
    `

    useEffect(()=>{
        if (!MarqueeRef.current) return;
        gsap.fromTo(
            MarqueeRef.current.querySelectorAll('ul'),
            {
                xPercent:-100,
                repeat:-1,                
            },
            {
                scrollTrigger:{
                    trigger:MarqueeRef.current,
                    start:'top bottom',            
                    // end:'top center',
                    // toggleActions:'play reverse play reverse',
                },
                xPercent:0,
                duration:17,
                ease: "none",
                repeat:-1,
            })
    },[]);

    return (
    <HomeBrands>
        <div className='works'>
            <h2>WE CREATE FOR THE BIGGEST BRANDS IN THE WORLD OF SPORTS.</h2>
            <div className='our-works'>
                <Link href={`/work`}><a>more work (6)</a></Link>
                <Link href={`/work`}><a>more work (6)</a></Link>
            </div>
        </div>
        <div className="marquee" ref={MarqueeRef}>
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
        </div>
    </HomeBrands>
  )
}


function MarqueeItem({imgLink}:{imgLink:string}) 
{   
    
    const MarqueeItem = styled.div`
        width: 15vw;
        height: 15vw;
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
