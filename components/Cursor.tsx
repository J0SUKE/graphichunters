import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { cursorContext } from '../context/CursorContext';

export default function Cursor() {
  
    const Cursor = styled.div`
        position: absolute;
        z-index: 999;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: #9BFA00;
        pointer-events: none;
        position: relative;
        transition: transform .3s;

        &.onScroll{
            transform: scale(10);
            &::before
            {
                content: 'scroll';
                font-size: 3rem;
                position: absolute;
                left: 0;
                top: 0;
                width:100%;
                height: 100%;
                transform: scale(.1);
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.3rem;
                font-family: 'Serif4';
                text-transform: uppercase;
            }
        }
        &.onLink
        {
            transform: scale(0.6);
        }
    `;

    const Position = useRef({x:0,y:0});
    const lerpFactor = useRef(0.7);
    const lastScroll = useRef(0);
    const cursorTop = useRef(0);

    useEffect(()=>{
        document.addEventListener("mousemove",(e)=>{
            updateCursor(e.pageX,e.pageY);
        })
        document?.addEventListener('scroll',scroll);
    },[]);


    const CURSORCONTEXT = useContext(cursorContext);
    if (!CURSORCONTEXT) return null;
    const {CursorRef} = CURSORCONTEXT;

    function  updateCursor(positionX:number,positionY:number)
    {
        if (!CursorRef?.current || !document) return;

        Position.current.x = lerp(Position.current.x, positionX, lerpFactor.current);
        Position.current.y = lerp(Position.current.y, positionY, lerpFactor.current);

        CursorRef.current.style.left = `${Position.current.x-7}px`;
        CursorRef.current.style.top = `${Position.current.y-8}px`;

        cursorTop.current = Position.current.y;
        const{scrollTop} = document.documentElement;
        lastScroll.current=scrollTop;

    }

    function scroll() {
        
        if(!CursorRef?.current || !document) return;
        
        const{scrollTop} = document.documentElement;
        let deltaScroll = scrollTop-lastScroll.current;
        Position.current.y = cursorTop.current+deltaScroll;
        CursorRef.current.style.top = `${Position.current.y}px`; 
    }
  

    return (
    <Cursor ref={CursorRef}></Cursor>
  )
}


function lerp (start:number, end:number, amt:number){
    return (1-amt)*start+amt*end
  }
