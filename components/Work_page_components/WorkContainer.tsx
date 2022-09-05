import { log } from 'console'
import React,{useEffect,useContext,useRef} from 'react'
import styled from 'styled-components'
import { layoutRefsContext } from '../../context/LayoutRefsContext';
import DataInterface from '../../types/DataInterface'
import MoreWork from './MoreWork';
import Hero from './Hero';
import useShadowHeader from '../../hooks/useShadowHeader';
import useCursorInteraction from '../../hooks/useCursorInteraction';
import { throttle } from 'lodash';
import WorkTemplates from '../WorkTemplates';




export default function WorkContainer({data}:{data:DataInterface}) {
  
    const WorkContainer = styled.div`
        position: relative;
        background: #EEEEEE;
        z-index: 4;
    `    
    useEffect(()=>{

        LogoRef.current.style.mixBlendMode = 'difference';
        NavLinksRef.current.style.mixBlendMode = 'difference';  
        (MenuButtonRef.current as HTMLDivElement).classList.add('dark');                      
      },[])
  
  

    const LayoutrefsContext = useContext(layoutRefsContext);
    const WorkContainerRef = useCursorInteraction('blend') as React.RefObject<HTMLDivElement>;    

    if (!LayoutrefsContext) return null;
    const {LogoRef,NavLinksRef,MenuButtonRef,ScrollerRef} = LayoutrefsContext;

    return (
    <WorkContainer ref={WorkContainerRef}>
        <Hero 
          herotitle={data.heroTitle} 
          intro={data.intro} 
          services={data.services} 
          credits={data.credits}
          heroImage={data.heroImage}
          heroLogo={data.heroLogo}
        />
        <WorkTemplates template={data.template} data={data}/>
        <MoreWork works={data.moreWork}/>

    </WorkContainer>
  )
}
