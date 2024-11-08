import React, { useState } from 'react';
import { Button, Input, message, notification, Modal } from 'antd';
import axios from 'axios';
import { createUserAPI } from '../../services/api.service';
const UserFrom = () =>  {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassWord] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleSubmitBtn = async()=>{
        const res = await createUserAPI(fullName,email,password,phone)
        if(res.data){
            notification.success({
            message: `Create user`,
            description: `Create success`
            
        })
        setIsModalOpen(false);
        }
        else{
            notification.error({
                message:`Fail`,
                description: JSON.stringify(res.message)
            })
        }

    }
    return(
        <>
    <div className="user-form" style={{margin:"10px 0" }}>
        <div style={{display: "flex", gap: "20px", flexDirection: "column"}}>
        <Modal title="Create Users" 
            open={isModalOpen} 
            okText={"CREATE"}
            onOk={()=>{handleSubmitBtn()}}
            maskClosable={false} 
            onCancel={()=>{setIsModalOpen(false)}}>
        <div style={{display:'flex', gap:'15px', flexDirection:'column'}}>
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
        </div>

        </Modal>
            <div style={{display:'flex', justifyContent:'space-between'}} >
                <h3>Table Users</h3>
                <Button type='primary'
                onClick={()=>setIsModalOpen(true)}> Create  </Button>
            </div>
        </div>
    </div>
    </>

    );
}
export default UserFrom;