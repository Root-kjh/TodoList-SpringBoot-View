import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import '../../Resources/css/UserEditButton.css';
import { drop_jwt } from '../../store/modules/JWT';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';

const UserEditButton = props => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const jwt = useSelector(state => state.jwt, []);

    const logout = () => {
        dispatch(drop_jwt());
        setAnchorEl(null);
    }

    const withdraw = () => {
        var bodyFormData = new FormData();
        const password = prompt("패스워드를 입력해주세요.");
        bodyFormData.set('password',password);

        axios.post('http://localhost:8080/todolist/user/withdraw',bodyFormData,{
            headers: {
                "X-AUTH-TOKEN": jwt
            }
        })
        .then(() => {
            alert("회원탈퇴 완료");
            logout();
        })
        .catch(error => {
            try{
                if (error.response.status===403){
                    alert("비정상적 접근 감지");
                    dispatch(drop_jwt());
                }
            } catch {
                console.log(error);
            }
        })
    }

    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
    setAnchorEl(null);
    };
    return(
        <div id="userEditButton">
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            {props.nickName}님
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
            <MenuItem onClick={withdraw}>Withdraw</MenuItem>
        </Menu>
        </div>
    )
};



export default UserEditButton;