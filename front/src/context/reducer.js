export const initialState = {
    prizivniki:[],
    armiya:[],
    prizivnik:[],
    buys:[[]],
};

export function reducer(state, action) {
    switch (action.type) {
        case 'GET_PRIZIVNIKI':
            return {
                prizivniki: action.payload
            }
        case 'GET_PRIZIVNIK':
            return {
                prizivnik: action.payload
            }
        case 'GET_ARMIYA':
            return {
                armiya: action.payload
            }
        case 'GET_PURCHASES':
            return {
                purchases: action.payload
            }
        case 'GET_PURCHASE':
            return {
                purchases: action.payload
            }
        case 'GET_BUYS':
            return {
                buys: action.payload
            }
        default:
            return state
    }
}