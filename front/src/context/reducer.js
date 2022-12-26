export const initialState = {
    prizivniki:[],
    armiya:[],
    prizivnik:[],
    voencomati:[],
    komissari:[],
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
        case 'GET_VOENCOMATI':
            return {
                voencomati: action.payload
            }
        case 'GET_KOMISSAR':
            return {
                komissari: action.payload
            }
        case 'GET_BUYS':
            return {
                buys: action.payload
            }
        default:
            return state
    }
}