import React, { useState } from 'react';
import SigninForm from '../SigninForm/SigninForm';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';

const [pageClass, setPageClass] = useState("SigninForm");

const SigninModal=()=>(
    <Grid item xs id="signinModal">
        <Paper>
            {(pageClass==="SigninForm")?<SigninForm/>:"Test"}
        </Paper>
    </Grid>
)

export default SigninModal;