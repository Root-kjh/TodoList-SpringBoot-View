import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { changeForm } from '../../store/modules/Form';
import { useDispatch } from 'react-redux';
import { change_jwt } from '../../store/modules/JWT';
import { set_userinfo } from '../../store/modules/UserInfo';
import axios from 'axios';

const SigninForm = () => {
    const dispatch = useDispatch();

    const changeSignupForm = () => {
        dispatch(changeForm('SignupForm'))
    }

    const signin = () => {
        const userName =  document.getElementsByName("userName")[0].value;
        const password = document.getElementsByName("password")[0].value;
        axios.post('http://todo-list.kro.kr:8080/todolist/auth/signin',{
            userName : userName,
            password : password
        },{
            headers:{
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {
            const jwt = response.data.jwt;
            const idx = response.data.userId;
            const userName = response.data.userName;
            const nickName = response.data.nickName;
            dispatch(set_userinfo(idx, userName,nickName));
            dispatch(change_jwt(jwt));
        }).catch(error => {
            try{
                const errorMessage = error.response.data.Message
                if (errorMessage==="Request Data Invalid")
                    alert("좋지 못한 입력값");
                else if (errorMessage==="Login Failed")
                    alert("아이디 혹은 패스워드가 틀림");
            } catch{
                console.log(error);
            }
        });
    }

    return (
        <form id="signinForm">
            <TextField label="ID" name="userName"/>
            <TextField 
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"/>
            <div id="formButtonGroup">
                <Button variant="contained" color="primary" onClick={ signin }>
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