import './todo.css';
import { useState } from 'react';
const TodoApp = () => {
    const [todoList, setTodoList] = useState([
        { id: 1, name: "Learning React " },
        { id: 2, name: "Watching Youtube" }
    ])
    return(
        <div>
            
        </div>
    )
  
};

export default TodoApp;