import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

export default function Header({logoRef,NavLinksRef}:{logoRef:React.RefObject<HTMLAnchorElement>,NavLinksRef:React.RefObject<HTMLElement>}) {
    
    const Logo = styled.a`
        width: 6vw;
        height: 6vw;
        position: fixed;
        display: block;
        z-index: 99;
        top: 2vw;
        left: 3vw;
        background: transparent;
        svg{
            mix-blend-mode: difference;
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

    return (
    <>
        <Link href={'/'}>
            <Logo ref={logoRef}>
                <svg height="820" viewBox="0 0 1066 820" width="1066" xmlns="http://www.w3.org/2000/svg"><path d="m532.999 546.66h-266.499v-273.32h532.196l266.504-273.34h-598.835l-466.365 478.335v341.665h333.115l399.749-409.99v409.99h266.481v-478.335h-266.481z" fill="#ffffff"></path></svg>
            </Logo>
        </Link>
        <HeaderLinks ref={NavLinksRef}>
            <NavLink link='work'/>
            <NavLink link='studio'/>
            <NavLink link='archive'/>
            <NavLink link='jobs'/>
            <NavLink link='contact'/>
        </HeaderLinks>
    </>
  )
}


function NavLink({link}:{link:string}) {
    
    const AnimatedLink = styled.div`
        display: block;
        text-transform: uppercase;
        color: white;
        font-size: 1.3rem;
        height: 1.3rem;
        overflow-y: hidden;
        margin: .5rem 0;
        cursor: pointer;
        &:hover
        {
            a:last-of-type
            {
                transform: translateY(-120%);
                color: #9BFA00;
            }
            a:first-of-type
            {
                transform: translateY(-100%);
            }
        }
        a{
            display: block;
            transition: transform .6s cubic-bezier( 0.52, 0.26, 0.05, 0.9 ) ;
        }      
    `
    
    return <AnimatedLink>
            <Link href={`/${link}`}><a>{link}</a></Link>
            <Link href={`/${link}`}><a>{link}</a></Link>
        </AnimatedLink>
}