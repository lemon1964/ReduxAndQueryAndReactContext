import {createContext, useReducer} from 'react'
import {reducer} from './reducer'

export const ShopContext = createContext();

const initialState = {
    goods: [],
    loading: true,
    order: [],
    isBasketShow: false,
    altername: '',
};

export const ContextProvider = ({children}) => {
    const [value, dispatch] = useReducer(reducer, initialState);
    value.closeAlert = () => {
        dispatch({type: 'CLOSE_ALERT'});
    }

    value.AddBasket = (item) => {
        dispatch({type: 'ADD_BASKET', payload: item});
    }

    value.removeFromBasket = (itemID) => {
        dispatch({type: 'REMOVE_BASKET', payload: {id: itemID}});
    }

    value.incQuantity = (itemID) => {
        dispatch({type: 'INC_QUANTITY', payload: {id: itemID}});
    }

    value.decQuantity = (itemID) => {
        dispatch({type: 'DEC_QUANTITY', payload: {id: itemID}});
    }

    value.handleBasketShow = () => {
        dispatch({type: 'TOGGLE_BASKET'});
    }

    value.setGoods = (data) => {
        dispatch({type: 'SET_GOODS', payload: data});
    }
  

    return <ShopContext.Provider value={value}>
        {children}
        </ShopContext.Provider>
};

