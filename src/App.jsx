import React, {Fragment, useState, useRef, useEffect} from 'react';
import { TodoList } from './components/TodoList';
import {v4 as uuidv4} from 'uuid';

const KEY = 'todoAp.todos';

export function App (){

    const todoTaskRef = useRef();
    const [todos, setTodos] = useState([])

    useEffect(() => { //TODO:aca traemos los datos desde el localStorage 
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if(storedTodos){ //TODO:validamos si hay algo en el localStorage
            setTodos(storedTodos)
        }
    }, [])

    useEffect(() => {//TODO:guardamos los datos en el localStorage
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos])

    const toggleTodo = (id) => { //TODO:funcion para cambiar el estado del completed que cambia el checkbox
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    const handleTodoAdd = () => { //TODO:funcion para guardar una nueva nota
        const task = todoTaskRef.current.value; //TODO:por medio del hooks 'useRef' podemos tener acceso al input
                                                //y en este caso ver cual es su valor con 'value'
        if(task === '') return;  

        setTodos((prevTodos) => {
            return [...prevTodos, {id: uuidv4(), task, completed: false}];
        });

        todoTaskRef.current.value = null;
        todoTaskRef.current.focus();
    }

    const handleClearAll = () =>{//TODO:funcion para eliminar las tareas que ya estan el ckekbox completado 
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);

        todoTaskRef.current.focus();
    }

    return (
    ///TODO: le enviamos los props al componente 'TodoList' con el nombre todos
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