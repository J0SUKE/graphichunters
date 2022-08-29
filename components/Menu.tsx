import React, { useContext } from 'react'
import styled from 'styled-components'
import {menuContext} from '../context/MenuContext';

export default function Menu() {
  
    const Menu = styled.div`
        position: fixed;
        z-index: 98;
        inset: 0;
        background: black;
    `
    
    const menucontext = useContext(menuContext);
    if (!menucontext) return null;
    const {menuIsOpen} = menucontext;

    return <>
        {
            menuIsOpen && <Menu/>
        }
    </>
}
