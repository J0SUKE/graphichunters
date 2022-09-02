import React, { useEffect, useState } from 'react'
import DataInterface from '../../types/DataInterface';
import styled from 'styled-components'
import Image from 'next/image';
import { log } from 'console';
import { throttle } from 'lodash';


interface imgData {
    height:number,
    width:number,
    url:string
}

export default function Archive({data}:{data:DataInterface}) {
  
    const Archive = styled.div`
        background: black;
        padding: 1.5rem;
        display:grid;
        grid-template-columns: repeat(3,1fr);
        grid-gap: 1.5rem;
        position: relative;
        z-index: 4;

        @media screen  and (max-width:700px)
        {
            grid-template-columns: repeat(2,1fr);
        }
    `
    
    const [mobile,setMobile] = useState<boolean | null>(null);
    const [images,setImages] = useState<any>([]);

    useEffect(()=>{
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

    },[])
  
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

    return (
    <Archive>
        {
            mobile!=null && images.map((item:any)=>{
                return <GalleryColumn images={item} key={Math.random()*100}/>        
            })
        }
    </Archive>
  )
}

function GalleryColumn({images}:{images:imgData[]}) 
{
    const  GalleryColumn = styled.ul`
        display:flex;
        flex-direction:column ;
        gap: 1.5rem;
    `

    return <GalleryColumn>
        {
            images.map((item:imgData)=>{
                return <GallertItem key={item.url} width={item.width} height={item.height} >
                    <Image 
                    src={item.url}
                    layout={'fill'}
                    objectFit={'contain'}
                    alt={''}
                />
                </GallertItem>
            })
        }
    </GalleryColumn>
}


function GallertItem({children,height,width}:{children:React.ReactNode,height:number,width:number}) 
{   
    
    const GallertItem = styled.li`
        aspect-ratio: ${width}/${height};
        
        .img-container
        {
            position: relative;
            height: 100%;
        }
    `

    return <GallertItem>
        <div className="img-container">
            {children}
        </div>
    </GallertItem>
}