import React, {useState, useEffect} from 'react';
import TodolistForm from '../TodolistForm/TodolistForm';
import TodoBox from '../TodoBox/TodoBox'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { drop_jwt } from '../../store/modules/JWT';
import { useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

const TodolistModal=()=>{
    const dispatch = useDispatch();
    const jwt = useSelector(state => state.jwt, []);
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [todoEventFlag, setTodoEventFlag] = useState(false);

    const getTodoList = async() => {
        const response = await axios.get('http://todo-list.kro.kr:8080/todolist/todo',{
            headers:{
                "X-AUTH-TOKEN": jwt
            }
        });
        return response;
    };

    useEffect(() => {
        setIsLoading(true);
        getTodoList()
            .then(response => {
                setTodoList(response.data);
            })
            .catch(error => {
                if (error.response.status===403){
                    alert("비정상적 접근 감지");
                    dispatch(drop_jwt());
                } else
                    console.log(error);
            });
            setIsLoading(false);
        },[todoEventFlag]);
    
    return (
        <div>
            <TodolistForm setTodoEventFlag={setTodoEventFlag} todoEventFlag={todoEventFlag}/>
            {
                todoList?
                todoList.map(todo => {
                    return <TodoBox key={todo.idx} idx={todo.idx} title={todo.title} context={todo.context} setTodoEventFlag={setTodoEventFlag} todoEventFlag={todoEventFlag} />
                }):null
            }
            {
                isLoading?
                    <CircularProgress />:null
            }
        </div>
    );
};

export default TodolistModal;