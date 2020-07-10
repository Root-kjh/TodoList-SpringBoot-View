import React, {useState, useEffect} from 'react';
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
    const [title, setTitle] = useState(props.title);
    const [context, setContext] = useState(props.context);
    const [isTitleFocus, setisTitleFocus] = useState(false);
    const [isContextFocus, setIsContextFocus] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const deleteTodo = () => {
        axios.get('http://todo-list.kro.kr:8080/todolist/todo/delete?todoIdx='+props.idx,{
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

    const editTodo = () => {
        axios.post('http://todo-list.kro.kr:8080/todolist/todo/update',{
            idx: props.idx,
            newTitle: title,
            newContext: context
        },{
            headers: {
                "X-AUTH-TOKEN": jwt
            }
        }).then(() => {
            setIsEdit(false);
            setisTitleFocus(false);
            setIsContextFocus(false);
        }).catch(error => {
            try {
                const errorCode = error.response.status;
                if (errorCode===403){
                    alert("비정상적 접근 감지");
                    dispatch(drop_jwt());
                }
                if (errorCode===405){
                    alert("좋지 못한 입력값");
                }
            } catch (error) {
                console.log(error);
            }
        })
    }

    useEffect(() => {
        if (isEdit){
            if (isTitleFocus){
                document.querySelector("#todoEditBox > div > h2 > .title").focus();
            }
            if (isContextFocus){
                document.querySelector("#todoEditBox > div > p > .context").focus();
            }
        }
    }, [isEdit])

    const todoBox = (
        <Grid item xs className="todo">
            <Paper>
                <DeleteIcon className="deleteIcon" onClick={deleteTodo}/>
                <Typography 
                    variant="h5" 
                    component="h2" 
                    onClick={() => {setIsEdit(true); setisTitleFocus(true)}}>
                    {title}
                </Typography>
                <Typography 
                    variant="body2" 
                    component="p" 
                    onClick={() => {setIsEdit(true); setIsContextFocus(true)}}>
                    {context}
                </Typography>
            </Paper>
        </Grid>
    );

    const todoEditBox = (
        <Grid item xs className="todo" id="todoEditBox">
            <Paper>
                <DeleteIcon className="deleteIcon" onClick={() => deleteTodo(props.idx)}/>
                <Typography variant="h5" component="h2">
                    <input 
                        type="text" 
                        value={title} 
                        className="title" 
                        onBlur={() => editTodo()} 
                        onChange={e => setTitle(e.target.value)} 
                        name="title"/>
                </Typography>
                <Typography variant="body2" component="p">
                    <textarea 
                        value={context} 
                        onChange={e => setContext(e.target.value)} 
                        onBlur={() => editTodo()} 
                        className="context" 
                        name="context"/>
                </Typography>
            </Paper>
        </Grid>
    );

    return (
        <div>
            {isEdit
            ? todoEditBox
            : todoBox}
        </div>
    );
}

export default TodoBox;