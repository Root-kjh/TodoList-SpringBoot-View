const CHANGE_USERINFO = 'USERINFO/CHANGE_USERINFO';
const SET_USERINFO = 'USERINFO/SET_USERINFO';
const DROP_USERINFO = 'USERINFO/DROP_USERINFO'

export const change_userinfo = nickName => ({type: CHANGE_USERINFO, nickName });
export const set_userinfo = (userName, nickName) => ({type: SET_USERINFO, userName, nickName});
export const drop_userinfo = () => ({type: DROP_USERINFO});


const initialState = null;

export default function userInfo(state = initialState, action) {
    switch (action.type) {
        case CHANGE_USERINFO:
            return {
                ...state,
                nickName : action.nickName
            };    
        case SET_USERINFO:
            return {
                userName : action.userName,
                nickName : action.nickName
            }
        case DROP_USERINFO:
            return null;
            
        default:
            return state;
    }
}