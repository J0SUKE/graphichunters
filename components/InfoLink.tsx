import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { cursorContext } from "../context/CursorContext";
import Link from "next/link";
import useCursorInteraction from "../hooks/useCursorInteraction";


export default function InfoLink({value,link,external,black}:{value:string,link:string,external?:boolean,black?:boolean}) {
    
    const InfoLink = styled.div`
        text-transform: uppercase;
        padding-bottom: .3rem;
        box-sizing: content-box;
        border-bottom: 1px solid white;
        display: inline-block;
        transition: border-bottom .5s;
        font-size: 1.3rem;
        height: 1.3rem;
        overflow-y: hidden;
        margin: .5rem 0;
        cursor: pointer;
        mix-blend-mode:${black ? 'difference' : 'unset' };
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
            color: white;
            display: block;
            transition: transform .6s cubic-bezier( 0.52, 0.26, 0.05, 0.9 ) ;
        }
    `;
    
    const InfoLinkRef = useCursorInteraction('onLink') as React.RefObject<HTMLDivElement>;            

    return <InfoLink ref={InfoLinkRef}>
        {
            external ?
            <>
                 <a href={`${link}`} target={'_blank'} rel="noreferrer">{value}</a>
                 <a href={`${link}`} target={'_blank'} rel="noreferrer">{value}</a>
            </>
            :
            <>
                <Link href={`${link}`}><a>{value}</a></Link>
                <Link href={`${link}`}><a>{value}</a></Link>
            </>
        }
    </InfoLink>
}