import React from 'react'

export default function Todo({todo, toogleTodo}) {

  function handleTodoClick ()
  {
    toogleTodo(todo.id)
  }
  return (
    <div>
        <label>
            <input type="checkbox" checked={todo.complete} onChange=
            {handleTodoClick}/>
            {todo.name}
        </label>
    </div>
  )
}
