import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import '../../Resources/css/TodoBox.css';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { drop_jwt } from '../../store/modules/JWT';
import { useDispatch } from 'react-redux';

const TodoBox = (props) => {
    const dispatch = useDispatch();
    const jwt = useSelector(state => state.jwt, []);

    const deleteTodo = (idx) => {
        axios.get('http://localhost:8080/todolist/todo/delete?todoIdx='+idx,{
            headers : {
                "X-AUTH-TOKEN": jwt
            }
        })
        .then(() => props.setTodoEventFlag(!props.todoEventFlag))
        .catch(error => {
            try {
                if (error.response.status===403){
                    alert("비정상적 접근 감지");
                    dispatch(drop_jwt());
                }
            } catch (error) {
                console.log(error);
            }
        })
    }

    return(
        <Grid item xs className="todo">
            <Paper>
                <DeleteIcon className="deleteIcon" onClick={() => deleteTodo(props.idx)}/>
                <Typography variant="h5" component="h2">
                    {props.title}
                </Typography>
                <Typography variant="body2" component="p">
                    {props.context}
                </Typography>
            </Paper>
        </Grid>
    );
}

export default TodoBox;