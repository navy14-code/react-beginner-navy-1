import Icon, { DeleteOutlined, EditOutlined, QuestionCircleOutlined, } from '@ant-design/icons';
import { notification, Popconfirm, Table, } from 'antd';
import { useState } from 'react';
import UpdateUsersModel from './update.user.modal';
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from '../../services/api.service';
import { render } from 'nprogress';

const UserTable = (props) => {
  const { dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize } = props

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

        return (
          <>{(index + 1) + (current - 1) * pageSize}</>
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

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current) {
      if (pagination.current !== +current) {
        setCurrent(+pagination.current) // '+' ep kieu string =>> int
      }
    }

    // thay doi tong so phan tu : pagesize
    if (pagination && pagination.pageSize) {
      if (pagination.pageSize !== +pageSize) {
        setPageSize(+pagination.pageSize) // '+' ep kieu string =>> int
      }
    }

    // console.log('check', { pagination, filters, sorter, extra })

  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataUsers}
        rowKey='_id'
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => { return (<div>{range[0]}-{range[1]} up {total} rows</div>) }
        }}
        onChange={onChange}
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