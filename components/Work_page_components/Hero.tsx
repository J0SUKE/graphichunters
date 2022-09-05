import React ,{useRef,useEffect,useContext}from 'react'
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import styled from 'styled-components'
import Image from 'next/image';
import { preloaderContext } from '../../context/PreloaderContext';

export default function Hero({herotitle,intro,services,credits,heroImage,heroLogo}:{herotitle:any,intro:string,services:string,credits:string,heroImage:{url:string},heroLogo:{url:string}}) {
    
    const heroImageParallax = useRef<HTMLDivElement>(null);

    const Hero = styled.div`
        
        .title
        {
            width: calc(100% - 4rem);
            padding: 18vmax 0 0 0;
            margin: auto;
            position: relative;
            div{
                font-size: clamp(3vmax,6vw,5.5vmax);
                line-height: clamp(3vmax,6vw,5.5vmax);
                height: clamp(3vmax,6vw,5vmax);
                font-weight: 400;
                overflow: hidden;
            }
            p{
                white-space: nowrap;
            }
            .year{
                position: absolute;
                right: 0;
                top: 18vmax;
            }
            span{
                font-family: 'Serif4';
                display: block;
            }
            @media screen and (max-width:520px){
                flex-direction: column;
            }
        }    

        .details
        {
            width: calc(100% - 4rem);
            margin: auto;
            margin-top: 6vmax;
            ul{
                width: 100%;
                display:grid ;
                grid-gap: 2vmax;
                grid-template-columns: repeat(3,1fr);
                h2{
                    font-size: .9rem;
                    text-transform: uppercase;
                    opacity: .3;
                    font-weight: 400;
                    padding-bottom: 1.3vmax;
                    border-bottom: 1px solid black;
                    margin-bottom: 1.5vmax;
                }
                p{
                    font-size: 1rem;
                    line-height: 1.5rem;
                }

                @media screen and (max-width:800px){
                    grid-template-columns: 1fr;   
                }

            }            
        }

        .hero_image
        {
            padding: 6vmax 0;
            width: calc(100% - 4rem);
            margin: auto;
            &__container
            {   
                width: 100%;
                overflow: hidden;
                aspect-ratio: 1.7/1;
                position: relative;
                .img-contaier{
                    position: relative;
                    z-index: 2;
                    width: 100%;
                    height: 130%;
                }
                .logo-container{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    z-index: 3;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                }
            }
        }
    `
    
    const HeroTitle = useRef<HTMLDivElement>(null);
    const yearRef = useRef<HTMLDivElement>(null);


    // parallax
    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(HeroTitle.current,{
          scrollTrigger:{
            trigger:'.title',
            scroller: "#scroll-wrapper",
            start:'top top',
            scrub:1,
          },
          yPercent:-10,
          duration:1,
        })

        gsap.to(yearRef.current,{
            scrollTrigger:{
              trigger:'.title',
              scroller: "#scroll-wrapper",
              start:'top top',
              scrub:1,
            },
            y:'-10vmax',
            duration:1
          })


        gsap.fromTo(heroImageParallax.current,
            {
                yPercent:-30,
            },
            {
            scrollTrigger:{
              trigger:'.hero_image',
              scroller: "#scroll-wrapper",
              start:'top bottom',
              end:'bottom top',
              scrub:1,
            },
            yPercent:0,
            duration:1
          })
        


    },[])


    // load animation
    useEffect(()=>{
        const tl = PreloaderContext?.preloadAnimation?.current;
  
        if (!HeroTitle.current || !tl) return;
          
  
        tl.fromTo([...HeroTitle.current.querySelectorAll('p'),...HeroTitle.current.querySelectorAll('span')],
        {
          rotate: 4,
          yPercent:100,
          transformOrigin:'top left',
        },{
          rotate: 0,
          yPercent:0,
          duration:.8,
          stagger:-.08
        },"<")
      },[])

    const PreloaderContext = useContext(preloaderContext);

    return (
    <Hero>
        <div className="title" ref={HeroTitle}>
            <h1>
                {
                    herotitle.title.map((item:any,index:number)=><div key={index}><p>{item}</p></div>)
                }
            </h1>
            <div className="year" ref={yearRef}>
                <span>{herotitle.year}</span>
            </div>
        </div>   
        <div className="details">
            <ul>
                <li>
                    <h2>into</h2>
                    <p>{intro}</p>
                </li>
                <li>
                    <h2>services</h2>
                    <p>{services}</p>
                </li>
                <li>
                    <h2>credits</h2>
                    <ReactMarkdown skipHtml={false} rehypePlugins={[rehypeRaw]} >
                        {credits}
                    </ReactMarkdown>      

                </li>
            </ul>
        </div>     
        <div className="hero_image">
            <div className="hero_image__container">
                <div className="img-contaier" ref={heroImageParallax}>
                    <Image
                        src={heroImage.url}
                        layout={'fill'}
                        objectFit={'cover'}
                        alt=''
                        priority={true}
                    />
                </div>
                <div className="logo-container">
                    <Image
                        src={heroLogo.url}
                        layout={'fill'}
                        objectFit={'cover'}
                        alt=''
                        priority={true}
                    />
                </div>
            </div>
        </div>
    </Hero>
  )
}
