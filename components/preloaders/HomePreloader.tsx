import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import gsap from 'gsap';

export default function HomePreloader({homePreladerRef,loaderText}:{homePreladerRef:React.RefObject<HTMLDivElement>,loaderText:React.RefObject<HTMLDivElement>}) {
  
    const HomePreloader = styled.div`
        position: fixed;
        inset: 0;
        z-index: 1000000;
        background: #9BFA00;
        box-shadow: 0px -20vh 100vh 70vh #9BFA00;        
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
