import React, {useState, useRef, useEffect} from 'react';//usestate = * useRef = referrencing a variable * useEffect = side effect, example using local storage to save variables
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  //assigning usestate to a variable //usestate returns an array
  const [todos, setTodos] =  useState([]) 
  const todoNameRef = useRef()

  useEffect(() => { //this useEffect is for calling saved storage once
    const storedTodos = JSON.parse(localStorage.getItem
      (LOCAL_STORAGE_KEY)) //parsed by JSON to an array as it was a sting before
    if (storedTodos) setTodos(storedTodos)
  }, []) //to call once, we will pass in an empty array, since this is empty it will only call once


  //function within another function -- example, every time somthing changes, we want to call this first function
  useEffect(()=>{ // this useEffect is for saving
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)) //pass a unquie key and pass in a string
  }, [todos]) // to determine when we want to call this function, we'll pass an array of properties here. 
  //This array will be all of our dependancies, so any time anything in the array changes, we want to run the useEffect function
  //example, whenever the array of "todos" changes, we want to save our "todos" in the useEffect


  //creating a copy of the current state "todos"
  //assigning the copy to a new const
  //using the copy to find the state "todos" "id" so we can toogle a specific "todos"
  //toogling the boolean on and off
  //updating the setTodos 
  function toogleTodo(id) {
    const newTodos = [...todos] //produce a copy of our current todos, NEVER DIRECTLY MODIFY A STATE VARIABLE ALWAYS CREAT A COPY TO SET A NEW STATE
    const todo = newTodos.find(todo => todo.id === id) 
    todo.complete = !todo.complete
    setTodos(newTodos)

  }


  //creating an eventlistener on the "Add" button to listen for button click
  function handleAddTodo (e) {
    const name = todoNameRef.current.value
    if(name === '') return
    setTodos(prevTodos => { //using a previous value (aka prevtodo is a function call) 
      return [...prevTodos, {id: uuidv4(), name: name, complete: 
        false}]
    })
    todoNameRef.current.value = null // cleaaring our todo
  }

  function handleClearTodo() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }


  return ( //note: return only lets you return 1 thing -- to return 2 things, wrap the component into an empty element
    //wrapping 'todolist' and input tag into an empty element.
    //this empty element is called a fragment
    //allows us to return 1 thing, which is the fragment, which contains 2 things. 
    <> 
    <TodoList todoProp = {todos} toogleTodo={toogleTodo}/>
    <input ref= {todoNameRef} type="text"/>
    <button onClick={() => handleAddTodo ()}>Add</button>
    <button onClick={() => handleClearTodo ()}>clear</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
