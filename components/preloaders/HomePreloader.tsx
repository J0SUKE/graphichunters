import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components';
import {preloaderContext} from '../../context/PreloaderContext';
import gsap from 'gsap';
import { log } from 'console';

export default function HomePreloader({homePreladerRef,loaderText}:{homePreladerRef:React.RefObject<HTMLDivElement>,loaderText:React.RefObject<HTMLDivElement>}) {
  
    const HomePreloader = styled.div`
        position: fixed;
        inset: 0;
        z-index: 1000000;
        background: #9BFA00;
        box-shadow: 0px -20vh 100vmin 70vmin #9BFA00;        
    `
    const PreloaderText = styled.div`
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 1000001;
        display: flex;
        align-items: center;
        text-transform: uppercase;
        gap: 2.2vw;
        font-size: 2.7vw;
        overflow: hidden;
        span{
            display: block;
        }
        p{
            display: flex;
            gap: 1vw;
        }
        p:last-of-type span{
            font-weight: 500;
            font-size: 2.8vw;
            font-family: 'Serif4';
        }
    `

    const PreloaderContext = useContext(preloaderContext);

    useEffect(()=>{
        console.log('PreloaderContext?.preloadAnimation?.current : ',PreloaderContext?.preloadAnimation?.current);
        console.log('loaderText.current : ',loaderText.current);
        console.log('homePreladerRef.current.current : ',homePreladerRef.current);
        

        if (!PreloaderContext?.preloadAnimation?.current || !loaderText.current || !homePreladerRef.current) return;
        
        console.log('animation should play');
        

        let tl = PreloaderContext?.preloadAnimation?.current;

        tl.fromTo(loaderText.current.querySelectorAll('span'),
        {
            yPercent:100,
        },  
        {
            yPercent:0,
            stagger:0.03,
            delay:0.5,
            duration:.5,
            })
            tl.to([...loaderText.current.querySelectorAll('span')].reverse(),
            {
                yPercent:-100,
                delay:1.5,
                stagger:0.03,
                duration:.5,
                ease: "power3.in",
                onComplete:()=>{
                if (!loaderText.current) return;
                loaderText.current.style.display = 'none';
                }
            })
            tl.fromTo(homePreladerRef.current,
            {
            yPercent:0,
            rotate: 0,
            },
            {
            yPercent:-200,
            rotate: -7,
            duration:1
            },'-=0.3')    
        

    },[])

    return (
    <>
        <HomePreloader ref={homePreladerRef}></HomePreloader>
        <PreloaderText ref={loaderText}>
            <p>
                {
                    'the creative studio'.split(' ').map(letter=>{
                        return <span key={Math.random()*1000}>{letter}</span>
                    })
                }                
            </p>
            <p> 
                {
                    'focused on sports'.split(' ').map(letter=>{
                        return <span key={Math.random()*1000}>{letter}</span>
                    })
                }
            </p>
        </PreloaderText>
    </>
  )
}
