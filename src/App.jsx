import { useEffect, useState } from "react"
import "./App.css"
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";



export default function App(){
  // adding a font to the jsx file
  const monospace_TextStyle = {
    fontFamily: 'monospace',
  };

  // important
  const [todos, setTodos]= useState(()=> {
    const localValue= localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEM", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
            setTodos(currentTodos => {
          return [
            ...currentTodos, 
            { id: crypto.randomUUID(), title, completed:
        false}]
          })
  }


  
  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id){
          // retrun a new updated checked
          return {...todo, completed}
        }

        return todo
      })
    })
  }

  function deleteTodo(id){
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id!== id)
    })
  }

  return (
    // fragment - to return multiple elements
    <>
    

    
  
    <h1 className="typing-effect">Hello!</h1>

    <NewTodoForm onSubmit= {addTodo}/>
    <h1 className="header"> Todo List</h1>
  
    <TodoList todos= {todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
  </>
  
  )
}
