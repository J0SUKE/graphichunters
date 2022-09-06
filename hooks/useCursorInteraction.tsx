import React, { useContext, useEffect, useRef } from 'react'
import { cursorContext } from '../context/CursorContext';

export default function useCursorInteraction(className:string|undefined) {
    
    const nodeRef = useRef<HTMLElement>(null);

    const CURSORCONTEXT = useContext(cursorContext);
    
    useEffect(()=>{
        
        if (!className) return;

        nodeRef.current?.addEventListener('mouseenter',()=>{
            if (!CURSORCONTEXT?.CursorRef?.current) return;

            CURSORCONTEXT.CursorRef.current.classList.add(className);
        })
        
        nodeRef.current?.addEventListener('mouseleave',()=>{
            if (!CURSORCONTEXT?.CursorRef?.current) return;
            
            CURSORCONTEXT.CursorRef.current.classList.remove(className);
        })
      },[])


    return nodeRef;
}
