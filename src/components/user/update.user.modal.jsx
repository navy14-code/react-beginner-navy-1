import { useEffect, useState } from "react";
import { Input, notification, Modal } from 'antd';
import { updateUserAPI } from "../../services/api.service";

const UpdateUsersModel = (props) => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const {isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate,loadUser} = props;

    useEffect(()=>{
        console.log('check data props', dataUpdate)
        if(dataUpdate){
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }
    },[dataUpdate])

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setId("");
        setFullName("");
        setPhone("");
        setDataUpdate(null);
    };
    const handleSubmitBtn = async()=>{
        const res = await updateUserAPI(id,fullName,phone)
        if(res.data){
            notification.success({
            message: `Update user`,
            description: `Update success`
            
        })
        resetAndCloseModal();
        await loadUser();
        }
        else{
            notification.error({
                message:`Fail`,
                description: JSON.stringify(res.message)
            })
        }
    }

    return (
        <Modal title="Update User" 
        open={isModalUpdateOpen} 
        onOk={()=> handleSubmitBtn()}
        onCancel={()=>resetAndCloseModal()}
        maskClosable={false}
        okText={'Save'}
         >
    <div style={{display:'flex', gap:'15px', flexDirection:'column'}}>
    <div>
            <span>Id</span>
            <Input
            value={id}
            disabled
            />
        </div>
    <div>
            <span>Fullname</span>
            <Input
            value={fullName}  
            onChange={(event)=>{setFullName(event.target.value)}} />
        </div>
        <div>
            <span>Phone</span>
            <Input
            value={phone}
            onChange={(event)=>{setPhone(event.target.value)}}
            />
        </div>
    </div>

    </Modal>
    )
}
export default UpdateUsersModel