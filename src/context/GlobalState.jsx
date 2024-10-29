import {createContext, useContext} from 'react'

export const Context = createContext();

export const useGlobalState = () => {
    const context = useContext(Context)
    return context
}


export const GlobalProvider = ({children}) => {
    return <Context.Provider value={{total: 100}}>
        {children}
    </Context.Provider>
};