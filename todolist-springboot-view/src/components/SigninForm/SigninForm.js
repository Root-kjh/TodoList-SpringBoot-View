import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SigninForm=()=>(
    <form id="signinForm">
        <TextField id="standard-basic" label="ID"/>
        <TextField 
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"/>
        <div id="formButtonGroup">
            <Button variant="contained" color="primary">
            Signin
            </Button>                  
            <Button variant="contained">Signup</Button>
        </div>
    </form>
)

export default SigninForm;