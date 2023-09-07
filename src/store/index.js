import React, { useContext, createContext, useReducer, useCallback } from 'react'
import appReducer from './reducer'

const appContext = createContext()

const initialState = {
    categorizedItems: [],
    selectedItems: [],
    isLoading: false
}

function WithAppContext({ children, value }) {
    const [state, dispatch] = useReducer(appReducer, initialState)

    const appDispatch = useCallback((action) => {
        if (typeof action === 'function') {
            return action(dispatch)
        }
        dispatch(action)
    }, [dispatch])

    return (
        <appContext.Provider value={{ ...value, state, dispatch: appDispatch }}>
            {children}
        </appContext.Provider>

    )
}


const useAppContext = () => useContext(appContext)


export {
    WithAppContext,
    useAppContext
}