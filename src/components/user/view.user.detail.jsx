import { Button, Drawer, Upload } from "antd"
import { useState } from "react";

const ViewUserDetail = (props) => {

    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen
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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div
                            style={{
                                flex: '1',
                                textAlign: 'center',
                                marginTop: '10px',
                                height: '100%', width: '100%',
                                border: '2px solid #ccc'
                            }}>
                            <img
                                style={{ height: '100%', width: '100%', objectFit: 'contain' }}
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
                        {/* <Button
                            type="primary"
                            style={{ textAlign: 'left', marginTop: '10px' }}>
                            Upload Avatar
                        </Button> */}
                        {preview &&
                            <div
                                style={{
                                    flex: '1',
                                    textAlign: 'center',
                                    marginTop: '10px',
                                    height: '30%', width: '30%',
                                    border: '2px solid #ccc'
                                }}>
                                <img
                                    style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                                    src={preview} />
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