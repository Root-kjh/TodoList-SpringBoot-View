import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import '../../Resources/css/UserEditButton.css';
import { drop_jwt } from '../../store/modules/JWT';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ProfileEditModal from '../ProfileEditModal/ProfileEditModal';

const UserEditButton = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const jwt = useSelector(state => state.jwt, []);
    const [profileModalIsOpen, setProfileModalIsOpen] = useState(false);
    const nickName = useSelector(state => state.userInfo, []).nickName;
    const userInfo = useSelector(state => state.userInfo, [])
    const logout = () => {
        dispatch(drop_jwt());
        handleClose();
    }

    const withdraw = () => {
        const password = prompt("패스워드를 입력해주세요.");

        axios.post('http://todo-list.kro.kr:8080/todolist/auth/signin',{
            userName : userInfo.userName,
            password : password
        },{
            headers:{
                "Access-Control-Allow-Origin": "*"
            }
        }).then(() => {
            axios.delete('http://todo-list.kro.kr:8080/todolist/user/'+userInfo.idx,{
                headers: {
                    "X-AUTH-TOKEN": jwt
                }
            })
            .then(() => {
                alert("회원탈퇴 완료");
                logout();
            })
            .catch(error => {
                if (error.response.status===403){
                    alert("비정상적 접근 감지");
                    dispatch(drop_jwt());
                }
            })
        }).catch(error => {
            try{
                const errorMessage = error.response.data.Message
                if (errorMessage==="Request Data Invalid")
                    alert("좋지 못한 입력값");
                else if (errorMessage==="Login Failed")
                    alert("패스워드 입력 오류");
            } catch{
                console.log(error);
            }
        });
    }

    const openProfileModal = () => {
        setProfileModalIsOpen(true);
        handleClose();
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
            {nickName}님
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={openProfileModal}>Profile</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
            <MenuItem onClick={withdraw}>Withdraw</MenuItem>
        </Menu>
        <ProfileEditModal profileModalIsOpen={profileModalIsOpen} setProfileModalIsOpen={setProfileModalIsOpen}/>
        </div>
    )
};



export default UserEditButton;