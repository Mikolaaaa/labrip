export const initialState = {
    prizivniki:[],
    cart:[],
};

export function reducer(state, action) {
    switch (action.type) {
        case 'GET_DATA':
            return {
                prizivniki: action.payload
            }
        case 'GET_PRIZIV':
            return {
                prizivniki: action.payload
            }
        case 'GET_CART':
            return {
                cart: action.payload
            }
        default:
            return state
    }
}