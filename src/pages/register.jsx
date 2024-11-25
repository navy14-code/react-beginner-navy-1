import { Button, Form, Input, Modal } from "antd";


const RegisterPage = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('check', values)
    }
    return (
        <>
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            >
                <div style={{ margin: '50px' }}>
                    <Form.Item
                        label="FullName"
                        name="fullname"
                        rules={[
                            {
                                required: true,
                                message: 'Không được để trống fullname!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Không được để trống email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Không được để trống password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Không được để trống phone!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Button
                        onClick={() => { form.submit() }}
                        type='primary'
                    >
                        Create
                    </Button>
                </div>

            </Form>
        </>
    );
}

export default RegisterPage;