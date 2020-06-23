import { combineReducers } from 'redux';
import jwt from './JWT';
import form from './Form';



const reducer = combineReducers({
    jwt,
    form
});

export default reducer;