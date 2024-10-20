import '../todo/todo.css';
import TodoNew from '../todo/TodoNew';
import TodoData from '../todo/TodoData';
import { useState } from 'react';
import reactLogo from '../../assets/react.svg';
    const TodoApp = () => {
    //random id
    const randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    //delete
    const DeleteById =(id)=>{
        const newTodo = todoList.filter(item => item.id !== id)
        setTodoList(newTodo);

    }
    const [todoList,setTodoList] = useState([

    ])
    const addNewTodo = (name) =>{
      const newTodo ={
        id :randomIntFromInterval(1, 100), 
        name: name
      }
      setTodoList([...todoList, newTodo])
    }
    return(
        <>
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
        <img src={reactLogo} className='logo' />
       </div>
    }
      </div>
      </>
    );


};

export default TodoApp;