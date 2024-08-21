import {useState,useEffect} from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"


function App() {

  const[todos, setTodos]= useState([  ])
  const[todoValue, setTodoValue]= useState('')


  function persistData(newList){
    localStorage.setItem('todos', JSON.stringify({todos:newList}))
  }
  function handleAddTodos(newTodo)
  {
    const newTodoList=[...todos, newTodo]
    console.log("newTodo")
    console.log(newTodo)
    console.log("newTodoList")
    console.log(newTodoList)
    setTodos(newTodoList)
    persistData(newTodoList);
  }

  function handleDeleteTodo(index)
  {
  const newTodoList=todos.filter(
  (todo, todoIndex)=>{
  return todoIndex!==index;
  persistData(newTodoList);
})
setTodos(newTodoList);
}

  function handleEditTodo(index)
  {
    const valueToBeEdited=todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);
    persistData(newTodoList);
  }

  useEffect(()=>{if (!localStorage)
  {
    return;
  }
  let localTodos = localStorage.getItem('todos')
  if(!localTodos)
  {
  return;
  }
  localTodos=JSON.parse(localTodos).todos
  setTodos(localTodos);
  },[])

  return (
    <>
     <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
     <TodoList handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo} todos={todos}/>

    </>
  )
}

export default App
