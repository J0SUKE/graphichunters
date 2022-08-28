import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { cursorContext } from "../context/CursorContext";
import useCursorInteraction from "../hooks/useCursorInteraction";
import Link from "next/link";

export default function NavLink({link,value}:{link:string,value:string}) {
    
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
    
    const NavLinkRef = useCursorInteraction('onLink') as React.RefObject<HTMLDivElement>;    

    return <AnimatedLink ref={NavLinkRef}>
            <Link href={`/${link}`}><a>{value}</a></Link>
            <Link href={`/${link}`}><a>{value}</a></Link>
        </AnimatedLink>
}