import React from "react";
import UserTable from './userTable';
import SnippetsTable from "./snippetsTable";
import Sidebar from './Sidebar';
import AddUserForm from "./AddUser";

const Admin = () => {
    return (
        <div>
            <Sidebar />
            <UserTable/>

        </div>

    );
};
export default Admin;