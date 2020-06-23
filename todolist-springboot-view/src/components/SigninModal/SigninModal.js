import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import SigninForm from '../SigninForm/SigninForm';
import SignupForm from '../SignupForm/SignupForm';

const SigninModal = () => {
    const formClass = useSelector(state => state.form, []);
    
    return (
        <Grid item xs id="signinModal">
            <Paper>
                {formClass==='SigninForm'? <SigninForm/> : <SignupForm/>}
            </Paper>
        </Grid>
    );
};

export default SigninModal;