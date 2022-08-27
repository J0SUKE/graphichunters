import React, { useRef } from 'react'
import {BoxProps} from '../types/BoxProps'
 
interface cursorContextInterface {
    CursorRef:React.RefObject<HTMLDivElement> | null
}

export const cursorContext = React.createContext<cursorContextInterface | null>(null);


export default function CursorProvider(props:BoxProps) {
    
    const CursorRef = useRef<HTMLDivElement>(null);  

    const contextValue:cursorContextInterface = {
        CursorRef:CursorRef
    }
    
    return (
    <cursorContext.Provider value={contextValue}>
        {props.children}
    </cursorContext.Provider>
  )
}
