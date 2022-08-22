import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

export default function Header() {
    
    const Logo = styled.a`
        width: 6vw;
        height: 6vw;
        position: fixed;
        z-index: 3;
        top: 2vw;
        left: 3vw;
        background: transparent;
        svg{
            mix-blend-mode: difference;
        }
        svg,path{
            width: 100%;
            height: 100%;
        }
    `

    return (
    <>
        <Link href={'/'}>
            <Logo>
                <svg height="820" viewBox="0 0 1066 820" width="1066" xmlns="http://www.w3.org/2000/svg"><path d="m532.999 546.66h-266.499v-273.32h532.196l266.504-273.34h-598.835l-466.365 478.335v341.665h333.115l399.749-409.99v409.99h266.481v-478.335h-266.481z" fill="#ffffff"></path></svg>
            </Logo>
        </Link>
    </>
  )
}
