import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

export default function RightRibbon() {
  
    const RigthRibbon = styled.div`
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width:8vw;
        overflow: hidden;
        transform-origin:bottom right;
        background: white;
        &>div{
            border: 1px solid black;
        }
        ul{
            min-height: 100%;
            max-height: 100%;
            display: flex;
            align-items: center;
            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
        li{
            height: 100%;
            font-size: 5vw;
            font-weight: 400;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            gap: 2vw;
            span{
                display: block;
            }
        }

    `

    const lastScrollValue = useRef(0);
    let translateValue = useRef(0);
    const RibbonRef = useRef<HTMLUListElement>(null);

    useEffect(()=>{
        window.addEventListener('scroll',()=>{
            const {scrollTop} = document.documentElement;
            const deltaScroll = scrollTop-lastScrollValue.current;

            if (RibbonRef.current)
            {
                RibbonRef.current.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -${scrollTop}, 0, 1)`
            } 

            lastScrollValue.current=scrollTop;
        })
    },[])

    return (
    <RigthRibbon>
        <div>
            <ul ref={RibbonRef}>
                <li>
                    <span>GraphicHunters</span>
                    <span>©</span>
                    <span>GraphicHunters</span>
                    <span>©</span>
                    <span>GraphicHunters</span>
                    <span>©</span>            
                    <span>GraphicHunters</span>
                    <span>©</span>            
                    <span>GraphicHunters</span>
                    <span>©</span>            
                    <span>GraphicHunters</span>
                    <span>©</span>            
                    <span>GraphicHunters</span>
                    <span>©</span>
                    <span>GraphicHunters</span>
                    <span>©</span>
                    <span>GraphicHunters</span>
                    <span>©</span>            
                    <span>GraphicHunters</span>
                    <span>©</span>            
                    <span>GraphicHunters</span>
                    <span>©</span>            
                    <span>GraphicHunters</span>
                    <span>©</span>            
                </li>
            </ul>
        </div>        
    </RigthRibbon>
  )
}
