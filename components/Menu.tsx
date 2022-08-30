import React, { useContext } from 'react'
import styled from 'styled-components'
import {menuContext} from '../context/MenuContext';
import Link from 'next/link';

export default function Menu() {
  
    const Menu = styled.div`
        position: fixed;
        display: none;
        z-index: 98;
        inset: 0;
        background: black;
        box-shadow: -20vmin 0px 100vmin 70vmin black;        
    `

    const MenuLinks = styled.div`
        position: fixed;
        z-index: -1;
        inset: 0;
        color: white;
        display: flex;
        gap: clamp(.5rem,2vmax,1rem);
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        padding-bottom: clamp(3rem,7vmax,4rem);
        padding-right: 4vw;
    `
    
    const menucontext = useContext(menuContext);
    if (!menucontext) return null;
    const {MenuRef,MenuLinksRef} = menucontext;

    return <>
        <Menu ref={MenuRef}/>
        <MenuLinks ref={MenuLinksRef}>
            <MenuLink url='/' text='home'/>
            <MenuLink url='/work' text='work'/>
            <MenuLink url='/studio' text='studio'/>
            <MenuLink url='/archive' text='archive'/>
            <MenuLink url='/jobs' text='jobs'/>
            <MenuLink url='/contact' text='contact'/>
        </MenuLinks>
    </>
}

function MenuLink({url,text}:{text:string,url:string}) 
{
    const MenuLink = styled.div`
        font-size:clamp(3rem,10vmax,4rem) ;
        color: white;        
        overflow: hidden;        
        height:${text=='home' ? 'clamp(3.2rem,10.2vmax,4.2rem)' : 'clamp(3rem,10vmax,4rem)'} ;
        p{
            height:100%;
            overflow: hidden;        
            a:last-of-type{
                font-family: 'Serif4';
                color: #9BFA00;
                transform: rotate(-5deg);
            }
            a{
                transition: transform .3s;
            }
            ${text!='home' && `
                &:hover
                {
                    a:first-of-type
                    {
                        transform: translateY(-100%) rotate(-5deg);
                    }   
                    a:last-of-type
                    {
                        transform: translateY(-100%) rotate(0deg);
                    }   
                }
            `}            
        }
        a{
            display: block;
            text-transform: uppercase;
            font-family: ${text=='home' ? 'Serif4':'Roboto'};
            color: ${text=='home' ? '#747373' : 'white'};
        }
    `
    
    return <MenuLink>
        <p>
            <Link href={`/${url}`}><a>{text}</a></Link>
            <Link href={`/${url}`}><a>{text}</a></Link>
        </p>        
    </MenuLink>
}