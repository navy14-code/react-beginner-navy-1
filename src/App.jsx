import './components/todo/todo.css';
import TodoNew from './components/todo/TodoNew';
import TodoData from './components/todo/TodoData';
import { useState } from 'react';
import { Spin } from 'antd';
const App = () => {
  const [todoList,setTodoList] = useState([
  //  { id :1, name:"Name"},
  //  { id :2, name:"Age"},
  ])
  const addNewTodo = (name) =>{
    const newTodo ={
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
{todoList.length > 0 &&
<>
       <TodoData
       todoList ={todoList} />
       </>
       }
{todoList.length === 0 &&
       <div className='todo-image'>
        <img src={Spin} className='logo' />
       </div>
        }
      </div>
    </>
    
  )
}

export default App
