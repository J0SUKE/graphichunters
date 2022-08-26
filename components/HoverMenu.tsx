
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image';
import { throttle } from 'lodash';

export default function HoverMenu() {
    
    const MenuRef = useRef<HTMLDivElement>(null)
    const ImageBox = useRef<HTMLDivElement>(null);
    const ImageBoxContainer = useRef<HTMLDivElement>(null);

    const BoxPosition = useRef({x:0,y:0});


    const HoverMenu = styled.div`
        width:calc(100% - 4rem);    
        margin: auto;
        border-bottom: 1px solid rgba(28, 29, 32, 0.3);
        position: relative;
        .img-box
        {
            position: absolute;
            top: 0;
            left: 45%;
            z-index: 2;
            width: 27%;
            aspect-ratio: 1/1;
            transform-origin: center center;
            transform: scaleY(0);
            transition: transform .7s;
            pointer-events: none;

            &.active
            {
                transform: scaleY(1);
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
            
            if(!ImageBox.current) return;
            
            ImageBox.current.classList.add('active');
        })
        
        MenuRef.current.addEventListener('mouseleave',()=>{
            
            if(!ImageBox.current) return;
            
            ImageBox.current.classList.remove('active');
        })

        MenuRef.current.addEventListener('mousemove',throttle((e)=>{
            const width = MenuRef.current?.getBoundingClientRect().width;
            if (!ImageBox.current || !width || !ImageBox.current) return ;
            
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

            BoxPosition.current.x = lerp(BoxPosition.current.x,offsetX,0.3);
            BoxPosition.current.y = lerp(BoxPosition.current.y,offsetY-Boxheight/2,0.3);
            
            ImageBox.current.style.left = `${BoxPosition.current.x}px`;
            ImageBox.current.style.top = `${BoxPosition.current.y}px`;
            
        },10))

    },[])
  
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
            imgUrl='/images/imgBox/imgBox3.jpg' 
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
            border-top: 1px solid rgba(28, 29, 32, 0.3);
            padding: 2vw 0;
            h1{
                font-size: 5vmax;
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