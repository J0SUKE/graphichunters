import React, { useRef } from "react";
import styled from "styled-components";
import useCursorInteraction from "../hooks/useCursorInteraction";
import Link from "next/link";
import Image from "next/image";

export default function WorkGridItem({imgUrl,pageUrl,title,desc,overlayColor}:{imgUrl:string,pageUrl:string,title:string,desc:string,overlayColor:string}) {

    const GridItem = styled.li`
        position: relative;
        aspect-ratio: 1/1;
        .img-container
        {
            width: 100%;
            position: relative;
            aspect-ratio: 1/1;
            transition: border-radius .5s;
            overflow: hidden;
            img{
                transition: transform 1s;
                transform: scale(1.5);                
            }
            &.loaded{
                img{
                    transform: scale(1);         
                }                
            }

            &:hover
            {
                border-radius: 50%;
                img{
                    filter: grayscale(100%);
                }
                img{
                    transform: scale(1.1);
                }
            }

        }
        .loader
        {
            position: absolute;
            inset: 0;
            background: ${overlayColor};
            z-index: 2;
            transition: transform .4s;
            &.loaded{
                transform: translateY(-100%);
            }
        }

        &:hover
        {
            h2 span:last-of-type
            {
                transform: translateY(-120%);
                color: #9BFA00;
            }
            h2 span:first-of-type
            {
                transform: translateY(-100%);
            }
        }

        h2{
            text-transform: uppercase;
            color: white;
            margin-top: 1rem;
            font-size: 1.1rem;
            height: 1.1rem;
            overflow-y: hidden;
            span{
                display: block;
                transition: transform .6s cubic-bezier( 0.52, 0.26, 0.05, 0.9 ) ;
            }      
        }
        p{
            text-transform: uppercase;
            color: white;
            font-size: 1.1rem;
            margin-top: .8rem;
            font-weight: 300;
        }
    `
    const loaderRef = useRef<HTMLDivElement>(null);
    const ImageRef = useRef<HTMLDivElement>(null);
    const GridRef = useCursorInteraction('onView') as React.RefObject<HTMLLIElement>;

    return <Link href={`/work/${pageUrl}`}>
        <a>
            <GridItem ref={GridRef}>
                <div className='img-container' ref={ImageRef}>
                    <div className="loader" ref={loaderRef}></div>                    
                    <Image
                        src={imgUrl}
                        layout={'fill'}
                        objectFit={'cover'}
                        alt={''}
                        onLoad={()=>{
                            loaderRef.current?.classList.add('loaded');
                            ImageRef.current?.classList.add('loaded');
                        }}
                    />
                </div>
                <h2>
                    <span>{title}</span>
                    <span>{title}</span>
                </h2>
                <p>{desc}</p>
            </GridItem>
        </a>
    </Link>
}

export function CommingSoon({imgUrl,title,desc,overlayColor}:{imgUrl:string,title:string,desc:string,overlayColor:string}) {
    const GridItem = styled.li`
        aspect-ratio: 1/1;
        .img-container
        {
            width: 100%;
            overflow: hidden;
            position: relative;
            aspect-ratio: 1/1;            
            img{
                transition: transform 1s;
                transform: scale(1.5);                
            }            

            .img
            {
                position: relative;
                width: 100%;
                height: 100%;
                &.loaded
                {
                    img{
                        transform: scale(1);         
                    }                
                }
            }
        }

        .loader
        {
            position: absolute;
            inset: 0;
            background: ${overlayColor};
            z-index: 2;
            transition: transform .3s;
            &.loaded{
                transform: translateY(-100%);
            }
        }

        h2{
            text-transform: uppercase;
            color: white;
            margin-top: 1rem;
            font-size: 1.1rem;
            height: 1.1rem;
            overflow-y: hidden;
            span{
                display: block;
            }      
        }
        &>p{
            text-transform: uppercase;
            color: white;
            font-size: 1.1rem;
            margin-top: .8rem;
        }
        .marquee
        {
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
            right: 0;
            background: white;
            overflow: hidden;
            ul{
                display: flex;
                padding: 1.5rem 0;
                height: 100%;
                li{
                    display: flex;
                    animation: animatemarquee 12s linear infinite;

                    p{
                        color: black;
                        white-space: nowrap;
                        text-transform: uppercase;
                        font-size: 1rem;
                        padding: 0 .5rem;
                    }
                }
            }

            @keyframes animatemarquee {
                from{
                    transform: translateX(0);
                }to{
                    transform: translateX(-100%);
                }
            }
        }
    `
    const loaderRef = useRef<HTMLDivElement>(null);
    const ImageRef = useRef<HTMLDivElement>(null);

    return <GridItem>
            <div className='img-container'>
                <div className='marquee'>
                    <ul>
                        <li>
                            <p>coming soon</p>
                            <p>coming soon</p>
                            <p>coming soon</p>
                            <p>coming soon</p>
                            <p>coming soon</p>
                            <p>coming soon</p>
                        </li>
                        <li>
                            <p>coming soon</p>
                            <p>coming soon</p>
                            <p>coming soon</p>
                            <p>coming soon</p>
                            <p>coming soon</p>
                            <p>coming soon</p>
                        </li>
                    </ul>
                </div>
                <div className="loader" ref={loaderRef}></div>            
                <div className="img" ref={ImageRef}>
                    <Image
                        src={imgUrl}
                        layout={'fill'}
                        objectFit={'cover'}
                        alt={''}
                        onLoad={()=>{
                            loaderRef.current?.classList.add('loaded');
                            ImageRef.current?.classList.add('loaded');
                        }}
                    />
                </div>                        
            </div>
            <h2>
                <span>{title}</span>
            </h2>
            <p>{desc}</p>
        </GridItem>
}