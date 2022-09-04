import React from 'react'
import styled from 'styled-components'
import WorkGridItem from '../WorkGridItem';
import {CommingSoon} from '../WorkGridItem'

interface workInterface {
    [nameField:string]:any
}

export default function WorkGrid({works}:{works:any}) {
    
    const WorkGridStyled = styled.div`
        padding: 3rem 0;
        position: relative;
        z-index: 3;
        width: calc(100% - 4rem);
        margin: auto;
        .container
        {
            display: grid;
            grid-template-columns: repeat(2,1fr);
            grid-gap: 3rem;
            @media screen and (max-width:720px)
            {
                grid-template-columns: 1fr;
            }
        }        
        border-bottom: 1px solid #a9a9a956;
    `

    return (
    <WorkGridStyled id='workgrid'>
        <ul className='container'>
            {
                works?.slice(0,3).map((item:workInterface)=>{                    
                    return <WorkGridItem 
                        key={item.id}
                        imgUrl={item.image.url as string}
                        pageUrl={item.slug as string}
                        title={item.title as string}
                        desc={item.desc as string}
                        overlayColor={item.laoder.hex as string}
                />
                })
            }                        
            <CommingSoon 
                imgUrl='/images/logo-mark-2.jpg' 
                title='knvb' 
                desc='a brand new look for TOTO KNVB Beker'
                overlayColor='#8C8783'
            />
        </ul>
    </WorkGridStyled>
  )
}



