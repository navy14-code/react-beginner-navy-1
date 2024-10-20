import './components/todo/todo.css';
import TodoNew from './components/todo/TodoNew';
import TodoData from './components/todo/TodoData';
import { useState } from 'react';
import { Spin } from 'antd';
import Header from './components/layout/header';
import Footer from './components/layout/footer';

const App = () => {
  const [todoList,setTodoList] = useState([

  ])
  const addNewTodo = (name) =>{
    const newTodo ={
      id :randomIntFromInterval(1, 100), 
      name: name
    }
    setTodoList([...todoList, newTodo])
  }
  //random id
  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  //delete
  const DeleteById =(id)=>{
    const newTodo = todoList.filter(item => item.id !== id)
    setTodoList(newTodo);

  }
  return (
    <>
    <Header/>
   
      <div className="todo-container">
        <div className="todo-title">React by Namdeptrai</div>
      <TodoNew
      addNewTodo={addNewTodo}/>
{todoList.length > 0 ?
       <TodoData
       todoList ={todoList}
       DeleteById={DeleteById} />
:
       <div className='todo-image'>
        <img src={Spin} className='logo' />
       </div>
}
      </div>
      <Footer/>
    </>
    
  )
}

export default App
