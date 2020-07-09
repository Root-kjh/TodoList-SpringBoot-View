import { combineReducers } from 'redux';
import jwt from './JWT';
import form from './Form';
import userInfo from './UserInfo';


const reducer = combineReducers({
    jwt,
    form,
    userInfo
});

export default reducer;