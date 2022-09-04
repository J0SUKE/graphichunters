import React,{useEffect,useContext} from 'react'
import styled from 'styled-components'
import { layoutRefsContext } from '../../context/LayoutRefsContext';

export default function Contact() {
    const Contact = styled.div`
        position: relative;
        z-index: 4;
        background: white;
        height: 200vh;
    `

    useEffect(()=>{
      LogoRef.current.style.mixBlendMode = 'difference';
      NavLinksRef.current.style.mixBlendMode = 'difference';  
    },[])
    
    const LayoutrefsContext = useContext(layoutRefsContext);
    if (!LayoutrefsContext) return null;
    const {LogoRef,NavLinksRef} = LayoutrefsContext;

    return (
    <Contact>
        
    </Contact>
  )
}
