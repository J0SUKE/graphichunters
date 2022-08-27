import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image';
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
      duration:1,
      opacity: .2,
    })
  },[])

  useEffect(()=>{
    ChangeLayerOpacityOnScroll();
  },[])

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
    z-index: 3;
    overflow: hidden;
    
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
    @media screen and (max-width:1024px)
    {
      width: 100%;
    }
  `

  return (
    <HeroStyled>
        <SlideShow/>
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

    const index = useRef(0);

    const sliderImages = 
    [
        '/images/shoe.jpg',
        '/images/mural.jpg',
        '/images/porsche.jpg',
        '/images/fnatic.jpg',
        '/images/otw.jpg'
    ];

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

        if (index.current==sliderImages.length-1) index.current=0;
        else index.current++;
        

        imagesRefs.current.querySelectorAll('.imgslide')[index.current].classList.add('active');
        setTimeout(()=>{
          
          if (index.current==0){
            imagesRefs.current?.querySelectorAll('.imgslide')[sliderImages.length-1].classList.remove('end');
          }
          else imagesRefs.current?.querySelectorAll('.imgslide')[index.current-1].classList.remove('end');;
          
        },2000);

      },5000)

      return ()=>clearInterval(interval);


    },[])

    return <SlideShowStyle ref={imagesRefs}>
      {
        sliderImages.map(img=><SlideImage key={img} url={img}/> )
      }
    </SlideShowStyle>
}


function SlideImage({url}:{url:string}) {
    
    var Slide = styled.div`
      height: 100vh;
      position: absolute;
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
