import { Alert } from "antd";

const TodoData = (props) => {
    const { todoList,DeleteById } = props;
    console.log("check", todoList)
    
    const DeleteClick= (id)=>{
        DeleteById(id)
    }

    return (
        <>
      
        <div className='todo-data'>
            {todoList.map((item, index)=>{
                console.log('check map',item,index)
                return(
                    <div  className="todo-item" key={item.id}>
                    <div>{item.name}</div>
                        <button 
                        style={{cursor :`pointer`}}
                        onClick={()=>DeleteClick(item.id)}
                        >Del</button>
                    </div>
                )
            })}

        </div>
        
     
        </>
    )
}

export default TodoData;