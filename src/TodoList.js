import React from 'react'
import Todo from './Todo'


export default function TodoList({todoProp, toogleTodo}) {
  return (
    todoProp.map(todo => {
        return <Todo key={todo.id} toogleTodo={toogleTodo} todo ={todo}/>
    })

  )
}
