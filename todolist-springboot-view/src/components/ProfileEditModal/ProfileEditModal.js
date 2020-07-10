import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { change_jwt } from '../../store/modules/JWT';
import { set_userinfo } from '../../store/modules/UserInfo';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../../Resources/css/ProfileModal.css';

const ProfileEditModal = props => {
    const dispatch = useDispatch();
    const jwt = useSelector(state => state.jwt, []);
    const userInfo = useSelector(state => state.userInfo, [])

    const [userName,setUserName] = useState(userInfo.userName);
    const [nickName,setNickName] = useState(userInfo.nickName);

    const handleClose = () => {
        props.setProfileModalIsOpen(false);
    }

    const passwordRetryCheck = () => {
        return document.getElementsByName("newPassword")[0].value===
        document.getElementsByName("newPasswordRetry")[0].value
    }

    const changePassword = () => {
        if (passwordRetryCheck) {
            var bodyFormData = new FormData();
            bodyFormData.set('newPassword',document.getElementsByName("newPassword")[0].value);
            axios.post('http://todo-list.kro.kr:8080/todolist/user/modify_password',bodyFormData,{
                headers:{
                    "X-AUTH-TOKEN": jwt
                }
            }).then(() => {
                alert("패스워드 재설정 성공");
                document.getElementsByName("newPassword")[0].value='';
                document.getElementsByName("newPasswordRetry")[0].value='';
            }).catch(error => {
                console.log(error);
            });
        } else{
            alert ("패스워드가 맞지 않음");
        }
    }

    const updateUserInfo = () => {
        const newUserName = document.getElementsByName("userName")[0].value;
        const newNickName = document.getElementsByName("nickName")[0].value
        axios.post('http://todo-list.kro.kr:8080/todolist/user/update_user_info',{
            newUserName: newUserName,
            newNickName: newNickName
        },{
            headers:{
                "X-AUTH-TOKEN": jwt
            }
        }).then(response => {
            dispatch(set_userinfo(newUserName,newNickName));
            dispatch(change_jwt(response.data));
            alert("회원정보 수정 완료");
        }).catch(error => {
            try {
                const errorCode = error.response.status;
                if (errorCode===406){
                    alert("이미 존재하는 UserName");
                } else if (errorCode===405){
                    alert("좋지 못한 입력값");
                }
            } catch {
                console.log(error);
            }
        })
    }

    return(
        <Modal
        id="profileModal"
        open={props.profileModalIsOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
          <form>
            <TextField id="standard-basic" label="UserName" onChange={e => setUserName(e.target.value)} value={userName} name="userName" />
            <TextField id="standard-basic" label="NickName" onChange={e => setNickName(e.target.value)} value={nickName} name="nickName" />
            <TextField
            id="standard-password-input"
            label="NewPassword"
            type="password"
            name="newPassword"
            autoComplete="current-password"
            />
            <TextField
            id="standard-password-input"
            label="NewPasswordRetry"
            type="password"
            name="newPasswordRetry"
            autoComplete="current-password"
            />
            <Button variant="contained" onClick={changePassword}>ChangePassword</Button>
            <Button variant="contained" onClick={updateUserInfo}>Save</Button>
          </form>
      </Modal>
    )
};



export default ProfileEditModal;