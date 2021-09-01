import React, {Fragment, useState, useRef, useEffect} from 'react';
import { TodoList } from './components/TodoList';
import {v4 as uuidv4} from 'uuid';

const KEY = 'todoAp.todos';

export function App (){

    const todoTaskRef = useRef();
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if(storedTodos){
            setTodos(storedTodos)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos])

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if(task === '') return;

        setTodos((prevTodos) => {
            return [...prevTodos, {id: uuidv4(), task, completed: false}];
        });

        todoTaskRef.current.value = null;
    }

    const handleClearAll = () =>{
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    }

    return (
    <Fragment>
        <TodoList todos={todos} toggleTodo={toggleTodo}/>
        <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
        <button onClick={handleTodoAdd}>➕</button>
        <button onClick={handleClearAll}>🗑</button>
        <div>
            Te quedan {todos.filter((todo) => !todo.completed).length} tareas 
            por terminar
        </div>
    </Fragment>
    )
}