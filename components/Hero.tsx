import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image';
import {slideShowContext} from '../context/SlideShowContext';
import Link from 'next/link';
import { throttle } from 'lodash';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';

export default function Hero() 
{
  
  const LayerRef = useRef<HTMLDivElement>(null);
  const HeroTitle = useRef<HTMLDivElement>(null);
  const BottomnRef = useRef<HTMLDivElement>(null);
  const Hunting = useRef<HTMLDivElement>(null);
  const Present = useRef<HTMLDivElement>(null);

  function ChangeLayerOpacityOnScroll() {
    window.addEventListener('scroll',throttle(()=>{
      const {scrollTop,clientHeight} = document.documentElement;

      let ratio = scrollTop/clientHeight;
      if (LayerRef.current) {
        LayerRef.current.style.opacity = `${ratio}`;  
      }      

    },10))
  }


  useEffect(()=>{        
    const tl = gsap.timeline();

    if (!HeroTitle.current || !BottomnRef.current) return;

    tl.fromTo(HeroTitle.current.querySelectorAll('p'),{
      rotate: 4,
      yPercent:100,
      transformOrigin:'top left',
    },{
      rotate: 0,
      yPercent:0,
      duration:.8,
      stagger:-.08
    }).fromTo(BottomnRef.current.querySelectorAll('p'),{
      y:'3rem',
    },{
      y:0,
      duration:.8,
      stagger:-0.1
    },'<')


    if (!Hunting.current || !Present.current) return;

    gsap.registerPlugin(ScrollTrigger);

    
    gsap.to(Hunting.current,{
      scrollTrigger:{
        trigger:'.presentation',
        start:'top bottom',
        scrub:1,
      },
      xPercent:10,
      duration:1
    })
    
    gsap.to(HeroTitle.current,{
      scrollTrigger:{
        trigger:'.presentation',
        start:'top bottom',
        scrub:1,
      },
      yPercent:-50,
      duration:1
    })
  },[])

  useEffect(()=>{
    ChangeLayerOpacityOnScroll();
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
    overflow: hidden;
    box-shadow: 19px -23px 73px 0px #000 inset;
    
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
            <div className='title' ref={HeroTitle}>
              <div><p>24/7</p></div>
              <div ref={Hunting}><p>hunting</p></div>
              <div><p>the next</p></div>
            </div>
            <div className='bottom' ref={BottomnRef}>
              <Timer/>
              <p>The creative studio focused on sports</p>
              <p>based in the netherlands</p>
            </div>
          </div>
          <div className='presentation' ref={Present}>
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
    
    // const slideshowContext = useContext(slideShowContext);
    // if (!slideshowContext) return null;
    const sliderImages = 
    [
        '/images/shoe.jpg',
        '/images/mural.jpg',
        '/images/porsche.jpg',
        '/images/fnatic.jpg',
        '/images/otw.jpg'
    ];

    
    const SlideShowStyle = styled.div`
      position: fixed;
      width: 92vw;
      height: 100%;
      z-index: 1;
      inset: 0;
    `
    return <SlideShowStyle>
      {
        sliderImages.map(img=><SlideImage key={img} url={img}/> )
      }
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
        animation: imgGrow 7s forwards , imgAppear 1.5s; 
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
