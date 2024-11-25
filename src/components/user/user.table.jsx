import Icon, { DeleteOutlined, EditOutlined, QuestionCircleOutlined, } from '@ant-design/icons';
import { notification, Popconfirm, Table, } from 'antd';
import { useState } from 'react';
import UpdateUsersModel from './update.user.modal';
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from '../../services/api.service';
import { render } from 'nprogress';

const UserTable = (props) => {
  const { dataUsers, loadUser } = props

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const [dataUpdate, setDataUpdate] = useState(null);

  const [dataDetail, setDataDetail] = useState(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);


  const handleDeleteUser = async (id) => {
    const res = await deleteUserAPI(id);
    if (res.data) {
      notification.success({
        message: `Delete user`,
        description: `Delete success`

      })
      await loadUser();
    }
    else {
      notification.error({
        message: `Delete Fail`,
        description: JSON.stringify(res.message)
      })
    }
  }

  const columns = [
    {
      title: "STT",
      dataIndex: '_id',
      key: 'id',
      render: (_, record, index) => {
        console.log('Check index', index)
        return (
          <>{index + 1}</>
        )
      }
    },
    {
      title: 'Id',
      dataIndex: '_id',
      render: (_, record) => {
        return (
          <a
            href='#'
            onClick={() => {
              setDataDetail(record);
              setIsDetailOpen(true);
            }}>
            {record._id} </a>
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
        <div style={{ display: 'flex', gap: '20px' }}>
          <EditOutlined
            onClick={() => {
              setDataUpdate(record);
              setIsModalUpdateOpen(true);
            }}
            style={{ cursor: 'pointer', color: 'orange' }}
          />
          <Popconfirm
            title="Delete user"
            description="Are you sure to delete user ?"
            icon={<QuestionCircleOutlined style={{ color: 'red', }} />}
            onConfirm={() => { handleDeleteUser(record._id) }}
            onOpenChange={() => console.log('open change')}
            okText="Yes"
            cancelText="No"
            placement='topLeft'
          >
            <DeleteOutlined style={{ cursor: 'pointer', color: 'red' }} />
          </Popconfirm>

        </div>
      ),
    },

  ];

  return (
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
      <ViewUserDetail
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        loadUser={loadUser}
      />
    </>
  );

}

export default UserTable;