import { createContext, ReactNode, useState } from "react";

import { MovieIF, ContextIF } from '../Interface/Interface'



export const ViewContext = createContext<ContextIF>({
    viewData: undefined,
    setViewData: () => { }
})


export function ViewContextProvider({ children }: { children: ReactNode }) {
    const [viewData, setViewData] = useState<MovieIF>()
    return (
        <>
            <div style={{ backgroundColor: viewData ? 'red' : 'black', color: viewData ? 'black' : 'gray' }}>
                The Context : {viewData ? JSON.stringify(viewData.title) : 'No data available'}
            </div>
            <ViewContext.Provider value={{ viewData, setViewData }}>
                {children}
            </ViewContext.Provider>
        </>
    )
}