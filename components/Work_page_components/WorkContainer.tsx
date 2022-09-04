import { log } from 'console'
import React,{useEffect,useContext} from 'react'
import styled from 'styled-components'
import { layoutRefsContext } from '../../context/LayoutRefsContext';
import DataInterface from '../../types/DataInterface'
import Hero from './Hero';

export default function WorkContainer({data}:{data:DataInterface}) {
  
    const WorkContainer = styled.div`
        position: relative;
        background: #EEEEEE;
        z-index: 4;
        height: 200vh;
    `

    console.log(data);
    
    useEffect(()=>{

        LogoRef.current.style.mixBlendMode = 'difference';
        NavLinksRef.current.style.mixBlendMode = 'difference';  
        (MenuButtonRef.current as HTMLDivElement).classList.add('dark');
                
      },[])
  
  
    const LayoutrefsContext = useContext(layoutRefsContext);

    if (!LayoutrefsContext) return null;
    const {LogoRef,NavLinksRef,MenuButtonRef} = LayoutrefsContext;

    return (
    <WorkContainer>
        <Hero herotitle={data.heroTitle} intro={data.intro} services={data.services} credits={data.credits}/>
    </WorkContainer>
  )
}
