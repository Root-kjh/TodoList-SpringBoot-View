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

    const passwordRetryCheck = () => {
        return document.getElementsByName("password")[0].value===
        document.getElementsByName("password")[1].value
    }

    const signup = () => {
        if (passwordRetryCheck())
            axios.post('http://todo-list.kro.kr:8080/todolist/auth/signup',{
                userName : document.getElementsByName("userName")[0].value,
                nickName : document.getElementsByName("nickName")[0].value,
                password : document.getElementsByName("password")[0].value
            }).then(() => {
                alert("회원가입 성공");
                dispatch(changeForm('SigninForm'));
            }).catch(error => {
                const errorMessage = error.response.data.Message
                if (errorMessage==="User Exist")
                    alert("이미 존재하는 유저");
                else if (errorMessage==="Request Data Invalid")
                    alert("좋지 못한 입력값");
            });
        else{
            alert("패스워드가 맞지않음");
        }
    }

    return (
        <form id="signupForm">
            <TextField label="ID" name="userName"/>
            <TextField label="NickName" name="nickName"/>
            <TextField 
                    label="Password"
                    type="password"
                    name="password"
                    autoComplete="current-password"/>
            <TextField 
                    label="Password Retry"
                    type="password"
                    name="password"
                    autoComplete="current-password"/>
            <div id="formButtonGroup">
                <Button variant="contained" color="primary" onClick={ signup }>
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