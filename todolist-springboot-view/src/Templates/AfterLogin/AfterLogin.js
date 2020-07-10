import React from 'react';
import { TodolistModal } from '../../components'
import { UserEditButton } from '../../components'
import '../../Resources/css/AfterLogin.css';
import { useSelector } from 'react-redux';

const AfterLogin=()=>{
    
    const nickName = useSelector(state => state.userInfo, []).nickName;
    
    return (
        <div id="root">
            <UserEditButton />
            <div id="todoArea">
                <TodolistModal/>
            </div>
        </div>
    );
};

export default AfterLogin;