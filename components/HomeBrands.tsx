import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { NavLink } from './Header'

export default function HomeBrands() {
  
    const HomeBrands = styled.div`
        position: relative;
        z-index: 3;
        width: calc(100% - 4rem);
        margin: auto;


        .works
        {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 9vw 0 5vw 0;

            h2
            {
                color: white;
                width: 45%;
                font-size: 4vmin;
            }
        }
        .our-works
        {
            text-transform: uppercase;
            padding-bottom: .3rem;
            box-sizing: content-box;
            border-bottom: 1px solid white;
            display: inline-block;
            transition: border-bottom .5s;
            color: white;
            font-size: 1.3rem;
            height: 1.3rem;
            overflow-y: hidden;
            margin: .5rem 0;
            cursor: pointer;
            &:hover
            {
                border-bottom: 1px solid #9BFA00;
                a:last-of-type
                {
                    transform: translateY(-120%);
                    color: #9BFA00;
                }
                a:first-of-type
                {
                    transform: translateY(-100%);
                }
            }
            a{
                display: block;
                transition: transform .6s cubic-bezier( 0.52, 0.26, 0.05, 0.9 ) ;
            }      
        }
    `
  
    return (
    <HomeBrands>
        <div className='works'>
            <h2>WE CREATE FOR THE BIGGEST BRANDS IN THE WORLD OF SPORTS.</h2>
            <div className='our-works'>
                <Link href={`/work`}><a>more work (6)</a></Link>
                <Link href={`/work`}><a>more work (6)</a></Link>
            </div>
        </div>
    </HomeBrands>
  )
}
