import { Space, Table, Tag } from 'antd';


const UserTable = (props) => {
    const {dataUsers} = props

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
      return(
        <Table 
        columns={columns} 
        dataSource={dataUsers}
         rowKey='_id'
        />
      );
      
}


export default UserTable;