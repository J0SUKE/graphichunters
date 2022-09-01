import React, { Children, useEffect } from 'react'
import { useRouter } from 'next/router';

export const historyContext = React.createContext(null);

export default function HistoryContext({children}:{children:React.ReactNode}) 
{  
    const router = useRouter();
    
    useEffect(()=>{
        console.log(router);        
    },[router])
  
    return (
    <historyContext.Provider value={null}>
        {children}
    </historyContext.Provider>
  )
}
