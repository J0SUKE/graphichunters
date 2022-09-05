import { log } from 'console'
import React,{useEffect,useContext,useRef} from 'react'
import styled from 'styled-components'
import { layoutRefsContext } from '../../context/LayoutRefsContext';
import DataInterface from '../../types/DataInterface'
import MoreWork from './MoreWork';
import Hero from './Hero';
import useCursorInteraction from '../../hooks/useCursorInteraction';
import ImagesGrid from './ImagesGrid';
import ParallaxImagesGrid from './ParallaxImagesGrid';
import VideosGrid from './VideosGrid';
import BigSingleImage from './ImagesComponents';
import WorkTemplates from '../WorkTemplates';
import ParallaxSection from './ParallaxSection';




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
    const {LogoRef,NavLinksRef,MenuButtonRef} = LayoutrefsContext;

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
