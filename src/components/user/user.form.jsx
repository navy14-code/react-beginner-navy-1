import React, { useState } from 'react';
import { Button, Input, message, notification } from 'antd';
import axios from 'axios';
import { createUserAPI } from '../../services/api.service';
const UserFrom = () =>  {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassWord] = useState("");
    const [phone, setPhone] = useState("");

    const handleClickBtn = async()=>{
        // try {
        const res = await createUserAPI(fullName,email,password,phone)
        // debugger
        if(res.data){
            notification.success({
            message: `Create user`,
            description: `Create success`
        })
        console.log('check res',res.data.data)
        }
        else{
            notification.error({
                message:`Fail`,
                description: JSON.stringify(res.message)
            })
        }
    
        // } catch (error) {
            
        // }
    }

    return(
    <div className="user-form" style={{margin:"30px 20px" }}>
        <div style={{display: "flex", gap: "20px", flexDirection: "column"}}>
            <div>
                <span>Fullname</span>
                <Input 
                onChange={(event)=>{setFullName(event.target.value)}} />
            </div>
            <div>
                <span>Email</span>
                <Input
                onChange={(event)=>{setEmail(event.target.value)}}
                />
            </div>
            <div>
                <span>Password</span>
                <Input
                onChange={(event)=>{setPassWord(event.target.value)}}
                />
            </div>
            <div>
                <span>Phone</span>
                <Input
                onChange={(event)=>{setPhone(event.target.value)}}
                />
            </div>
            <div>
                <Button type='primary'
                onClick={()=>handleClickBtn()}> Create  </Button>
            </div>
        </div>
    </div>

    );
}
export default UserFrom;