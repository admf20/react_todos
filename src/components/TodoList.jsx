import React from 'react'
import { TodoItem } from './TodoItem'

export function TodoList({todos, toggleTodo}) {
    return (
        <ul>
            {todos.map((todo) => (///TODO: al recibir el props en el cual estan llamados como 'todos' desde App hacemos un mapeo y se lo 
                                 //pasamos el componente 'TodoItem'
                <TodoItem 
                    key={todo.id}
                    todo={todo}
                    toggleTodo={toggleTodo} 
                />
            ))}
        </ul>
    )
}
