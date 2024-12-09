import { Form, Input, InputNumber, Modal, Select, message, notification } from "antd";
import { createBookAPI, handleUploadFile } from "../../services/api.service";
import { useState } from "react";

const CreateBookUncontrol = (props) => {
    const {
        isCreateOpen, setIsCreateOpen, loadBook
    } = props;
    const [form] = Form.useForm();

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleSubmitBtn = async (values) => {
        if (!selectedFile) {
            notification.error({
                message: "Error",
                description: "Vui lòng nhập Thumbnail"
            })
            return;
        }
        const resUpload = await handleUploadFile(selectedFile, 'book');
        if (resUpload.data) {
            const newThumbnail = resUpload.data.fileUploaded;
            const { mainText, author, price, quantity, category } = values;
            const resBook = await createBookAPI(newThumbnail, mainText, author, price, quantity, category);
            if (resBook.data) {
                resetAndCloseModal()
                await loadBook();
                notification.success({
                    message: "Create book success",
                    description: "Tạo mới book thành công"
                })
            } else (
                notification.error({
                    message: "Create fail",
                    description: JSON.stringify(resBook.message)
                })
            )
        } else (
            notification.error({
                message: "Upload fail",
                description: JSON.stringify(resUpload.message)
            })
        )
    }
    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file))
        }
    }
    const resetAndCloseModal = () => {
        setIsCreateOpen(false)
        form.resetFields();
        setPreview(null);
        setSelectedFile(null);

    }


    return (
        <Modal
            title='Create Book (uncontrolled)'
            open={isCreateOpen}
            onOk={() => { form.submit() }}
            onCancel={() => { resetAndCloseModal() }}
            maskClosable={false}
            okText={"CREATE"}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmitBtn}
            >
                <Form.Item
                    label="Tiêu đề"
                    name="mainText"
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống tiêu đề!',
                        },
                    ]}

                >
                    <Input
                        placeholder="Vui lòng nhập tiêu đề"
                    />
                </Form.Item>
                <Form.Item
                    label="Tác giả"
                    name="author"
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống tác giả!',
                        },
                    ]}

                >
                    <Input
                        placeholder="Vui lòng nhập tác giả"
                    />
                </Form.Item>
                <Form.Item
                    label="Giá tiền"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống giá tiền!',
                        },
                    ]}

                >
                    <InputNumber
                        style={{ width: '100%' }}
                        addonAfter={' đ'}
                        placeholder="Vui lòng nhập giá tiền"
                    />
                </Form.Item>
                <Form.Item
                    label="Số lượng"
                    name="quantity"
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống số lượng!',
                        },
                    ]}

                >
                    <InputNumber
                        style={{ width: "100%" }}
                        placeholder="Vui lòng nhập số lượng"
                    />
                </Form.Item>
                <Form.Item
                    label="Thể loại"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống thể loại!',
                        },
                    ]}

                >
                    <Select
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
                </Form.Item>
            </Form>
            <div>
                <div>Ảnh thumbnail</div>
                <input
                    onChange={(event) => { handleOnChangeFile(event) }}
                    type="file" hidden id="btnUpload"
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
                    Upload
                </label>
            </div>
        </Modal>
    )


}

export default CreateBookUncontrol;