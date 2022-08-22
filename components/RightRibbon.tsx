import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

export default function RightRibbon() {
  

    const lastScrollValue = useRef(0);
    let translateValue = useRef(0);
    const RibbonRef = useRef<HTMLUListElement>(null);

    useEffect(()=>{
        window.addEventListener('scroll',()=>{
            const {scrollTop} = document.documentElement;
            const deltaScroll = scrollTop-lastScrollValue.current;
        
        })
    },[])

    return (
    <RigthRibbon>
        <ul ref={RibbonRef}>
            <li>
                <span>GraphicHunters</span>
                <span>©</span>
                <span>GraphicHunters</span>
                <span>©</span>                
            </li>
            <li>
                <span>GraphicHunters</span>
                <span>©</span>
                <span>GraphicHunters</span>
                <span>©</span>                
            </li>
        </ul>    
    </RigthRibbon>
  )
}

var RigthRibbon = styled.div`
        position: fixed;
        top: 0;
        right: 0;
        width: 100vh;
        height:8vw;
        overflow: hidden;
        background: white;
        transform: rotate(-90deg) translateY(-50%) translateX(4vw);
        transform-origin: center right;
        ul{
            display: flex;
            //gap: 2vw;
            width: auto;
            min-height: 100%;
        }
        li{
            min-height: 100%;
            font-size: 5vw;
            font-weight: 400;
            padding-right:2vw;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            gap: 2vw;
            span{
                display: block;
            }
            animation: ribbon 10s infinite linear;

            @keyframes ribbon {
                from{
                    transform: translateX(0);
                }to{
                    transform: translateX(-100%);
                }
            }
        }

    `