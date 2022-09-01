import { log } from 'console'
import React from 'react'
import styled from 'styled-components'
import DataInterface from '../../types/DataInterface'
import WorkGridItem from '../WorkGridItem'
import {CommingSoon} from '../WorkGridItem';

interface workInterface {
  [nameField:string]:any
}

export default function Work({data}:{data:DataInterface}) {
  
  
  const Work = styled.div`
    background: black;
    padding: 3rem 0;
    position: relative;
    z-index: 4;    
    .container{
      width: calc(100% - 4rem);
      margin: auto;
      display: grid;
      grid-template-columns: repeat(2,1fr);
      border-top: 1px solid #a9a9a956;
      padding-top: 3rem;
      grid-gap: 3rem;
      padding-bottom: 6vmax;
    }
  `
 
  return (
    <Work>
      <div className="container">
      {
        data.allWorks.map((item:workInterface)=>{
          return  <WorkGridItem 
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
        <WorkGridItem 
            imgUrl={'/images/thumb-3.jpg'}
            pageUrl={'eredivisie-one-to-watch'}
            title={'Eredivisie'}
            desc={'A NEW SEASON OF ONE TO WATCH'}
            overlayColor={'#DEF4E3'}
        />
        <WorkGridItem 
            imgUrl={'/images/thumb-4.jpg'}
            pageUrl={'easports-fgs22'}
            title={'EA Sports'}
            desc={'ARTWORK FOR FIFA GLOBAL SERIES \'22'}
            overlayColor={'#F36329'}
        />
      </div>      
    </Work>
  )
}
