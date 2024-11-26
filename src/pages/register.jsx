import { Button, Form, Input, notification } from "antd";
import { registerUserAPI } from "../services/api.service";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log('check', values)
        //aaa
        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone);

        if (res.data) {
            notification.success({
                message: 'Đăng ký người dùng',
                description: 'Đăng ký người dùng thành công'
            });
            navigate('/user');
        } else {
            notification.error({
                message: 'Đăng ký người dùng thất bại',
                description: JSON.stringify(res.message)
            })
        }

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
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Không được để trống fullname!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Vui lòng điền họ và tên"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Không được để trống email!',
                            },
                            {

                                type: "email",
                                message: 'Email phải đúng định dạng'
                            },
                        ]}
                    >
                        <Input
                            placeholder="Vui lòng điền email"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Không được để trống password!',
                            },
                            {
                                pattern: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[!@#$%^&*(),.?":{}|<>]).{8,})$/,
                                message: 'Password phải có ít nhất 8 ký tự, bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt.',
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Vui lòng điền password"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Không được để trống phone!',
                            },
                            {
                                pattern: new RegExp(/^\d+$/), //cach 1
                                // pattern: /^[0-9]+$/, /cach 2
                                message: 'Phone không đúng định dạng',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Vui lòng điền sđt"
                            maxLength={10}
                        />
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