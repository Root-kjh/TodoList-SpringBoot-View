import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { drop_jwt } from '../../store/modules/JWT';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import '../../Resources/css/TodoListForm.css';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';

const TodolistForm = (props) => {
    const dispatch = useDispatch();
    const jwt = useSelector(state => state.jwt, []);
    
    const addTodo = () => {
        axios.post('http://todo-list.kro.kr:8080/todolist/todo',{
            title : document.getElementsByName("title")[0].value,
            context : document.getElementsByName("context")[0].value
        },{
            headers:{
                "X-AUTH-TOKEN": jwt
            }
        })
        .then(() => {
            document.getElementsByName("title")[0].value='';
            document.getElementsByName("context")[0].value='';
            props.setTodoEventFlag(!props.todoEventFlag);
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

    return (
        <Grid item xs id="TodoForm">
        <Paper>
            <form>
                <TextField id="outlined-basic" label="Title" variant="outlined" name="title" />
                <TextField id="standard-basic" label="Context" name="context" /><br></br>
                <Button variant="contained" color="primary" onClick={addTodo}>AddTodo</Button>
            </form>
        </Paper>
    </Grid>
    );
};

export default TodolistForm;