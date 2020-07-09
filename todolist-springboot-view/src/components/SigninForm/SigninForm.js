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
        axios.post('http://localhost:8080/todolist/auth/signin',{
            userName : userName,
            password : password
        },{
            headers:{
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {
            const jwt = response.data;
            axios.get('http://localhost:8080/todolist/user/get_user_info',{
                headers:{
                    "X-AUTH-TOKEN": jwt
                }
            }).then(res => {
                const userName = res.data.userName;
                const nickName = res.data.nickName;
                dispatch(set_userinfo(userName,nickName));
                dispatch(change_jwt(jwt));
            }).catch(error => console.log(error));
        }).catch(error => {
            try{
                if (error.response.status===405)
                    alert("좋지 못한 입력값");
                else if (error.response.status===403)
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