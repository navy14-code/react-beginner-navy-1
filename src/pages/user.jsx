import { Header } from "antd/es/layout/layout";
import UserTable from "../components/user/user.table";
import UserFrom from "../components/user/user.form";
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from '../services/api.service';
const UserPage = () =>{
    const[dataUsers,setDataUsers]= useState([]);
    useEffect(()=>{
      loadUser(); 
    }, [setDataUsers]);

    const loadUser = async () =>{
        const res = await fetchAllUserAPI();
        setDataUsers(res.data)
      } 
    return(
      <>
        <div style={{padding: "20px"}}>
          <UserFrom 
            loadUser = {loadUser}
          />
          <UserTable 
            loadUser = {loadUser}
            dataUsers = {dataUsers}
          />
        </div>
      </>
    );

}

export default UserPage;