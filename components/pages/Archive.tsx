import React, { useContext, useEffect, useRef, useState } from 'react'
import DataInterface from '../../types/DataInterface';
import styled from 'styled-components'
import Image from 'next/image';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';
import {layoutRefsContext} from '../../context/LayoutRefsContext';
import { throttle } from 'lodash';
import { log } from 'console';
import { preloaderContext } from '../../context/PreloaderContext';



interface imgData {
    height:number,
    width:number,
    url:string
}


function SerparateColumns(data:DataInterface) {
    let col1 = [];
    let col2 = [];
    let col3 = [];
    
    for (let i = 0 ; i < data.archive.image.length; i+=3)
    {
                    
        if (!data.archive.image[i]) break;
        else col1.push(data.archive.image[i]);

        if (!data.archive.image[i+1]) break;
        else col2.push(data.archive.image[i+1]);

        if (!data.archive.image[i+2]) break;
        else col3.push(data.archive.image[i+2]);
    }

    return [col1,col2,col3];        
}

export default function Archive({data}:{data:DataInterface}) {
  
    const Archive = styled.div`
        background: black;
        position: relative;
        z-index: 4;    
    `
    return (
    <Archive>
            <Gallery data={data}/>
            <TitleContainer length={data.archive.image.length}/>
    </Archive>
  )
}

function Gallery({data}:{data:DataInterface}) {
    
    const Gallery = styled.div`
        display:grid;
        padding: 1.5rem 1.5rem 0 1.5rem;
        grid-template-columns: repeat(3,1fr);
        grid-gap: 1.5rem;
        @media screen  and (max-width:700px)
        {
            grid-template-columns: repeat(2,1fr);
        }
    `
    
    const [mobile,setMobile] = useState<boolean>(false);
    const [images,setImages] = useState<any>(SerparateColumns(data));

    useEffect(()=>{
        setMobile(window.innerWidth<=700 ? true : false);

        window.addEventListener('resize',throttle(()=>{                    
            if (window.innerWidth<=700){
                setMobile(true)                
            };
            if (window.innerWidth>=700){
                setMobile(false)
            };
        },100))

        gsap.to(TopShadowRef.current,
        {
            scrollTrigger:{
                trigger:"#scroll-wrapper",
                scroller: "#scroll-wrapper",
                start:()=>window.innerHeight*0.7+' center',
                toggleActions:'play pause pasue reverse'
            },      
            opacity: 1,
            duration:.5,
            ease: "power3.out",
        })
        

    },[])

    useEffect(()=>{
        if (mobile===null) return;

        if (mobile===false) {
            let col1 = [];
            let col2 = [];
            let col3 = [];
            
            for (let i = 0 ; i < data.archive.image.length; i+=3)
            {
                            
                if (!data.archive.image[i]) break;
                else col1.push(data.archive.image[i]);

                if (!data.archive.image[i+1]) break;
                else col2.push(data.archive.image[i+1]);

                if (!data.archive.image[i+2]) break;
                else col3.push(data.archive.image[i+2]);
            }

            setImages([col1,col2,col3]);    
        }

        else if (mobile===true)
        {
            let col1 = [];
            let col2 = [];
            
            for (let i = 0 ; i < data.archive.image.length; i+=2)
            {
                            
                if (!data.archive.image[i]) break;
                else col1.push(data.archive.image[i]);

                if (!data.archive.image[i+1]) break;
                else col2.push(data.archive.image[i+1]);
            }

            setImages([col1,col2]);    
        }

    },[mobile])

    const LayoutrefsContext = useContext(layoutRefsContext);
    if (!LayoutrefsContext) return null;
    const {TopShadowRef} = LayoutrefsContext;

    return <Gallery>
            {
                images.map((item:any)=>{
                    return <GalleryColumn images={item} key={Math.random()*100}/>        
                })
            }
        </Gallery>

}


