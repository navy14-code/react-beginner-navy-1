import { Link, useNavigate, useRouteError } from "react-router-dom";
import { Button, Col, Divider, Flex, Form, Input, message, notification, Row } from 'antd';
import { ArrowRightOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { loginAPI } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate();

    const { setUser } = useContext(AuthContext)

    const [completed, setCompleted] = useState(false);

    const onFinish = async (values) => {
        setCompleted(true);
        const res = await loginAPI(
            values.email,
            values.password
        )
        if (res.data) {
            message.success("Login success")
            localStorage.setItem("access_token", res.data.access_token);
            setUser(res.data.user);

            navigate('/user');
        }
        else {
            notification.error({
                message: "Error Login",
                description: JSON.stringify(res.message)
            })
        }
        setCompleted(false);
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
                    <legend>Đăng Nhập</legend>
                    <Form layout="vertical"
                        form={form}
                        onFinish={onFinish}
                    >
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
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Nhập email"
                            />
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
                                // {
                                //     pattern: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[!@#$%^&*(),.?":{}|<>]).{8,})$/,
                                //     message: 'Password phải có ít nhất 8 ký tự, bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt.',
                                // },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Nhập password"
                            />
                        </Form.Item>
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
                            <Button
                                loading={completed}
                                onClick={() => { form.submit() }}
                                type='primary' >Log in
                            </Button>
                            <Link to="/">Go to home page<ArrowRightOutlined /></Link>
                        </div>
                    </Form>
                    <Divider></Divider>
                    <div style={{ textAlign: "center" }} >Chưa có tài khoàn?<Link to={"/register"}>Đăng ký ngay</Link> </div>
                </fieldset>
            </Col>
        </Row>

    );
}

export default LoginPage;