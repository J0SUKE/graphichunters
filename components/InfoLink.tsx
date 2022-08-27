import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { cursorContext } from "../context/CursorContext";
import Link from "next/link";


export default function InfoLink({value,link}:{value:string,link:string}) {
    
    const InfoLink = styled.div`
        text-transform: uppercase;
        padding-bottom: .3rem;
        box-sizing: content-box;
        border-bottom: 1px solid white;
        display: inline-block;
        transition: border-bottom .5s;
        color: white;
        font-size: 1.3rem;
        height: 1.3rem;
        overflow-y: hidden;
        margin: .5rem 0;
        cursor: pointer;
        &:hover
        {
            border-bottom: 1px solid #9BFA00;
            a:last-of-type
            {
                transform: translateY(-100%);
                color: #9BFA00;
            }
            a:first-of-type
            {
                transform: translateY(-120%);
            }
        }
        a{
            display: block;
            transition: transform .6s cubic-bezier( 0.52, 0.26, 0.05, 0.9 ) ;
        }      
    `;
    
    const InfoLinkRef = useRef<HTMLDivElement>(null);
    
    const CURSORCONTEXT = useContext(cursorContext);

    useEffect(()=>{
        InfoLinkRef.current?.addEventListener('mouseenter',()=>{
            if (!CURSORCONTEXT?.CursorRef?.current) return;
            
            CURSORCONTEXT.CursorRef.current.classList.add('onLink');
            //CURSORCONTEXT.CursorRef.current.classList.remove('onScroll');
        })
        InfoLinkRef.current?.addEventListener('mouseleave',()=>{
            if (!CURSORCONTEXT?.CursorRef?.current) return;
            
            CURSORCONTEXT.CursorRef.current.classList.remove('onLink');
        })
    },[])

    return <InfoLink ref={InfoLinkRef}>
        <Link href={`${link}`}><a>{value}</a></Link>
        <Link href={`${link}`}><a>{value}</a></Link>
    </InfoLink>
}