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
    fetch('http://127.0.0.1:8000/prizivniki/')
        .then(response => response.json())
        .then(data => {
          dispatch({type: 'GET_PRIZIVNIKI', payload: data});
        })
  }, [])
  return state.prizivniki
}

export function GetPrizivnik(priziv_id) {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/prizivniki/${priziv_id}/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                dispatch({type: 'GET_PRIZIVNIK', payload: data});
            })
    }, [])
    return state.prizivnik
}

export function GetArmiya() {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/cart/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                dispatch({type: 'GET_ARMIYA', payload: data});
            })
    }, [])
    return state.armiya
}

export function GetPurchases() {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/sells/`)
            .then(response => response.json())
            .then(data => {
                dispatch({type: 'GET_PURCHASES', payload: data});
            })
    }, [])
    return state.purchases
}

export function GetPurchase(user) {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/sells/?id_user=${user}`)
            .then(response => response.json())
            .then(data => {
                dispatch({type: 'GET_PURCHASE', payload: data});
            })
    }, [])
    return state.purchases
}

export function GetBuys() {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/status_info/`, {
            headers: {
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                dispatch({type: 'GET_BUYS', payload: data[0]});
            })
    }, [])
    return state.buys
}

