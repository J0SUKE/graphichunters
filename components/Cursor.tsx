import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { cursorContext } from '../context/CursorContext';

export default function Cursor() {
  
    const Cursor = styled.div`
        position: fixed;
        top: 0;
        z-index: 99999;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: #9BFA00;
        pointer-events: none;
        position: relative;
        transition: transform .3s;


        &.onLink
        {
            transform: scale(0.6);
        }
        &.blend{
            background: rgb(100, 5, 255);
        }
        &.onScroll{
            transform: scale(10) translateY(-0.1rem);
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
                font-size: 1.1rem;
                font-family: 'Serif4';
                text-transform: uppercase;
            }
        }
        &.onView{
            transform: scale(8) translateY(-0.1rem);
            background: #9BFA00;
            &::before
            {
                content: 'view';
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
                font-size: 1.2rem;
                font-family: 'Serif4';
                text-transform: uppercase;
            }
        }
        &.onArchive{
            transform: scale(12) translateY(-0.1rem);
            background: #9BFA00;
            &::before
            {
                content: 'archive';
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
                font-size: .9rem;
                font-family: 'Serif4';
                text-transform: uppercase;
            }
        }
    `;

    const [mobile,setmobile] = useState(true);
    const Position = useRef({x:0,y:0});
    const lerpFactor = useRef(0.3);

    useEffect(()=>{
        document.addEventListener("mousemove",(e)=>{
            updateCursor(e.pageX,e.pageY);
        })
    },[]);


    useEffect(()=>{
        
        if (!navigator.userAgent) return;
        
        if (!isMobile()) setmobile(false)
        else setmobile(true);
    },[])

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

    }  
    return (
        <>
            {
                !mobile && <Cursor ref={CursorRef}></Cursor>
            }
        </>
  )
}


function lerp (start:number, end:number, amt:number){
    return (1-amt)*start+amt*end
  }

function isMobile() 
{    
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return true;
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return true;
    }
    return false;
};