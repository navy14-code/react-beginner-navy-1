import React, { useState, } from 'react';
import { Button, Input, message, notification, Modal } from 'antd';
import axios from 'axios';
import { createUserAPI } from '../../services/api.service';
import Password from 'antd/es/input/Password';
const UserFrom = (props) => {
    const { loadUser } = props;

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
    };

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone)
        if (res.data) {
            notification.success({
                message: `Create user`,
                description: `Create success`

            })
            resetAndCloseModal();
            await loadUser();
        }
        else {
            notification.error({
                message: `Fail`,
                description: JSON.stringify(res.message)
            })
        }
    }
    return (
        <>
            <div className="user-form" style={{ margin: "10px 0" }}>
                <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
                    <Modal title="Create Users"
                        open={isModalOpen}
                        onOk={() => handleSubmitBtn()}
                        onCancel={() => resetAndCloseModal()}
                        maskClosable={false}
                    >
                        <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
                            <div>
                                <span>Fullname</span>
                                <Input
                                    value={fullName}
                                    onChange={(event) => { setFullName(event.target.value) }}
                                    onKeyDown={(event) => { if (event.key === "Enter") handleSubmitBtn() }}
                                />
                            </div>
                            <div>
                                <span>Email</span>
                                <Input
                                    value={email}
                                    onChange={(event) => { setEmail(event.target.value) }}
                                    onKeyDown={(event) => { if (event.key === "Enter") handleSubmitBtn() }}
                                />
                            </div>
                            <div>
                                <span >Password</span>
                                <Input.Password
                                    value={password}
                                    onChange={(event) => { setPassword(event.target.value) }}
                                    visibilityToggle={true}
                                    onKeyDown={(event) => { if (event.key === "Enter") handleSubmitBtn() }}
                                />
                            </div>
                            <div>
                                <span>Phone</span>
                                <Input
                                    value={phone}
                                    onChange={(event) => { setPhone(event.target.value) }}
                                    onKeyDown={(event) => { if (event.key === "Enter") handleSubmitBtn() }}
                                />
                            </div>
                        </div>

                    </Modal>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <h3>Table Users</h3>
                        <Button type='primary'
                            onClick={() => setIsModalOpen(true)}> Create  </Button>
                    </div>
                </div>
            </div>
        </>

    );
}
export default UserFrom;