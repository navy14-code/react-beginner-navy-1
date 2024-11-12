import Icon, { DeleteOutlined, EditOutlined, HomeOutlined } from '@ant-design/icons';
import { Space, Table, Tag } from 'antd';
import UpdateUsersModel from './update.user.modal';
import { useState } from 'react';


const UserTable = (props) => {
    const {dataUsers, loadUser} = props
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const columns = [
        {
          title: 'Id',
          dataIndex: '_id',
          render: (_, record) => {
            return(
              <a href='#'>{record._id} </a>
            )
          }
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
          title: 'Phone',
          dataIndex: 'phone',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <div style={{ display:'flex', gap:'20px'}}>
              <EditOutlined 
                onClick={()=>{
                  setDataUpdate(record);
                  setIsModalUpdateOpen(true);  
                }}
                style={{cursor:'pointer', color: 'orange'}}  
                />
              <DeleteOutlined 
              style={{cursor:'pointer', color: 'red'}} 
              />
            </div>
          ),
        },

      ];

      return(
        <>
          <Table 
            columns={columns} 
            dataSource={dataUsers}
            rowKey='_id'
          />
          <UpdateUsersModel
            isModalUpdateOpen={isModalUpdateOpen}
            setIsModalUpdateOpen={setIsModalUpdateOpen}
            dataUpdate={dataUpdate}
            setDataUpdate={setDataUpdate}
            loadUser={loadUser}
          />
        </>
      );
      
}

export default UserTable;