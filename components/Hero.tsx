import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image';
import {slideShowContext} from '../context/SlideShowContext';
import Link from 'next/link';
import { throttle } from 'lodash';

export default function Hero() 
{
  
  const LayerRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    window.addEventListener('scroll',throttle(()=>{
      const {scrollTop,clientHeight} = document.documentElement;

      let ratio = scrollTop/clientHeight;
      if (LayerRef.current) {
        LayerRef.current.style.opacity = `${ratio*1.5}`;  
      }      

    },10))
  },[])

  const HeroStyled = styled.div`
  background: black;
  position: relative;
`
  const HeroContent = styled.div`
    position: relative;
    background: transparent;
    color: white;
    top: 0;
    z-index: 3;
    
    .home
    {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
    .bottom
    {
      display: flex;
      justify-content: space-between;
      padding: 2rem 2.5rem;
      text-transform: uppercase;
      font-size: .9rem;
      p{
        transform: translateY(3rem);
        animation: animateP .7s forwards;
      }
      @keyframes animateP {
        from{
          transform: translateY(3rem);
        }to{
          transform: translateY(0);
        }
      }
    }
    .title{
      font-size: 10vw;
      line-height: 9vw;
      font-weight: 400;
      padding: 0 2rem;
      text-transform: uppercase;
      div{
        overflow: hidden;
      }
      p{
        transform: translateY(50%) rotate(4deg);
        animation: animateTitle .8s forwards;
      }

      @keyframes animateTitle {
        from{
          transform: translateY(100%) rotate(4deg);
        }to{
          transform: translateY(0%) rotate(0deg);
        }
      }
    }

    .presentation
    {
      margin: 3rem auto 0 auto;
      width: calc(100% - 4rem);
      border-top: 1px solid #a9a9a956;
      border-bottom: 1px solid #a9a9a956;
      padding: 8vw 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h4{
        width: 40%;
        font-size: 2vw;
      }
      a{
        font-size: 1.4rem;
        text-decoration: underline;
        text-transform: uppercase;
      }
    }

  `

  const Layer = styled.div`
    position: fixed;
    width: 92vw;
    z-index: 2;
    height: 100%;
    background: black;
    opacity: 0;
    inset: 0;
  `

  return (
    <HeroStyled>
        <SlideShow/>
        <Layer ref={LayerRef}/>
        <HeroContent>
          <div className='home'>
            <div className='title'>
              <div><p>24/7</p></div>
              <div><p>hunting</p></div>
              <div><p>the next</p></div>
            </div>
            <div className='bottom'>
              <Timer/>
              <p>The creative studio focused on sports</p>
              <p>based in the netherlands</p>
            </div>
          </div>
          <div className='presentation'>
            <h4>GRAPHICHUNTERS DEVELOPS DISTINCTIVE BRAND AND CAMPAIGN STYLES, DELIVERING NEXT LEVEL VISUAL CONTENT.</h4>
            <Link href={'/studio'}>
              <a>
                about us
              </a>
            </Link>
          </div>
        </HeroContent>
    </HeroStyled>
  )
}


function SlideShow() {        
    
    const slideshowContext = useContext(slideShowContext);
    if (!slideshowContext) return null;
    
    const SlideShowStyle = styled.div`
      position: fixed;
      width: 92vw;
      height: 100%;
      z-index: 1;
      inset: 0;
    `
    return <SlideShowStyle>
      <SlideImage url={slideshowContext.sliderImages[slideshowContext.index]}/>
    </SlideShowStyle>
}


function SlideImage({url}:{url:string}) {
    
    var Slide = styled.div`
      height: 100vh;
      position: relative;
      box-shadow: 0px 0px 42px 0px #000 inset;

      img{
        position: absolute;
        inset: 0;
        animation: imgGrow 7s , imgAppear 1.5s; 
      }

      @keyframes imgAppear {
        from{
          opacity: 0;
        }to{
          opacity: 1;
        }
      }

      @keyframes imgGrow {
        from{
          transform: scale(1);
        }to{
          transform: scale(1.05 );
        }
      }
    `  
    return <div>
        <Slide>
          <Image
            src={url}
            alt={''}
            layout={'fill'}
            objectFit='cover'
          />
        </Slide>
    </div>
}



function Timer() {
  const [time,setTime] = useState<any>();
  
  useEffect(()=>{
    let timer = setInterval(()=>{
      setTime(new Date())
    })

    return ()=>clearInterval(timer);
  },[])

  return (
    <p>{time?.toLocaleTimeString()} UTC+2</p>
  )
}
