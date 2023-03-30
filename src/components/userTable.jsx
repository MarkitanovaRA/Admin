import React, { useEffect, useState } from "react";

import { createBrowserHistory } from "history";
import data from '../users.json'
import AddUserForm from "./AddUser";
import '../styles/userTable.css'



const UserTable = () => {

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState({ text: '', component: 'name' });
    const [selectedUser, setSelectedUser] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const history = createBrowserHistory();

    useEffect(() => {
        fetch("/api/users")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error(error));

    }, []);

    const handleEditUser = (id, updateUser) => {
        fetch(`/api/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateUser),
        })
            .then((response) => response.json())
            .then((data) => {
                setUsers((prevUsers) =>
                    prevUsers.map((user) => (user.id === id ? data : user))
                );
                setSelectedUser(null);
            })
            .catch((error) => console.error(error));
        window.location.reload();
    };

    const handleDeleteUser = (id) => {
        fetch(`/api/users/${id}`, { method: "DELETE" })
            .then(() => {
                setUsers((prevUsers) =>
                    prevUsers.filter((user) => user.id !== id)
                );
            })
            .catch((error) => console.error(error));


    }

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    const handleShowAddForm = () => {

        setShowAddForm(!showAddForm);


    }

    const handleCanselAddForm = () => {
        setShowAddForm(false);
        window.location.reload();

    }

    const handleSaveUser = (user) => {
        fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .then((data) => {
                setUsers([...users, data]); // update the state with the new user data
                setShowAddForm(false); // hide the AddUserForm component
            })
            .catch((error) => console.error(error));
    };

    if (showAddForm) {
        return (
            <div>
                <AddUserForm onSave={handleSaveUser} onCancel={handleCanselAddForm} />
            </div>
        );
    }

    if (selectedUser) {
        return (
            <div>
                <AddUserForm user={selectedUser} onSave={(updateUser) => handleEditUser(selectedUser.id, updateUser)} />
            </div>
        );
    }

    return (
        <div>
            <h1>Users Table</h1>
            <table>
                <thead>
                    <tr>
                        <td >

                        </td>
                        <td >
                            Тут будет фильтр
                        </td>
                        <td colSpan={4}>
                            <button className="addUser" type="submit" onClick={handleShowAddForm}  >Add</button>
                        </td>
                    </tr>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Date of Registration</th>
                        <th>Admin</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {/*  {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.registrationDate}</td>
                            <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                            <td>
                                <button onClick={() => handleSelectUser(user)} >Edit</button>
                                <button onClick={() => handleDeleteUser(user.id)} >Delete</button>
                            </td>
                        </tr>
                    ))} */}


                   {/*  Test */}
                    {data.map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.username}</td>
                            <td>{row.email}</td>
                            <td>{row.registrationDate}</td>
                            <td>{row.isAdmin ? 'Yes' : 'No'}</td>
                            <td>
                                <button onClick={() => handleSelectUser(row)}>Edit</button>
                                <button onClick={() => handleDeleteUser(row.id)} >Delete</button>
                            </td>
                        </tr>
                    ))
                    }


                </tbody>
            </table>




        </div>
    );
};

export default UserTable;