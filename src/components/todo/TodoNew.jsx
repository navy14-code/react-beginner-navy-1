import { useState } from "react";
const TodoNew = (props) => {
    //useState hook (gettet/setter)
    // const valueinput ='Nam';
    const[valueinput,setValueInput] = useState("Nam")

    const{addNewTodo} = props;

const handleClick = () => {
    addNewTodo(valueinput);
    setValueInput("");
}
const handleOnChange = (name) => {
    setValueInput(name);
}

    return (
        <>
        <div className="todo-new">
            <input type="text"
            onChange={(event) =>{handleOnChange(event.target.value)}}
            value={valueinput} />
            <button 
            style={{cursor :`pointer`}}
            onClick={handleClick}>
            Add</button>

        </div>
        </>
       
    )
}

export default TodoNew;