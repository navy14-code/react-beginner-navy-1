import { Button, Input, InputNumber, Modal, notification, Select } from "antd"
import { createBookAPI, handleUploadFile } from "../../services/api.service";
import { useState } from "react";

const CreateBookControl = (props) => {
    const { loadBook, isCreateOpen, setIsCreateOpen } = props;

    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const resetAndCloseModal = () => {
        setIsCreateOpen(false);
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setSelectedFile(null);
        setPreview(null);
    }
    const handleSubmitBtn = async () => {
        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "Vui lòng upload ảnh thumbnail"
            })
            return;
        }

        //step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "book");
        if (resUpload.data) {
            //success
            const newThumbnail = resUpload.data.fileUploaded;
            //step 2: create book
            const resBook = await createBookAPI(
                newThumbnail, mainText, author, price, quantity, category
            );

            if (resBook.data) {
                resetAndCloseModal()
                await loadBook();
                notification.success({
                    message: "Create book",
                    description: "Tạo mới book thành công"
                })

            } else {
                notification.error({
                    message: "Error create book",
                    description: JSON.stringify(resBook.message)
                })
            }
        } else {
            //failed
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }
    }

    const handleOnChangeFile = (event) => {
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
        // console.log('check file', preview)
    }
    return (
        <>
            <Modal title="Create Book"
                open={isCreateOpen}
                onOk={() => { handleSubmitBtn() }}
                onCancel={() => { resetAndCloseModal() }}
                maskClosable={false}
                okText={"CREATE"}
            >
                <div>
                    <span>Tiêu đề</span>
                    <Input
                        value={mainText}
                        onChange={(event) => { setMainText(event.target.value) }}
                    />
                </div>
                <div>
                    <span>Tác giả</span>
                    <Input
                        value={author}
                        onChange={(event) => { setAuthor(event.target.value) }}
                    />
                </div>
                <div>
                    <span>Giá tiền</span>
                    <InputNumber
                        value={price}
                        style={{ width: "100%" }}
                        addonAfter={' đ'}
                        onChange={(event) => { setPrice(event) }}

                    />
                </div>
                <div>
                    <div>Số lượng</div>
                    <InputNumber
                        style={{ width: "100%" }}
                        value={quantity}
                        onChange={(event) => { setQuantity(event) }}
                    />
                </div>
                <div>
                    <span>Thể loại</span>
                    <Select
                        value={category}
                        style={{ width: "100%" }}
                        onChange={(value) => { setCategory(value) }}
                        options={[
                            { value: 'Arts', label: 'Arts' },
                            { value: 'Business', label: 'Business' },
                            { value: 'Comics', label: 'Comics' },
                            { value: 'Cooking', label: 'Cooking' },
                            { value: 'Entertainment', label: 'Entertainment' },
                            { value: 'History', label: 'History' },
                            { value: 'Music', label: 'Music' },
                            { value: 'Sports', label: 'Sports' },
                            { value: 'Teen', label: 'Teen' },
                            { value: 'Travel', label: 'Travel' },
                        ]}
                    />
                </div>
                <div>
                    <div>Ảnh thumbnail</div>
                    <input
                        onChange={(event) => { handleOnChangeFile(event) }}
                        type="file" hidden id="btnUpload" name="myfile"

                        //fix bug add 1 anh 2 lan
                        onClick={(event) => { event.target.value = null }}>
                    </input>
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
                        </div>
                    }
                    <label htmlFor="btnUpload" style={{
                        cursor: 'pointer',
                        background: 'gold',
                        display: 'block',
                        marginTop: '15px',
                        padding: '5px 10px',
                        width: "fit-content",
                        borderRadius: '5px'
                    }}>
                        Upload Thumbnail
                    </label>
                </div>
            </Modal>
        </>
    )

}
export default CreateBookControl