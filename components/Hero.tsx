import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image';
import { setInterval } from 'timers';

export default function Hero({index}:{index:number}) {
  
  const sliderImages = 
  [
    '/images/shoe.jpg',
    '/images/mural.jpg',
    '/images/porsche.jpg',
    '/images/fnatic.jpg',
    '/images/otw.jpg'
  ];
  
  const HeroStyled = styled.div`
  height: 110vh;
  background: black;
  position: relative;
`

  return (
    <HeroStyled>
        <SlideShow index={index} images={sliderImages}/>
    </HeroStyled>
  )
}


function SlideShow({images,index}:{images:string[],index:number}) {        
    
    const SlideShowStyle = styled.div`
      position: fixed;
      width: 92vw;
      height: 100%;
      inset: 0;
    `
    return <SlideShowStyle>
      <SlideImage  url={images[index]}/>
    </SlideShowStyle>
}


function SlideImage({url}:{url:string}) {
    
    var Slide = styled.div`
      height: 100vh;
      position: relative;

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