import React, { useState } from 'react'

interface menuContextInterface {
    menuIsOpen:boolean,
    setMenuIsOpen:React.Dispatch<React.SetStateAction<boolean>>
}

export const menuContext = React.createContext<menuContextInterface|null>(null);

export default function MenuContext({children}:{children:React.ReactNode}) {
  
    const [menuIsOpen,setMenuIsOpen] = useState(false);

    return (
    <menuContext.Provider value={{menuIsOpen,setMenuIsOpen} as menuContextInterface}>
        {children}
    </menuContext.Provider>
  )
}
