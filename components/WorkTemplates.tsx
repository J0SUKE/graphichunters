import React from 'react'
import BigSingleImage from './Work_page_components/ImagesComponents'
import VideosGrid from './Work_page_components/VideosGrid';
import DataInterface from '../types/DataInterface'
import {MediumSingleImage} from './Work_page_components/ImagesComponents'
import ParallaxSection from './Work_page_components/ParallaxSection';
import ParallaxImagesGrid from './Work_page_components/ParallaxImagesGrid';
import ImagesGrid from './Work_page_components/ImagesGrid';
import { log } from 'console'

export default function WorkTemplates({template,data}:{template:number,data:DataInterface}) {
  return (
    <>
        {
            template==1 ?
            <Work1 data={data}/>
            :
            template==2  ?
            <Work2 data={data}/>
            :
            template==3 ?
            <Work3 data={data}/>
            :
            template==4 ?
            <Work4 data={data}/>
            :
            template==5 ?
            <Work5 data={data}/>
            :
            null
        }
    </>
  )
}

function Work1({data}:{data:DataInterface}) 
{

      return <>
        <BigSingleImage url={data.bigImage.url}/>
        <VideosGrid videos={
          [
            {
              url:'https://www.graphichunters.com/media/pages/work/uefa-feuro-2022/4d7328b9aa-1658411362/05.mp4'
            },
            {
              url:'https://www.graphichunters.com/media/pages/work/uefa-feuro-2022/2f1784dffd-1658411361/03.mp4'
            }
          ]}/>
        <ParallaxSection image={data.parallaxSection[0]}/>
        <MediumSingleImage image={{
          url:'/images/mural-2.jpg',
          width:1.35,
          height:1
        }}/>
        <ParallaxSection image={data.parallaxSection[1]}/>
        <VideosGrid videos={
          [
            {
              url:'https://www.graphichunters.com/media/pages/work/uefa-feuro-2022/30d8663eb3-1658411362/06.mp4'
            },
            {
              url:'https://www.graphichunters.com/media/pages/work/uefa-feuro-2022/b6459045f2-1658411362/04.mp4'
            }
          ]}/>
    </> 
}

function Work2({data}:{data:DataInterface}) 
{  
  return <>
    <ParallaxSection image={data.parallaxSection[0]}/>
    <ParallaxImagesGrid images={data.parallaxGrid} bgColor={'white'}/>
    <ImagesGrid images={data.imagesGallery.slice(0,2)} bgColor={'white'}/>
    <ParallaxSection image={data.parallaxSection[1]}/>
    <ImagesGrid images={data.imagesGallery.slice(2,4)}/>
    <ParallaxSection image={data.parallaxSection[2]}/>
    <ImagesGrid images={data.imagesGallery.slice(4,8)}/>
    <ParallaxSection image={data.parallaxSection[3]}/>

  </>  
}

function Work3({data}:{data:DataInterface}) 
{
  return <>
    <ParallaxSection image={data.parallaxSection[0]}/>
    <ImagesGrid images={data.imagesGallery.slice(0,4)}/>
    <BigSingleImage url={data.bigImage.url}/>
  </>
}

function Work4({data}:{data:DataInterface}) 
{
  return <>
    <ParallaxSection image={data.parallaxSection[0]}/>
    <ParallaxImagesGrid images={data.parallaxGrid}/>
    <BigSingleImage url={data.bigImage.url}/>
    <ImagesGrid images={data.imagesGallery.slice(0,4)}/>
    <ParallaxSection image={data.parallaxSection[1]}/>
  </>
}

function Work5({data}:{data:DataInterface}) 
{
  return <>
    <ImagesGrid images={data.imagesGallery.slice(0,4)}/>
    <ParallaxSection image={data.parallaxSection[0]}/>
    <ImagesGrid images={data.imagesGallery.slice(3,7)}/>
    <ParallaxSection image={data.parallaxSection[1]}/>
    <ImagesGrid images={data.imagesGallery.slice(7,9)}/>
    <ParallaxSection image={data.parallaxSection[2]}/>

  </>
}