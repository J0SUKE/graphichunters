import React, { RefObject, useEffect, useRef } from 'react'
import {BoxProps} from '../types/BoxProps';
import styled from 'styled-components';

export default function ScrollWrapper(props:BoxProps) {

  const wrapperRef = useRef<HTMLDivElement>(null);

  const Wrapper = styled.div`
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
  `
  
  useEffect(()=>{
    const body = document.body,
    scrollWrap = wrapperRef.current,
    height = scrollWrap && scrollWrap?.getBoundingClientRect().height - 1,
    speed = 0.07;
    
    let offset = 0;

    body.style.height = `${Math.floor(height as number)}px`;

    
    function smoothscroll() {
      offset+=(window.pageYOffset - offset) * speed;
      let scroll = `translateY(-${offset}px) translateZ(0)`;
      if (scrollWrap!=undefined) scrollWrap.style.transform = scroll;

      requestAnimationFrame(smoothscroll);  
    }

    smoothscroll();

  },[])

  return (
    <Wrapper ref={wrapperRef}>
        {props.children}
    </Wrapper>
  )
}
