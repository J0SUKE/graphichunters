import React, { useEffect, useState } from 'react'

interface SlideShowContextInterface {
    sliderImages:string[],
    index:number,
    setIndex:React.Dispatch<React.SetStateAction<number>>,
    prevIndex:number,
    setPrevIndex:React.Dispatch<React.SetStateAction<number>>,

}

export const slideShowContext = React.createContext<SlideShowContextInterface | null>(null);


export default function SlideShowContext({children}:{children:React.ReactNode}) {
  
    const sliderImages = 
    [
        '/images/shoe.jpg',
        '/images/mural.jpg',
        '/images/porsche.jpg',
        '/images/fnatic.jpg',
        '/images/otw.jpg'
    ];

    const [index,setIndex] = useState(0);
    const [prevIndex,setPrevIndex] = useState(0);
    
    useEffect(()=>{
        const interval = setInterval(()=>{        
          setIndex(index=>{
            if (index==sliderImages.length-1) return 0;
            else return index+1;
          });         
        },5000)
  
        return ()=>{
          clearInterval(interval)
        };
      },[]);
  
      useEffect(()=>{
        setPrevIndex(prevIndex=>{
          if (index==0) return sliderImages.length-1;
          else return index-1;
        })
      },[index])

    const contextValue : SlideShowContextInterface = {index,setIndex,prevIndex,setPrevIndex,sliderImages};

    return (
    <slideShowContext.Provider value={contextValue}>
        {children}
    </slideShowContext.Provider>
  )
}
