import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { cursorContext } from '../context/CursorContext'
import useCursorInteraction from '../hooks/useCursorInteraction'
import NavLink from './NavLink'
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import {layoutRefsContext} from '../context/LayoutRefsContext'
import {menuContext} from '../context/MenuContext'
import { useRouter } from 'next/router'


export default function Header({logoRef,NavLinksRef}:{logoRef:React.RefObject<HTMLDivElement>,NavLinksRef:React.RefObject<HTMLElement>}) {
    
    const Logo = styled.div`
        width: 6vmax;
        min-width: 80px;
        min-height: 80px;
        height: 6vmax;
        position: fixed;
        display: block;
        z-index: 99;
        top: 2vw;
        left: 3vw;
        background: transparent;
        svg{
        }
        svg,path{
            width: 100%;
            height: 100%;
        }
        a{
            display: block;
        }
    `

    const HeaderLinks = styled.nav`
        position: fixed;   
        z-index: 99;
        top: 2vw;
        right: 10vw;
        padding-right: 2rem;
        a{
            display: block;            
        }

        @media screen and (max-width:1024px)
        {
            display: none;
        }
    `    

    return (
    <> 
        <HeaderLogo logoRef={logoRef}/>        
        <HeaderLinks ref={NavLinksRef}>
            <NavLink link='work' value='work'/>
            <NavLink link='studio' value='studio'/>
            <NavLink link='archive' value='archive'/>
            <NavLink link='jobs' value='jobs'/>
            <NavLink link='contact' value='contact'/>
        </HeaderLinks>             
        <MenuButton/>
    </>
  )
}

function MenuButton() {
    const MenuButtonStyled = styled.div`
        display: none;
        position: fixed;   
        z-index: 99;
        top: 5vw;
        right: 4vw;
        height: 1.4rem;
        overflow: hidden;
        cursor: pointer;    

        outline-style: none;

        div{
            display: flex;
            align-items: center;
            gap: .7rem;
            transition: transform .3s;

            &:last-of-type p {
                font-family: 'Serif4';
            }

            span{
                display: block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: black;
            }
            p{
                font-size: 1.4rem;
                text-transform: uppercase;
                color: white;

            }
            &:first-of-type span
            {
                background: #9BFA00;
            }
            &:last-of-type span
            {
                background: #747373;
            }            


        }

        div:last-of-type
        {
            transform: rotate(10deg);
        }
        &.active
        {
            div:first-of-type
            {
                transform: translateY(-100%) rotate(-10deg);
            }
            div:last-of-type
            {
                transform: translateY(-100%) rotate(0deg);
            }
        }        

        @media screen and (max-width:1024px)
        {
            display: unset;
        }

    `

    const LayoutrefsContext = useContext(layoutRefsContext);    

    const MENUCONTEXT = useContext(menuContext);
    if (!MENUCONTEXT) return null;
    var {openMenu,closeMenu,menuIsOpen} = MENUCONTEXT;

    if (!LayoutrefsContext) return null;
    const {MenuButtonRef} = LayoutrefsContext;

    return <MenuButtonStyled 
            ref={MenuButtonRef}
            onClick={()=>{                
                if (!menuIsOpen.current) openMenu(MenuButtonRef);
                else closeMenu(MenuButtonRef);
            }}
    >
        <div>
            <span></span>
            <p>Menu</p>
        </div>
        <div>
            <span></span>
            <p>close</p>
        </div>
    </MenuButtonStyled>
}

function HeaderLogo({logoRef}:{logoRef:React.RefObject<HTMLDivElement>}) {
    const router = useRouter();

    const Logo = styled.div`
        width: 6vmax;
        min-width: 80px;
        min-height: 80px;
        height: 6vmax;
        position: fixed;
        display: block;
        z-index: 99;
        top: 2vw;
        left: 3vw;
        cursor: pointer;
        background: transparent;
        svg{
        }
        svg,path{
            width: 100%;
            height: 100%;
        }
    `

    return <Logo ref={logoRef}>
        {
            router.asPath === '/' ?
            <svg onClick={()=>{router.reload();}} height="820" viewBox="0 0 1066 820" width="1066" xmlns="http://www.w3.org/2000/svg"><path d="m532.999 546.66h-266.499v-273.32h532.196l266.504-273.34h-598.835l-466.365 478.335v341.665h333.115l399.749-409.99v409.99h266.481v-478.335h-266.481z" fill="#ffffff"></path></svg>
            :
            <Link href={'/'} passHref>
                <a>
                    <svg height="820" viewBox="0 0 1066 820" width="1066" xmlns="http://www.w3.org/2000/svg"><path d="m532.999 546.66h-266.499v-273.32h532.196l266.504-273.34h-598.835l-466.365 478.335v341.665h333.115l399.749-409.99v409.99h266.481v-478.335h-266.481z" fill="#ffffff"></path></svg>
                </a>                
            </Link>
        }
    </Logo>

}