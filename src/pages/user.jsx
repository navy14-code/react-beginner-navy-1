import { Header } from "antd/es/layout/layout";
import UserTable from "../components/user/user.table";
import UserFrom from "../components/user/user.form";

const UserPage = () =>{
    return(
        <>
        <div style={{padding: "20px"}}>
        <UserFrom/>
        <UserTable/>
        </div>
        </>
    );

}

export default UserPage;