import React from 'react'
import Image from 'next/image';
import { ImageData } from '../../types/ImageData';
import styled from 'styled-components';


export default function BigSingleImage({url}:{url:string}) {
  
    const BigSingleImage = styled.div`
        width: 100%;
        aspect-ratio: 1.5/1;
        overflow: hidden;
        .img-container{
            width: 100%;
            height: 105%;
            position: relative;
        }
    `
  
    return (
    <BigSingleImage>
        <div className="img-container">
            <Image
                src={url}
                layout={'fill'}
                objectFit={'cover'}
                alt={''}
                priority={true}
            />
        </div>        
    </BigSingleImage>
  )
}

export function MediumSingleImage({image}:{image:ImageData}) {
    
    const MediumSingleImage = styled.div`
        width: calc(100% - 4rem);
        margin: auto;
        aspect-ratio: ${image.width}/${image.height};
        overflow: hidden;
        padding: 9vmax 0;
        .img-container{
            width: 100%;
            height: 100%;
            position: relative;
        }
    `
  
    return (
    <MediumSingleImage>
        <div className="img-container">
            <Image
                src={image.url}
                layout={'fill'}
                objectFit={'cover'}
                alt={''}
                priority={true}
            />
        </div>        
    </MediumSingleImage>
    )
}
