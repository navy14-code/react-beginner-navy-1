import { Button, Descriptions, Drawer, message, notification, Upload } from "antd"
import { useState } from "react";
import { handleUploadFile, updateAvatarUserAPI } from "../../services/api.service";
import { json } from "react-router-dom";

const ViewUserDetail = (props) => {

    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen,
        loadUser
    } = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleOnChange = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
        console.log('check file', preview)
    }

    const handleUpdateUserAvatar = async () => {
        const resUpload = await handleUploadFile(selectedFile, 'avatar');
        console.log('check', resUpload)
        if (resUpload.data) {
            //susses
            const newAvatar = resUpload.data.fileUploaded;

            const resUpdateAvatar = await updateAvatarUserAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone);

            if (resUpdateAvatar.data) {
                setIsDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadUser();


                notification.success({
                    message: 'Upload avatar',
                    description: 'Update avatar success'
                })
            } else {
                notification.error({
                    message: 'Error upload avatar',
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }

        } else {
            //failed
            notification.error({
                message: 'Error upload file',
                description: JSON.stringify(resUpload.message)
            })
        }
    }
    return (
        <Drawer
            width={`40vw`}
            title="Detail Users"
            onClose={() => {
                setDataDetail(null);
                setIsDetailOpen(false);
            }}
            open={isDetailOpen}
        >
            {dataDetail ?
                <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div
                            style={{
                                textAlign: 'center',
                                marginTop: '10px',
                                height: '200px', width: '200px',
                                border: '2px solid #ccc'
                            }}>
                            <img
                                style={{ height: '200px', width: '200px', objectFit: 'contain' }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                        </div>
                        <div style={{ flex: '2', paddingLeft: '50px' }}>
                            <p>Id : {dataDetail._id}</p>
                            <br />
                            <p>Full name : {dataDetail.fullName}</p>
                            <br />
                            <p>Email : {dataDetail.email}</p>
                            <br />
                            <p>Phone : {dataDetail.phone}</p>
                            <br />
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <label htmlFor="btnUpload" style={{
                            cursor: 'pointer',
                            background: 'gold',
                            display: 'block',
                            marginTop: '15px',
                            padding: '5px 10px',
                            width: "fit-content",
                            borderRadius: '5px'
                        }}>
                            Upload Avatar
                        </label>
                        <input
                            onChange={(event) => { handleOnChange(event) }}
                            type="file" hidden id="btnUpload" name="myfile"></input>
                        {preview &&
                            <div>
                                <div
                                    style={{
                                        marginTop: '10px',
                                        marginBottom: '15px',
                                        height: '30%',
                                        width: '30%'
                                    }}>
                                    <img
                                        style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                                        src={preview} />
                                </div>
                                <Button type="primary"
                                    onClick={() => { handleUpdateUserAvatar() }}
                                >Save</Button>
                            </div>
                        }
                    </div>
                </>
                :
                <>
                    <p>Not data</p>
                </>
            }
        </Drawer>
    )
}
export default ViewUserDetail