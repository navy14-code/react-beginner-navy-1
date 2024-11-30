import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, message } from 'antd';
import { BookOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';



const Header = () => {
    const [current, setCurrent] = useState('');

    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate();

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            //clear data
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            })
            message.success("Logout success");
            //redirect tp home
            navigate('/');

        }
    }
    const items = [
        {
            label: <Link to={'/'}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />
        },
        {
            label: <Link to={'/user'}>Users</Link>,
            key: 'users',
            icon: <UserOutlined />
        },
        {
            label: <Link to={'/book'}>Books</Link>,
            key: 'books',
            icon: <BookOutlined />
        },
        ...(!user.id ? [{
            label: <Link to={'/login'}>Login</Link>,
            key: 'login',
            icon: <LoginOutlined />,

        }] : []),
        ...(user.id ? [{
            label: `Welcome ${user.fullName}`,
            key: 'hello',
            icon: <UserOutlined />,
            children: [
                {
                    key: 'logout',
                    label: <Link to={'/'} onClick={() => handleLogout()}>Logout</Link>,
                    icon: <LogoutOutlined />,
                },
            ],
        }] : [])
    ];
    return (
        <>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items} />
        </>
    );
}

export default Header;