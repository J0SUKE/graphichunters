import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { cursorContext } from '../context/CursorContext'
import useCursorInteraction from '../hooks/useCursorInteraction'
import NavLink from './NavLink'
import {menuContext} from '../context/MenuContext'


export default function Header({logoRef,NavLinksRef}:{logoRef:React.RefObject<HTMLAnchorElement>,NavLinksRef:React.RefObject<HTMLElement>}) {
    
    const Logo = styled.a`
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
            right: 2vw;
        }
    `
    

    const [mobile,setMobile] = useState(false);

    useEffect(()=>{
        if (window.innerWidth<=1024) setMobile(true);
        else setMobile(false);

        window.addEventListener('resize',()=>{
            if (window.innerWidth<=1024) setMobile(true);
            else setMobile(false);
        })

    },[])

    return (
    <> 
        <Link href={'/'}>
            <Logo ref={logoRef}>
                <svg height="820" viewBox="0 0 1066 820" width="1066" xmlns="http://www.w3.org/2000/svg"><path d="m532.999 546.66h-266.499v-273.32h532.196l266.504-273.34h-598.835l-466.365 478.335v341.665h333.115l399.749-409.99v409.99h266.481v-478.335h-266.481z" fill="#ffffff"></path></svg>
            </Logo>
        </Link>
        {
            mobile ?
            <MenuButton/>
            :
            <HeaderLinks ref={NavLinksRef}>
                <NavLink link='work' value='work'/>
                <NavLink link='studio' value='studio'/>
                <NavLink link='archive' value='archive'/>
                <NavLink link='jobs' value='jobs'/>
                <NavLink link='contact' value='contact'/>
            </HeaderLinks>        
        }        
    </>
  )
}

function MenuButton() {
    const MenuButtonStyled = styled.div`
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
    `

    const MenuButtonRef = useCursorInteraction('onLink') as React.RefObject<HTMLDivElement>;

    const MENUCONTEXT = useContext(menuContext);
    if (!MENUCONTEXT) return null;
    var {openMenu,closeMenu,menuIsOpen} = MENUCONTEXT;

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