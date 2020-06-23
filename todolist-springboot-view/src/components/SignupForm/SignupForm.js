import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { changeForm } from '../../store/modules/Form';
import { useDispatch } from 'react-redux';
import axios from 'axios';
const SignupForm = () => {
    const dispatch = useDispatch();

    const changeSigninForm = () => {
        dispatch(changeForm('SigninForm'))
    }

    const signup = () => {
        axios.post('localhost:8080')
    }

    return (
        <form id="signupForm">
            <TextField label="ID"/>
            <TextField label="NickName"/>
            <TextField 
                    label="Password"
                    type="password"
                    autoComplete="current-password"/>
            <TextField 
                    label="Password Retry"
                    type="password"
                    autoComplete="current-password"/>
            <div id="formButtonGroup">
                <Button variant="contained" color="primary">
                Signup
                </Button>                  
                <Button variant="contained" 
                    onClick={ changeSigninForm }>
                        Signin
                </Button>
            </div>
        </form>
    );
};

export default SignupForm;;