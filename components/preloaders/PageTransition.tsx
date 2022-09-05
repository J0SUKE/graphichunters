import { log } from 'console';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components';
import {preloaderContext} from '../../context/PreloaderContext';

export default function PageTransition({pageTransitionRef}:{pageTransitionRef:React.RefObject<HTMLDivElement>}) {
  
    const PageTransition = styled.div`
        position: fixed;
        inset: 0;
        z-index: 1000000;
        background: #9BFA00;
        box-shadow: 0px -20vh 100vmin 70vmin #9BFA00;        
    `

    const PreloaderContext = useContext(preloaderContext);
    const router = useRouter();

    useEffect(()=>{                        
        
        if (!PreloaderContext?.preloadAnimation?.current || !pageTransitionRef.current) return;
                
        let tl = PreloaderContext?.preloadAnimation?.current as gsap.core.Timeline;
        tl.clear();

        
        tl.fromTo(pageTransitionRef.current,
        {
            yPercent:0,
            rotate: 0,
        },
        {
            yPercent:-200,
            rotate: -7,
            duration:1
        })            
    },[router])

    return (
    <>
        <PageTransition ref={pageTransitionRef}></PageTransition>        
    </>
  )
}
