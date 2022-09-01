import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router';

interface historyContextInterface {
    [name:string]:any
}

export const historyContext = React.createContext<historyContextInterface | null>(null);

export default function HistoryContext({children}:{children:React.ReactNode}) 
{  
    const router = useRouter();
    const history = useRef<string[]>([]);

    useEffect(()=>{
        //console.log(router);   
        history.current.push(router.asPath);     
    },[router])
  
    return (
    <historyContext.Provider value={{history}}>
        {children}
    </historyContext.Provider>
  )
}
