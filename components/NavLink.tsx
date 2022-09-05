import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { cursorContext } from "../context/CursorContext";
import useCursorInteraction from "../hooks/useCursorInteraction";
import Link from "next/link";
import { useRouter } from "next/router";
import { log } from "console";

export default function NavLink({link,value}:{link:string,value:string}) {
    
    
    const router = useRouter();
    const [isLink,setIsLink] = useState<boolean | null>(null);

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
                transform: translateY(-100%);
                color: #9BFA00;
            }
            a:first-of-type
            {
                transform: translateY(-100%);
            }
        }
        a{
            display: block;
            transition: transform .5s cubic-bezier( 0.52, 0.26, 0.05, 0.9 ) ;
        }     
    `
    const CurrentLink = styled.div`
        p{
            font-family: 'Serif4-light';
            font-weight: 400;
            color: white;
            font-size: 1.4rem;
            height: 1.5rem;
            text-transform: uppercase;
            cursor: pointer;
        }
    `

    useEffect(()=>{

        if (router.asPath === `/${link}`) setIsLink(false)
        else setIsLink(true);
        
    },[]);

    const NavLinkRef = useCursorInteraction('onLink') as React.RefObject<HTMLDivElement>;    
    const CurrentLinkRef = useCursorInteraction('onLink') as React.RefObject<HTMLDivElement>;    

    return <>
            {
                isLink==true ?
                <AnimatedLink ref={NavLinkRef}>
                    <Link href={`/${link}`} passHref><a>{value}</a></Link>
                    <Link href={`/${link}`} passHref><a>{value}</a></Link>
                </AnimatedLink>
                :
                isLink==false ?
                <CurrentLink 
                    onClick={()=>{
                        router.reload();
                    }}
                    ref={CurrentLinkRef}
                >
                    <p>{value}</p>
                </CurrentLink>
                :
                null

            }
        </>
}