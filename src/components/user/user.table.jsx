import { Space, Table, Tag } from 'antd';
import { fetchAllUserAPI } from '../../services/api.service';
import { useEffect, useState } from 'react';
const UserTable = () => {
    const[dataUsers,setDataUsers]= useState([
    ]);
    useEffect(()=>{
      console.log('run useEffect 1111')
      loadUser(); 
    }, [setDataUsers]);
    const columns = [
        {
          title: 'Id',
          dataIndex: '_id',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Name',
          dataIndex: 'fullName',
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Password',
          dataIndex: 'password',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
        }
      ];

    const loadUser = async () =>{
      const res = await fetchAllUserAPI();
      setDataUsers(res.data)
    } 
 
    console.log('render 0000')
      return(
        <Table 
        columns={columns} 
        dataSource={dataUsers}
         rowKey='_id'
        />
      );
      
}


export default UserTable;