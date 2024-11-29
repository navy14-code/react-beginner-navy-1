import { Button, Col, Form, Input, notification, Row, Divider } from "antd";
import { registerUserAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";


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
            navigate('/login');
        } else {
            notification.error({
                message: 'Đăng ký người dùng thất bại',
                description: JSON.stringify(res.message)
            })
        }

    }

    return (
        <Row justify={'center'} style={{ marginTop: '30px' }}>
            <Col xs={24} md={16} lg={6}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #cccc",
                    borderRadius: "5px",
                }}
                >
                    <Form
                        layout="vertical"
                        form={form}
                        onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    >
                        <h3 style={{ textAlign: 'center', margin: "15px" }}>Đăng ký tài khoản </h3>
                        {/* FullName */}
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
                        {/* Email */}
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
                            <Input placeholder="Vui lòng điền email" />
                        </Form.Item>
                        {/* Password */}
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
                            <Input.Password placeholder="Vui lòng điền password" />
                        </Form.Item>
                        {/* Phone */}
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
                                maxLength={11}
                                onKeyDown={(event) => { if (event.key === "Enter") form.submit() }} />
                        </Form.Item>
                        <div style={{ textAlign: 'center' }}>
                            <Button
                                onClick={() => { form.submit() }}
                                type='primary' >Sign in
                            </Button>
                        </div>
                    </Form>
                    <Divider></Divider>
                    <div style={{ textAlign: 'center' }} >
                        Đã có tài khoàn?<Link to={"/login"}>Đăng nhập ngay</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>
    );
}

export default RegisterPage;