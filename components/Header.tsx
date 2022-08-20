import React from 'react'
import styled from 'styled-components'

export default function Header() {
    
    const Header = styled.header`
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
    `

    return (
    <Header>
        <h1>Graphic Hunters</h1>
    </Header>
  )
}
