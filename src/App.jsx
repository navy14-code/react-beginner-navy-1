import './components/todo/todo.css';
import TodoNew from './components/todo/TodoNew';
import TodoData from './components/todo/TodoData';
import { useState } from 'react';
const App = () => {
  const [todoList,setTodoList] = useState([
   { id :1, name:"Name"},
   { id :2, name:"Age"},
  ])
  const addNewTodo = (name) =>{
    const newTodo ={
      // id:4,

      id :randomIntFromInterval(1, 100), 
      name: name
    }
    setTodoList([...todoList, newTodo])
  }
  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return (
    <>
      <div className="todo-container">
        <div className="todo-title">Todo List</div>
      <TodoNew
      addNewTodo={addNewTodo}/>
       <TodoData
       todoList ={todoList} />
      </div>
    </>
    
  )
}

export default App
