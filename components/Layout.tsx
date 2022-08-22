import React, { useEffect, useRef, useState } from 'react'
import RightRibbon from './RightRibbon'
import styled from 'styled-components'
import Hero from './Hero'
import Header from './Header'

export default function Layout() {

  const sliderImages = 
  [
    '/images/shoe.jpg',
    '/images/mural.jpg',
    '/images/porsche.jpg',
    '/images/fnatic.jpg',
    '/images/otw.jpg'
  ];

  const [index,setIndex] = useState(0);

    useEffect(()=>{
      const interval = setInterval(()=>{        
        setIndex(index=>{
          if (index==sliderImages.length-1) return 0;
          else return index+1;
        });         
      },5000)

      return ()=>{
        clearInterval(interval)
      };
    },[]);

  return (
    <>
      <Header/>
      <Content>
        <Hero index={index}/>        
      </Content>
      <RightRibbon/>

    </>
  )
}

var Content = styled.div`
    position: absolute;
    width: 92vw;
    left: 0;
    overflow: hidden; 
  `