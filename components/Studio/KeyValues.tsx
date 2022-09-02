import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import gsap from 'gsap';

export default function KeyValues() {
  
    const KeyValues = styled.div`
        border-top: 1px solid #a9a9a956;
        color: white;
        .title{
            padding: 8vmax 0;
            font-size: 8vmax;            
            width: calc(100% - 4rem);
            margin: auto;
            text-transform: uppercase;
            p{
                height: 8vmax;
                line-height: 8vmax;
                white-space: nowrap;
            }
            p:first-of-type{
                font-family: 'Serif4';
                font-size: 9vmax;                       
            }
        }
        .values
        {
            width: calc(100% - 4rem);
            margin: auto;
        }
    `
    
    const westandforRef = useRef<HTMLParagraphElement>(null);
    const keyValuesRef = useRef<HTMLDivElement>(null);
        
    useEffect(()=>{
        gsap.fromTo(westandforRef.current,
            {
                x:'10%',
            },
            {
            scrollTrigger:{
              trigger:keyValuesRef.current,
              scroller: "#scroll-wrapper",
              start:'top bottom',
              scrub:1,
            },
            x:'20%',
            duration:1
          })
    },[])

    return (
    <KeyValues ref={keyValuesRef}>
        <div className="title">
            <p>key values</p>
            <p ref={westandforRef}>we stand for</p>
        </div>
        <div className='values'>
            <KeyItem number='01' title='ALWAYS ON' desc={'Always hunting for next level visual content that challenges status quo.'}/>
            <KeyItem number='02' title='PREMIUM' desc={'We pride our ability to understand and deliver high quality production.'}/>
            <KeyItem number='03' title='HYPERFOCUS' desc={'We’ve become masters at our craft by focusing exclusively on sports.'}/>
        </div>        
    </KeyValues>
  )
}

function KeyItem({number,title,desc}:{number:string,title:string,desc:string}) {
    
    const KeyItem = styled.div`
        display: flex;
        gap: 6vmax;
        padding: 3vmax 0;
        display: flex;
        border-top: 1px solid #a9a9a956;
        &:last-of-type{
            border-bottom: 1px solid #a9a9a956;
        }
        div{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            h3{
                font-size: 4vmax;
                font-weight: 500;
                text-transform: uppercase;
            }
            @media screen and (max-width:950px)
            {
                flex-direction: column;
                align-items: flex-start;
            }
        }
        span{
            display: block;
            padding-right: 2rem;
        }
        p{
            font-size: 2.8vmax;
            font-family: 'Serif4';
        }

    `

    return <KeyItem>
        <p>{number}</p>
        <div>
            <h3>{title}</h3>
            <span>{desc}</span>
        </div>        
    </KeyItem>
}