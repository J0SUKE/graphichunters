import React,{useEffect,useContext,useRef} from 'react'
import styled from 'styled-components'
import Image from 'next/image';
import gsap from 'gsap' 
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import { layoutRefsContext } from '../../context/LayoutRefsContext';
import InfoLink from '../InfoLink';
import { preloaderContext } from '../../context/PreloaderContext';
import useCursorInteraction from '../../hooks/useCursorInteraction';

export default function Contact() {
    
  const ImageParallaxRef = useRef<HTMLDivElement>(null);
  const HeroTitle = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const ContactRef = useCursorInteraction('blend') as React.RefObject<HTMLDivElement>;
    
    const Contact = styled.div`
        position: relative;
        z-index: 4;
        background: white;

        .hero
        {
          height: calc(100vh - 2rem);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          .hero__content
          {
            width: calc(100% - 4rem);
            padding-bottom: 7vmax;
            display: flex;
            justify-content: space-between;            
            align-items: flex-start;
          }
          &__right
          {
            width: 18%;
            aspect-ratio: 1/1.3;
            overflow: hidden;
            .img-container
            {
              width: 100%;
              height: 130%;
              position: relative;
            }
          }

          &__left
          {
            .title{
              div{
                line-height: 8vmax;
                height: 7.7vmax;
                overflow: hidden;
              }
              
              p{
                font-size: 8vmax;
                text-transform: uppercase;
              }
              span{
                font-family: 'Serif4';
                display: block;
                text-transform: uppercase;
                font-size: 8.5vmax;
              }
            }
            .bottom{
              margin-top: 2.1rem;
            }
          }

        }
        .form-zone
        {
          display: flex;
          gap: 5%;
          width: calc(100% - 4rem);

          margin: auto;
          padding-bottom: 10vmax;
          form{
            width: 75%;
            border-top: 1px solid rgb(180, 180, 180);
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }
          button{
            background: transparent;
            margin-top: 2rem;
            border: none;
            outline: none;
          }
          .details{
            display: flex;
            flex-direction: column;
            gap: 2rem;
            h2{
              font-size: .9rem;
              font-weight: 400;
              color: #0A0A0A;
              opacity: .4;
              white-space: nowrap;
            }
            p{
              font-weight: 500;
            }
            p:first-of-type{
              margin-top: 1rem;
            }
            p:last-of-type{
              margin-top: .3rem;
            }
          }

          @media screen and (max-width:850px){
            flex-direction: column;
            form{
              width: 100%;
            }
          }

        }
    `
    
    // parallax
    useEffect(()=>{
      LogoRef.current.style.mixBlendMode = 'difference';
      NavLinksRef.current.style.mixBlendMode = 'difference';  
      (MenuButtonRef.current as HTMLDivElement).classList.add('dark');


      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(ImageParallaxRef.current,
        {
          yPercent:-15
        },
        {
        scrollTrigger:{
          trigger:'.hero',
          scroller: "#scroll-wrapper",
          start:'top top',
          scrub:1,
        },
        yPercent:0,
        duration:1,
      })

      gsap.to(HeroTitle.current,{
        scrollTrigger:{
          trigger:'.hero',
          scroller: "#scroll-wrapper",
          start:'top top',
          scrub:1,
        },
        yPercent:-25,
        duration:1,
      })

      gsap.to(workRef.current,{
        scrollTrigger:{
          trigger:'.hero',
          scroller: "#scroll-wrapper",
          start:'top top',
          scrub:1,
        },
        xPercent:20,
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
        yPercent:-15,
        duration:.8,
        stagger:-.08
      },"-=0.7")
      
      tl.fromTo(ImageParallaxRef.current,
      {
        yPercent:100,
      },{
        yPercent:-15,
        duration:.8,
      },"<")



    },[])

    
    const LayoutrefsContext = useContext(layoutRefsContext);
    const PreloaderContext = useContext(preloaderContext);
    if (!LayoutrefsContext) return null;
    const {LogoRef,NavLinksRef,MenuButtonRef} = LayoutrefsContext;

    return (
    <Contact ref={ContactRef}>
        <div className="hero">
          <div className="hero__content">
            <div className="hero__left">
                <div className="title" ref={HeroTitle}>
                  <div><span>let&apos;s</span></div>
                  <div ref={workRef}><p>work</p></div>
                  <div><p>together</p></div>
                </div>
                <div className="bottom">
                  <p>Send us your enquiry and we’ll respond within 1-2 working days.</p>
                </div>
            </div>  
            <div className="hero__right">
                <div className="img-container" ref={ImageParallaxRef}>
                  <Image
                    src={'/images/office-contact.jpg'}
                    layout={'fill'}
                    objectFit={'contain'}
                    priority={true}
                    alt={''}
                  />  
                </div>
            </div>
          </div>          
        </div>
        <div className="form-zone" >
            <form action='/contact' method='post'>
              <InputField label={'WHAT\'S YOUR NAME?'} placeholder={'John Doe *'} type={'text'} index={'01'}/>
              <InputField label={'WHAT\'S YOUR EMAIL?'} placeholder={'John@Doe.com *'} type={'text'} index={'02'}/>
              <InputField label={'WHAT\'S THE NAME OF YOUR ORGANIZATION?'} placeholder={'John & Doe ®'} type={'text'} index={'03'}/>
              <InputField label={'WHAT SERVICES ARE YOU LOOKING FOR?'} placeholder={'Brand Identity + Visual Content ...'} type={'text'} index={'04'}/>
              <InputField label={'YOUR MESSAGE'} placeholder={'Hey there, can you help me with ... *'} type={'textarea'} index={'05'}/>
              <button type='submit'>
                  <InfoLink value='send message' link='/contact' fake={true} black={true}/>
              </button>
            </form>             
            <div className='details'>
              <div>
                <h2>CONTACT DETAILS</h2>
                <p>Jeroen Scheper</p>
                <p>+31 6 46907751</p>
              </div>
              <div>
                <h2>BUSINESS DETAILS</h2>
                <p>CoC: 65554443</p>
                <p>VAT: NL0038747847</p>
              </div>
            </div>
        </div>
    </Contact>
  )
}


function InputField({label,placeholder,type,index}:{label:string,placeholder:string,type:string,index:string}) 
{
    
  const InputField = styled.div`
    border-bottom: 1px solid rgb(180, 180, 180);
    width: 100%;
    padding: 2.5rem 0;
    div{
      display: flex;
      justify-content: space-between;
      p{
        font-size: clamp(1.1rem,3vw,1.5rem);
      }
      p:last-of-type{
        font-family: 'Serif4';
      }
    }
    input,textarea{
      width: 100%;
      font-size: clamp(1rem,2.8vw,1.3rem);
      margin-top: 1.5rem;
      border: none;
      outline: none;
    }
    textarea
    {
      resize: none;
    }
  `
    
    return <InputField>
        <div>
          <p>{label}</p>
          <p>{index}</p>
        </div>
        {
          type=='textarea' ?
          <textarea autoCorrect={'false'} placeholder={placeholder} rows={5}></textarea>
          :
          <input type={type} placeholder={placeholder} autoCorrect={'false'}/>
        }
    </InputField>
}