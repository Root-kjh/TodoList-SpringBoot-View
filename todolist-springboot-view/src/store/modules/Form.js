const CHANGE_FORM = 'ModalAction/CHANGE_FORM';

const SIGNIN_FORM = 'SigninForm';
const SIGNUP_FORM = 'SignupForm';

export const changeForm = formClass => ({type: CHANGE_FORM, formClass });

const initialState = SIGNIN_FORM;

export default function form(state = initialState, action) {
    switch (action.type) {
        case CHANGE_FORM:
            return action.formClass;        
        default:
            return state;
    }
}