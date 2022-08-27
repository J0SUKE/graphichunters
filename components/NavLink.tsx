import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { cursorContext } from "../context/CursorContext";
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
    
    const NavLinkRef = useRef<HTMLDivElement>(null);
    const CURSORCONTEXT = useContext(cursorContext);

    useEffect(()=>{
        NavLinkRef.current?.addEventListener('mouseenter',()=>{
            if (!CURSORCONTEXT?.CursorRef?.current) return;
            
            CURSORCONTEXT.CursorRef.current.classList.add('onLink');
        })
        NavLinkRef.current?.addEventListener('mouseleave',()=>{
            if (!CURSORCONTEXT?.CursorRef?.current) return;
            
            CURSORCONTEXT.CursorRef.current.classList.remove('onLink');
        })
    },[])

    return <AnimatedLink ref={NavLinkRef}>
            <Link href={`/${link}`}><a>{value}</a></Link>
            <Link href={`/${link}`}><a>{value}</a></Link>
        </AnimatedLink>
}