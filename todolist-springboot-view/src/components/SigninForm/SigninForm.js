import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { changeForm } from '../../store/modules/Form';
import { useDispatch } from 'react-redux';

const SigninForm = () => {
    const dispatch = useDispatch();

    const changeSignupForm = () => {
        dispatch(changeForm('SignupForm'))
    }

    return (
        <form id="signinForm">
            <TextField label="ID"/>
            <TextField 
                    label="Password"
                    type="password"
                    autoComplete="current-password"/>
            <div id="formButtonGroup">
                <Button variant="contained" color="primary">
                Signin
                </Button>                  
                <Button variant="contained" 
                    onClick={ changeSignupForm }>
                        Signup
                </Button>
            </div>
        </form>
    );
};

export default SigninForm;