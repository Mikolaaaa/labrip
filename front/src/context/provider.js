import { useEffect, useReducer } from "react";

import { PrizivContext } from "./context";
import {reducer, initialState} from "./reducer"

export const PrizivProvider = ({ children }) => {
  const [users, dispatch] = useReducer(reducer, initialState)
  return (
    <PrizivContext.Provider value={[users, dispatch]}>
      {children}
    </PrizivContext.Provider>
  );
};

export function GetPriziv() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/prizivniki/', {
            method: 'GET',
            headers: {
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(data => {
          dispatch({type: 'GET_DATA', payload: data});
        })
  }, [])
  return state.prizivniki
}

export function GetPrizivnik(pk) {
    const [state, dispatch] = useReducer(reducer, initialState)
    let ID = window.location.pathname.split('/');
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/prizivniki/${ID[2]}/`, {
            method: 'GET',
            headers: {
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
        })
            .then(response => response.json())
            .then(data => {
                dispatch({type: 'GET_PRIZIV', payload: data});
            })
    }, [])
    return state.prizivniki
}

export function GetCart() {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch('http://127.0.0.1:8000/cart/', {
            method: 'GET',
            headers: {
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
        })
            .then(response => response.json())
            .then(data => {
                dispatch({type: 'GET_CART', payload: data});
            })
    }, [])
    return state.cart
}


