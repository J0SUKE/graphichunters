import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image';
import { throttle } from 'lodash';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import InfoLink from './InfoLink';
import useCursorInteraction from '../hooks/useCursorInteraction';
import { scrollerWrapperContext } from '../context/ScrollWrapperContext';
import {preloaderContext} from '../context/PreloaderContext';
import { log } from 'console';

export default function Hero({images}:{images:{url:string}[]}) 
{  
    
  const LayerRef = useRef<HTMLDivElement>(null);
  const HeroTitle = useRef<HTMLDivElement>(null);
  const HeroRef = useCursorInteraction('onScroll') as React.RefObject<HTMLDivElement>;
  const BottomnRef = useRef<HTMLDivElement>(null);
  const Hunting = useRef<HTMLDivElement>(null);
  const Present = useRef<HTMLDivElement>(null);

  function ChangeLayerOpacityOnScroll() {
    
    
    ScrollerRef?.current?.addEventListener('scroll',throttle(()=>{
      
      if (!ScrollerRef?.current) return;

      const {clientHeight} = document.documentElement;
      const scrollTop = ScrollerRef.current.scrollTop;

      let ratio = scrollTop/clientHeight;
      if (LayerRef.current) {
        LayerRef.current.style.opacity = `${ratio}`;  
      }      

    },10))
  }

  const PreloaderContext = useContext(preloaderContext);

  // load animation
  useEffect(()=>{        
    
    const tl = PreloaderContext?.preloadAnimation?.current;

    if (!HeroTitle.current || !BottomnRef.current  || !tl) return;
      

    tl.fromTo(HeroTitle.current.querySelectorAll('p'),{
      rotate: 4,
      yPercent:100,
      transformOrigin:'top left',
    },{
      rotate: 0,
      yPercent:0,
      duration:.8,
      stagger:-.08
    },"-=0.7")
    .fromTo(BottomnRef.current.querySelectorAll('p'),{
      y:'3rem',
    },{
      y:0,
      duration:.8,
      stagger:-0.1
    },'<')
  },[])

  // hero parallax
  useEffect(()=>{
    if (!Hunting.current || !Present.current) return;

    gsap.registerPlugin(ScrollTrigger);

    
    gsap.to(Hunting.current,{
      scrollTrigger:{
        trigger:'.presentation',
        scroller: "#scroll-wrapper",
        start:'top bottom',
        scrub:1,
      },
      xPercent:10,
      duration:1
    })
    
    gsap.to(HeroTitle.current,{
      scrollTrigger:{
        trigger:'.presentation',
        scroller: "#scroll-wrapper",
        start:'top bottom',
        scrub:1,
      },
      yPercent:-50,
      duration:1,
    })
  },[])

  // layer opacity
  useEffect(()=>{
    ChangeLayerOpacityOnScroll();
  },[])  

  const wrapperContext = useContext(scrollerWrapperContext);
  if (!wrapperContext) return null;
  const {ScrollerRef} = wrapperContext;


  const HeroStyled = styled.div`
  background: black;
  position: relative;
  box-shadow: 16px 4px 56px 0px #000 inset;
`
  const HeroContent = styled.div`
    position: relative;
    background: transparent;
    color: white;
    top: 0;
    z-index: 1;
    overflow: hidden;
    &>a{
      display: block;
    }
    
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
      cursor: default;

      @media screen and (max-width:750px)
      {
        p:first-of-type,p:last-of-type
        {
          display: none;
        }
      }

    }
    .title{
      font-size: 10vmax;
      line-height: 9vmax;
      font-weight: 400;
      padding: 0 2rem;
      text-transform: uppercase;
      cursor: default;
      div{
        overflow: hidden;
      }
      #tp1
      {
        font-family: 'Serif4';
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
        font-size: 2vmax;
      }


      @media screen and (max-width:750px){
        flex-direction: column;
        align-items: flex-start;
        h4{
          width: 90%;
          font-size: 5vw;
          margin-bottom: 3rem;
        }
      }
    }

  `

  const Layer = styled.div`
    position: fixed;
    width: 92vw;
    z-index: 1;
    height: 100%;
    background: black;
    opacity: 0;
    inset: 0;
    @media screen and (max-width:1024px)
    {
      width: 100%;
    }
  `

  return (
    <HeroStyled onClick={()=>{
      document?.getElementById('workgrid')?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }} ref={HeroRef}>
        <SlideShow images={images}/>
        <Layer ref={LayerRef}/> 
        <HeroContent>
            <div className='home'>
              <div className='title' ref={HeroTitle}>
                <div><p id='tp1'>24/7</p></div>
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
              <InfoLink value='about us' link='/studio'/>
            </div>
        </HeroContent>
    </HeroStyled>
  )
}


function SlideShow({images}:{images:{url:string}[]}) {        

    const index = useRef(0);

    const imagesRefs = useRef<HTMLDivElement>(null);
    
    const SlideShowStyle = styled.div`
      position: fixed;
      width: 92vw;
      height: 100%;
      z-index: 1;
      inset: 0;
      @media screen and (max-width:1024px)
      {
        width: 100%;
      }
    ` 

    useEffect(()=>{
      
      if (!imagesRefs.current) return;

      imagesRefs.current.querySelectorAll('.imgslide')[0].classList.add('active');

      const interval = setInterval(()=>{

        if (!imagesRefs.current) return;

        imagesRefs.current.querySelectorAll('.imgslide')[index.current].classList.remove('active');
        imagesRefs.current.querySelectorAll('.imgslide')[index.current].classList.add('end');

        if (index.current==images.length-1) index.current=0;
        else index.current++;
        

        imagesRefs.current.querySelectorAll('.imgslide')[index.current].classList.add('active');
        setTimeout(()=>{
          
          if (index.current==0){
            imagesRefs.current?.querySelectorAll('.imgslide')[images.length-1].classList.remove('end');
          }
          else imagesRefs.current?.querySelectorAll('.imgslide')[index.current-1].classList.remove('end');;
          
        },2000);

      },5000)

      return ()=>clearInterval(interval);


    },[])

    return <SlideShowStyle ref={imagesRefs}>
      {
        images.map(img=><SlideImage key={img.url} url={img.url}/> )
      }
    </SlideShowStyle>
}


function SlideImage({url}:{url:string}) {
    
    var Slide = styled.div`
      height: 100vh;
      position: absolute;
      z-index: 1;
      inset: 0;
      opacity: 0;

      img{
        position: absolute;
        inset: 0;        
      }
      z-index: 1;
      &.end
      {
        z-index: 2;
        opacity: 1;
        img{
          transform: scale(1.1 );
        }
      }
      &.active
      {
        z-index: 3;
        opacity: 1;
        img{
          animation: imgGrow 7s forwards , imgAppear 1.5s forwards; 
        }
        
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
          transform: scale(1.1 );
        }
      }
    `  
    return <Slide className='imgslide'> 
          <Image
            src={url}
            alt={''}
            layout={'fill'}
            objectFit='cover'
            priority={true}
          />
        </Slide>
}



export function Timer() {
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
