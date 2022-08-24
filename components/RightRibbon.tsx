import React, { useEffect, useRef,RefObject } from 'react'
import styled from 'styled-components'

export default function RightRibbon({RibbonRef}:{RibbonRef:RefObject<HTMLLIElement>}) {
  
    return (
    <RigthRibbon>
        <ul>
            <li ref={RibbonRef}>
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

            @keyframes ribbon {
                from{
                    transform: translateX(0);
                }to{
                    transform: translateX(-100%);
                }
            }
        }

    `