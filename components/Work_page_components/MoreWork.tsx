import React from 'react'
import InfoLink from '../InfoLink'
import { CommingSoon } from '../WorkGridItem'
import WorkGridItem from '../WorkGridItem'
import styled from 'styled-components'
import { log } from 'console'

export default function MoreWork({works}:{works:any[]}) {
  
    const MoreWork = styled.div`
        background: #0A0A0A;
        .container{
            width: calc(100% - 4rem);
            margin: auto;
            padding: 9vmax 0;
        }
        .top{
            display: flex;
            justify-content: space-between;
            color: white;
            margin-bottom: 2.5vmax;
            h2{
                text-transform: uppercase;
                font-weight: 400;
                font-size: 1.9rem;
            }
        }
        .content
        {
            display: grid;
            grid-template-columns: repeat(2,1fr);
            grid-gap: 3rem;
            @media screen and (max-width:720px)
            {
                grid-template-columns: 1fr;
            }
        }
    `
    
    console.log(works);
    

    return (
    <MoreWork>
        <div className="container">
            <div className="top">
                <h2>more work</h2>
                <InfoLink value='overview (6)' link='/work'/>
            </div>
            <div className="content">
                {
                    works.length==1 ?
                    <>
                        <WorkGridItem
                            imgUrl={works[0].image.url as string}
                            pageUrl={works[0].slug as string}
                            title={works[0].title as string}
                            desc={works[0].desc as string}
                            overlayColor={works[0].laoder.hex as string}
                        />
                        <CommingSoon 
                            imgUrl='/images/logo-mark-2.jpg' 
                            title='knvb' 
                            desc='a brand new look for TOTO KNVB Beker'
                            overlayColor='#8C8783'
                        />
                    </>
                    :
                    works.map((item:any)=>(
                        <WorkGridItem
                            key={item.id}
                            imgUrl={item.image.url as string}
                            pageUrl={item.slug as string}
                            title={item.title as string}
                            desc={item.desc as string}
                            overlayColor={item.laoder.hex as string}
                        />
                    ))

                }
            </div>
        </div>
    </MoreWork>
  )
}
