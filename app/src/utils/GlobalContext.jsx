import {useState, createContext} from 'react';

const DragContext = createContext();

export function DragProvider({children}) {
    const [isDragging, setIsDragging] = useState(false);
    return (
        <DragContext.Provider value={{isDragging, setIsDragging}}>
            {children}
        </DragContext.Provider>
    )
}

export default DragContext;