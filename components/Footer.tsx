import React, { RefObject, useEffect, useRef } from 'react'
import styled from 'styled-components'
import InfoLink from './InfoLink'
import { Timer } from './Home/Hero'
import useShadowHeader from '../hooks/useShadowHeader'
import gsap from 'gsap'

export default function Footer({FooterRef,white,contact}:{FooterRef:RefObject<HTMLElement>,white?:boolean,contact?:boolean}) {
    

    const FooterTop = useRef<HTMLDivElement>(null);
    const FooterContent = useRef<HTMLDivElement>(null);

    const FooterStyled = styled.footer`
        position: relative;
        z-index: 3;
        background: ${white ? '#EEEEEE' : 'black'};
        color: ${!white ? 'white' : 'black'};

        .footer-top{
          display: flex;
          padding: 5vw 0;
          width: calc(100% - 4rem);
          background: ${white ? '#EEEEEE' : 'black'};
          box-shadow: ${white ? 'unset' : '0px 2.2vh 5.1vh 0.8vh #000'};
          color: ${!white ? 'white' : 'black'};
          margin: auto;
          border-bottom: 1px solid #a9a9a956;
          justify-content: space-between;
          align-items: flex-end;
          position: relative;
          z-index: 2;

          h2{
            font-size: 9vmax;
            line-height: 9vmax;
            text-transform: uppercase;
            span:last-of-type{
              font-family: 'Serif4';
            }
            span{
              display: block;
              height: 9vmax;
              line-height: 9vmax;
              font-weight: 400;
            }
          }

          @media screen and (max-width:550px)
          {
            flex-direction: column;
            align-items: flex-start;
            h2{
              font-size: 5vmax;
              line-height: 5vmax;
              span
              {
                height: 5vmax;
                line-height: 5vmax;
                font-weight: 400;
              }
            }
          }
        }
        .footer{
          padding-top: 5vw;
          background: ${white ? '#EEEEEE' : 'black'};
        }
        .footer-content
        {
          padding-bottom: 3vw;
          background: ${white ? '#EEEEEE' : 'black'};
          width: calc(100% - 4rem);
          margin: auto;
          position: relative;
          z-index: 1;
          .email
          {
            span{
              color: #737373;
              display: block;
              text-transform: uppercase;
              font-size: .9rem;
            }
            div{
              font-size: 3vmax;
              height: 3vmax;
              line-height: 3vmax;
              padding-bottom: .2vw;
              margin-top: 1rem;
            }
            a{
              font-size: 3vmax;
              height: 3vmax;
              line-height: 3vmax;
              display: block;
            }
          }
          .infos
          {
            display: flex;
            margin-top: 4vw;
            justify-content: space-between;
            &__left{
              span{
                color: #737373;
                display: block;
                text-transform: uppercase;
                font-size: .9rem;
              }
              div{
                display: flex;
                margin-top:1rem;
                gap: 3rem;
                ul{
                  h2{
                    text-transform: uppercase;
                    font-size: 1.1rem;
                    margin-bottom: 1rem;
                  }
                  li{
                    margin-top: .4rem;
                  }
                }
              }
            }
            &__right{
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              span{
                color: #737373;
                display: block;
                text-transform: uppercase;
                font-size: .9rem;
              }
              ul{
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                margin-top: 1rem;
                li{
                  height: 1.8rem;
                }
                div{
                  height: 1rem;
                  line-height: 1rem;
                  font-size: 1rem;
                  padding-bottom: .1rem;
                }
                a{
                  font-size: 1rem;
                  line-height: 1rem;
                } 
              }
            }
            @media screen and (max-width:550px) {
              flex-direction: column;
              &__right
              {
                margin-top: 3rem;
                align-items: flex-start;
              }
            }
          }
        }

        .footer-bottom
        {
          width: calc(100% - 4rem);
          margin: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: .9rem;
          margin-top: 2rem;
          padding-bottom: 2rem;
          p{
            text-transform: uppercase;
          }
          div{
            font-size: .9rem;
            line-height: .9rem;
            height: .9rem;
            padding-bottom: .1rem;
            border-bottom: none;
          }
          @media screen and (max-width:550px)
          {
            p:nth-of-type(2)
            {
              display: none;
            }
          }
        }
    `

    useEffect(()=>{
      
      gsap.fromTo(FooterContent.current,
      {
        yPercent:-70,
      },
      { 
        scrollTrigger:{
          trigger:FooterContent.current,
          scroller: "#scroll-wrapper",
          start:'top bottom',
          scrub:1,
        },        
        yPercent:0,
        duration:3,
      })

      if (!FooterTop.current) return;
      gsap.fromTo(FooterTop.current,
        {
          yPercent:-50,
        },
        { 
          scrollTrigger:{
            trigger:FooterTop.current,
            scroller: "#scroll-wrapper",
            start:'top bottom',
            scrub:1,
          },        
          yPercent:0,
          duration:1,
        })

    },[])



    return (
    <FooterStyled ref={FooterRef}>
      {
        !contact &&
        <div className="footer-top" ref={FooterTop}>
          <h2>
            <span>let&apos;s</span>
            <span>connect</span>
          </h2>
          <InfoLink value='contact us' link='/contact' black={white} />
        </div>
      }      
      
      <div  className='footer' ref={FooterContent}>
        <div className="footer-content">
          <div className="email">
            <span>send us an email</span>    
            <InfoLink value='hello@graphichunters.com' link='mailto:hello@graphichunters.com' black={white}/>
          </div>
          <div className="infos">
            <div className="infos__left">
              <span>our offices</span>
              <div>
                  <ul>
                    <h2>amsterdam</h2>
                    <li>Schollenbrugstraat 17H</li>
                    <li>1715 HE, Amsterdam</li>
                    <li>The Netherlands</li>
                  </ul>
                  <ul>
                    <h2>geleen</h2>
                    <li>Hofdwarsweg 5B</li>
                    <li>6161 DE, Geleen</li>
                    <li>The Netherlands</li>
                  </ul>
              </div>
            </div>
            <div className="infos__right">
              <span>socials</span>
              <ul>
                <li><InfoLink value='linkedin' link='https://www.linkedin.com/in/jean-mazouni-214803242/' external={true} black={white}/></li>
                <li><InfoLink value='twitter' link='https://twitter.com/Jean_mazouni' external={true} black={white}/></li>
                <li><InfoLink value='malt' link='https://www.malt.fr/profile/jeanmazouni' external={true} black={white}/></li>
                <li><InfoLink value='github' link='https://github.com/J0SUKE' external={true} black={white}/></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <Timer/>
          <p>ALL RIGHTS RESERVED © 2022</p>
          <InfoLink value='code by jean' link='https://jeanmazouni.com/' external={true} black={white}/>
        </div>
      </div>      
    </FooterStyled>
  )
}
