const TodoData = (props) => {
    const { todoList } = props;
    console.log("check", todoList)

    return (
        <>
      
        <div className='todo-data'>
            {todoList.map((item, index)=>{
                console.log('check map',item,index)
                return(
                    <>
                    <div  className="todo-item">
                    <div>
                        {item.name}
                    </div>
                        <button>Del</button>
                    </div>
                    </>
                )
            })}
            <div>
            {JSON.stringify(props.todoList)}
        </div>
        </div>
        
     
        </>
    )
}

export default TodoData;