import React, { useState } from 'react';
import { Button, Input } from 'antd';
import axios from 'axios';
const UserFrom = () =>  {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassWord] = useState("");
    const [phone, setPhone] = useState("");

    const handleClickBtn =()=>{
        // console.log('check state',{fullName,email,passWord,address})
        const url_backend = 'http://localhost:8080/api/v1/user';
        const data ={
            fullName: fullName,
            email: email,
            password: password,
            phone: phone
        }
        axios.post(url_backend, data)
        // alert("Them thanh cong")
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