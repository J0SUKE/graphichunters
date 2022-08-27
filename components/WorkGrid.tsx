import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

export default function WorkGrid() {
    
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
            <GridItem 
                imgUrl='/images/mural.jpg' 
                pageUrl='/work/uefa-feuro-2022' 
                title='uefa' 
                desc='Illustration toolkit for Futsal Euro 2022'
            />
            <GridItem 
                imgUrl='/images/logo-board.jpg' 
                pageUrl='/work/future-goals' 
                title='afc ajax' 
                desc='CARIBBEAN INSPIRED DESIGN FOR FUTURE GOALS'
            />
            <GridItem 
                imgUrl='/images/thumb-2.jpg' 
                pageUrl='/work/knvb-25-years-of-just-doing-it' 
                title='knvb x nike' 
                desc='CELEBRATING 25 YEARS OF JUST DOING IT'
            />
            <CommingSoon 
                imgUrl='/images/logo-mark-2.jpg' 
                title='knvb' 
                desc='a brand new look for TOTO KNVB Beker'
            />
        </ul>
    </WorkGridStyled>
  )
}

function GridItem({imgUrl,pageUrl,title,desc}:{imgUrl:string,pageUrl:string,title:string,desc:string}) {
    
    const GridItem = styled.li`
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
            }
            &:hover{
                border-radius: 50%;
                filter: grayscale(100%);
                img{
                    transform: scale(1.1);
                }
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
        }
    `

    return <Link href={pageUrl}>
        <a>
            <GridItem>
                <div className='img-container'>
                    <Image
                        src={imgUrl}
                        layout={'fill'}
                        objectFit={'cover'}
                        alt={''}
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


function CommingSoon({imgUrl,title,desc}:{imgUrl:string,title:string,desc:string}) {
    const GridItem = styled.li`
        aspect-ratio: 1/1;
        .img-container
        {
            width: 100%;
            position: relative;
            aspect-ratio: 1/1;
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
                <Image
                    src={imgUrl}
                    layout={'fill'}
                    objectFit={'cover'}
                    alt={''}
                />
            </div>
            <h2>
                <span>{title}</span>
            </h2>
            <p>{desc}</p>
        </GridItem>
}