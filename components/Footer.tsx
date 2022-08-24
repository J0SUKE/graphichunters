import React, { RefObject } from 'react'
import styled from 'styled-components'


export default function Footer({FooterRef}:{FooterRef:RefObject<HTMLElement>}) {
    
    const FooterStyled = styled.footer`
        position: relative;
        z-index: 3;
        background: black;
        color: white;
    `
  
    return (
    <FooterStyled ref={FooterRef}></FooterStyled>
  )
}
