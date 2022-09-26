import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { throttle } from 'lodash';
import { scrollerWrapperContext } from '../../context/ScrollWrapperContext';
import { isMobile } from '../../utils/isMobile';

export default function HoverMenu() {
    const MenuRef = useRef<HTMLDivElement>(null)
    const ImageBox = useRef<HTMLDivElement>(null);
    const ImageBoxContainer = useRef<HTMLDivElement>(null);
    const mouseOverMenu = useRef(false);
    const lastSCroll = useRef(0);

    const BoxPosition = useRef({x:0,y:0});


    const HoverMenu = styled.div`
        width:calc(100% - 4rem);    
        margin: auto;
        border-top: 1px solid rgba(28, 29, 32, 0.3);
        position: relative;
        .img-box
        {
            position: fixed;
            top: 0;
            left: 45%;
            z-index: 2;
            width: 25vw;
            height: 0;
            transform-origin: center center;
            transition: height .7s;
            pointer-events: none;

            &.active
            {
                height: 25vw;
            }            
        }
        .img-container
        {
            position: absolute;
            inset: 0;
            height: 100%;
            width: 100%;
            background-position: center center;            
            background-size: cover;
        }

    `

    useEffect(()=>{ 
        if (!MenuRef.current) return;
        
        MenuRef.current.addEventListener('mouseenter',()=>{
            
            if(!ImageBox.current || isMobile()) return;
            
            mouseOverMenu.current=true;
            ImageBox.current.classList.add('active');


            const {scrollTop} = document.documentElement;
            lastSCroll.current = scrollTop;

        })
        
        MenuRef.current.addEventListener('mouseleave',()=>{
            
            if(!ImageBox.current || isMobile()) return;
            
            mouseOverMenu.current=false;
            ImageBox.current.classList.remove('active');
        })

        MenuRef.current.addEventListener('mousemove',throttle((e)=>{
            
            if (isMobile()) return;
            
            const width = MenuRef.current?.getBoundingClientRect().width;
            if (!ScrollerRef?.current || !ImageBox.current || !width || !ImageBox.current) return ;
            
            var offsetX = e.offsetX;
            var offsetY = e.offsetY;

            var element = e.target as HTMLElement;

            
            while (element !== MenuRef.current) 
            {
                offsetX += element.offsetLeft;
                offsetY += element.offsetTop;
                element = element.parentNode as HTMLElement;
            }

            const Boxheight = ImageBox.current.getBoundingClientRect().height;            

            if (offsetX < 2) return;            

            BoxPosition.current.x = Math.log2(offsetX+40)*4 + 25;
            
            //BoxPosition.current.y = lerp(BoxPosition.current.y,offsetY-Boxheight/2,0.1);            

        },10))


        window.addEventListener('mousemove',(e)=>{
            if(!ImageBox.current) return;
            const Boxheight = ImageBox.current.getBoundingClientRect().height;            
            
            BoxPosition.current.y = e.clientY - Boxheight/2;    
        })

        function updatePosition() {
            
            if(ImageBox.current)
            {
                ImageBox.current.style.left = `${BoxPosition.current.x}%`;
                ImageBox.current.style.top = `${BoxPosition.current.y}px`;
            }            
            requestAnimationFrame(updatePosition);
        }

        updatePosition();

    },[])
  

    const wrapperContext = useContext(scrollerWrapperContext);
    if (!wrapperContext) return null;
    const {ScrollerRef} = wrapperContext;

    return (
    <HoverMenu ref={MenuRef}>
        <div className="img-box" ref={ImageBox}>
            <div className='img-container' ref={ImageBoxContainer}></div>
        </div>
        <MenuItem 
            text='Art Direction' 
            index='01' 
            imgUrl='/images/imgBox/imgBox1.jpg' 
            ImageBoxContainer={ImageBoxContainer}
        />
        <MenuItem 
            text='brand indentity' 
            index='02' 
            imgUrl='/images/imgBox/imgBox2.jpg' 
            ImageBoxContainer={ImageBoxContainer}
        />
        <MenuItem 
            text='visual content' 
            index='03' 
            imgUrl='/images/imgBox/imgbox3.jpg' 
            ImageBoxContainer={ImageBoxContainer}
        />
        <MenuItem 
            text='digital developement' 
            index='04' 
            imgUrl='/images/imgBox/imgBox4.jpg' 
            ImageBoxContainer={ImageBoxContainer}
        />
    </HoverMenu>
  )
}

function MenuItem({text,index,imgUrl,ImageBoxContainer}:{text:string,index:string,imgUrl:string,ImageBoxContainer:React.RefObject<HTMLDivElement>}) 
{
    
    const MenuItem = styled.div`
        position: relative;
        z-index: 1;
        cursor: default;
        &:hover
        {
            .menuItemContent
            {
                color: rgba(28, 29, 32, 0.3);
            }    
        }
        .menuItemContent
        {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(28, 29, 32, 0.3);
            padding: 2vw 0;
            h1{
                font-size: clamp(3vmax,5vw,5vmax);
                font-weight: 400;
                text-transform: uppercase;
            }
            p{
                font-family: 'Serif4';
                font-size: 3vmax;
            }
        }
    `;

    const ItemRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        ItemRef.current?.addEventListener('mouseenter',()=>{
            if (!ImageBoxContainer.current) return;
            
            ImageBoxContainer.current.style.backgroundImage = `url(${imgUrl})`;
        
        })
    },[])
    
    return <MenuItem ref={ItemRef}>
        <div className="menuItemContent">
            <h1>{text}</h1>
            <p>{index}</p>
        </div>
    </MenuItem>
}

function lerp(start:number, end:number, amt:number)
{
    return (1-amt)*start+amt*end
  }