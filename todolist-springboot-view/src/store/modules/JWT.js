const SET_JWT = 'JWTAction/SET_JWT';
const DROP_JWT = 'JWTAction/DROP_JWT';

export const change_jwt = jwt => ({type: SET_JWT, jwt});
export const drop_jwt = () => ({type: DROP_JWT});

const initialState = null

export default function jwt(state = initialState, action) {
    switch (action.type) {
        case SET_JWT:
            return action.jwt;
        case DROP_JWT:
            return null;
        default:
            return state;
    }
}