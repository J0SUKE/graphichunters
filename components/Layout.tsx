import React from 'react'
import RightRibbon from './RightRibbon'
import styled from 'styled-components'
import Image from 'next/image'
import ScrollWrapper from './ScrollWrapper'

export default function Layout() {
  
  const Content = styled.div`
    position: absolute;
    width: 92vw;
    left: 0;
    overflow: hidden;
  `
  
  const Img = styled.div`
    width: 100%;
    position: relative;
    height: 100vh;
  ` 
  
  return (
    <>
      <Content>
        <Img>
          <Image
            src={'/images/shoe.jpg'}
            alt=''
            layout='fill'
          />
        </Img>
        <Img>
          <Image
            src={'/images/porsche.jpg'}
            alt=''
            layout='fill'
          />
        </Img>
        <Img>
          <Image
            src={'/images/otw.jpg'}
            alt=''
            layout='fill'
          />
        </Img>
        <Img>
          <Image
            src={'/images/mural.jpg'}
            alt=''
            layout='fill'
          />
        </Img>
      </Content>
      <RightRibbon/>
    </>
  )
}
