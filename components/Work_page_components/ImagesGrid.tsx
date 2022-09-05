import React from 'react'
import Image from 'next/image';
import { ImageData } from '../../types/ImageData';
import styled from 'styled-components'

export default function ImagesGrid({images,bgColor}:{images:ImageData[],bgColor?:string}) {
  
    const ImagesGrid = styled.div`
        
        background: ${bgColor ? bgColor : 'unset'};
        
        .container
        {
            width: calc(100% - 4rem);
            margin: auto;
            display: grid;
            padding: 9vmax 0;
            grid-template-columns: repeat(2,1fr);
            grid-gap: 2rem;
            @media screen and (max-width:720px)
            {
                grid-template-columns: 1fr;
            }
            li{
                position: relative;
                aspect-ratio: ${images[0].width} / ${images[0].height};
            }
        }

    `;
  
    return (
    <ImagesGrid>
        <ul className="container">
            {
                images.map((item:ImageData)=>(
                    <li key={item.url}>
                        <Image
                            src={item.url}
                            alt={''}
                            layout={'fill'}
                            objectFit={'cover'}
                            priority={true}
                        />
                    </li>
                ))
            }
        </ul>
    </ImagesGrid>
  )
}
