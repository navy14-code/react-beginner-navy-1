import { Header } from "antd/es/layout/layout";
import UserTable from "../components/user/user.table";
import UserFrom from "../components/user/user.form";
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from '../services/api.service';
const UserPage = () => {
  const [dataUsers, setDataUsers] = useState([]);

  const [current, setCurrent] = useState(1);

  const [pageSize, setPageSize] = useState(10);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadUser();
  }, [current]); //[] + dieu kien

  const loadUser = async () => {
    const res = await fetchAllUserAPI(current, pageSize);
    if (res.data) {
      setDataUsers(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }

  }

  console.log('Check', current)

  return (
    <>
      <div style={{ padding: "20px" }}>
        <UserFrom
          loadUser={loadUser}
        />
        <UserTable
          loadUser={loadUser}
          dataUsers={dataUsers}
          current={current}
          pageSize={pageSize}
          total={total}
          setCurrent={setCurrent}
          setPageSize={setPageSize}
        />
      </div>
    </>
  );

}

export default UserPage;