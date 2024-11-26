import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { AppstoreOutlined, BookOutlined, HomeOutlined, LoginOutlined, SettingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';



const Header = () => {
    const [current, setCurrent] = useState('');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
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
        {
            label: <Link to={'/register'}></Link>,
            key: 'register',
            icon: <UserAddOutlined />
        },
        {
            label: <Link to={'/login'}></Link>,
            key: 'login',
            icon: <LoginOutlined />
        },

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