function GalleryColumn({images}:{images:imgData[]}) 
{
    const  GalleryColumn = styled.ul`
        display:flex;
        flex-direction:column ;
        gap: 1.5rem;

    `

    const GalleryColumnRef = useRef<HTMLUListElement>(null);    

    return <GalleryColumn ref={GalleryColumnRef}>
        {
            images.map((item:imgData)=>{
                return <GallertItem 
                        key={item.url} 
                        width={item.width} 
                        height={item.height} 
                    >
                    <Image 
                    src={item.url}
                    layout={'fill'}
                    objectFit={'contain'}
                    alt={''}
                    priority={true}
                />
                </GallertItem>
            })
        }
    </GalleryColumn>
}


function GallertItem({children,height,width}:{children:React.ReactNode,height:number,width:number}) 
{   
    
    const ItemRef = useRef<HTMLLIElement>(null)

    const GallertItem = styled.li`
        aspect-ratio: ${width}/${height};
        .img-container
        {
            position: relative;
            height: 100%;
        }
    `

    useEffect(()=>{
        
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.fromTo(ItemRef.current,
            {
                yPercent:30,
                opacity: 0,
            },
            {
                scrollTrigger:{
                trigger:ItemRef.current,
                scroller: "#scroll-wrapper",
                start:'top bottom',
                },
                yPercent:0,
                opacity: 1,
                duration:1,
          })
        
    },[]);

    return <GallertItem ref={ItemRef}>
        <div className="img-container">
            {children}
        </div>
    </GallertItem>
}

function TitleContainer({length}:{length:number}) {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const archiveRef = useRef<HTMLParagraphElement>(null);
    const PreloaderContext = useContext(preloaderContext);

    const TitleContainer = styled.div`
        position: absolute;
        inset: 0;
        height: 100vh;
        z-index: 5;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding-bottom: 3vmax;
        padding-left: 3vmax;
        h1{
            position: relative;
            z-index: 2;
            color: white;
            text-transform: uppercase;
            font-size:clamp(6vmax,8vw,8vmax);
            div{
                overflow: hidden;
            }
            span{
                font-size: clamp(2vmax,3.5vw,3.5vmax);
                display: block;    
                font-family:'Serif4' ;
            }
            p{
                display: flex;
                align-items: center;
                gap: .5vmax;
                //text-shadow: 0px 0px 3vmax #000000;
                font-size:clamp(6vmax,8vw,8vmax);
                font-size:clamp(6vmax,8vw,8vmax);
                font-weight: 400;
            }
            p:last-of-type{
                display: inline-flex;
                font-family:'Serif4' ;
                font-size:clamp(7vmax,9vw,9vmax);
            }
        }
        .shadow
        {
            position: absolute;
            z-index: 1;
            border-radius: 100%;
            opacity: .8;
            box-shadow: 0 -5vmax 40vw 20vw #000000b1;
            width: 50vmax;
            height: 0vh;
            transform: translateX(-75%);
            background: black;
        }
    `
    // title parallax
    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger);
            
        gsap.to(titleRef.current,{
            scrollTrigger:{
                trigger:'.title-container',
                scroller: "#scroll-wrapper",
                start:'top top',
                scrub:1,
            },
            yPercent:-50,
            duration:1,
        })
        
        gsap.to(archiveRef.current,{
            scrollTrigger:{
                trigger:'.title-container',
                scroller: "#scroll-wrapper",
                start:'top top',
                scrub:1,
            },
            xPercent:15,
            duration:1,
        })
    },[])


    // load animation 
    useEffect(()=>{
        const tl = PreloaderContext?.preloadAnimation?.current;
  
        if (!titleRef.current || !tl) return;
          
  
        tl.fromTo([...titleRef.current.querySelectorAll('p')],
        {
          rotate: 4,
          yPercent:100,
          transformOrigin:'top left',
        },{
          rotate: 0,
          yPercent:0,
          duration:.8,
          stagger:-.08
        },"-=0.7")
      },[])


    return <TitleContainer className="title-container">
                <h1 ref={titleRef}>
                    <div>
                        <p>our</p>                        
                    </div>
                    <div>
                        <p ref={archiveRef}>archive<span>({length})</span></p>
                    </div>
                </h1>
                <div className="shadow">

                </div>
        </TitleContainer>    
}