import React, { useEffect, useRef, useState } from 'react'
import RightRibbon from './RightRibbon'
import styled from 'styled-components'
import Hero from './Hero'
import Header from './Header'
import SlideShowContext from '../context/SlideShowContext'

export default function Layout() {

    

  return (
    <SlideShowContext>
      <Header/>
      <Content>
        <Hero/>        
      </Content>
      <RightRibbon/>
    </SlideShowContext>
  )
}

var Content = styled.div`
    position: absolute;
    width: 92vw;
    top: 0;
    left: 0;
  `