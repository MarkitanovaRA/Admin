import React, { useState } from "react";
import '../styles/AddUser.css';
import UserTable from "./userTable";

function AddUserForm(props) {

    const [formData, setFormData] = useState({
        username: props.user ? props.user.username : "",
        email: props.user ? props.user.email : "",
        registrationDate: props.user ? props.user.registrationDate : "",
        isAdmin: props.user ? props.user.isAdmin : false,
    });

    const [username, setUsername] = useState(formData.username);
    const [email, setEmail] = useState(formData.email);
    const [registrationDate, setRegistrationDate] = useState(formData.registrationDate);
    const [isAdmin, setIsAdmin] = useState(formData.isAdmin);
    const [show, setShow] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = { ...formData };
        props.onSave(newUser);
        fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        })
            .then((response) => response.json())
            .then((data) => {
                props.addUser(data);
                setFormData({
                    username: "",
                    email: "",
                    registrationDate: "",
                    isAdmin: false,
                });
            })
            .catch((error) => console.error(error));
    };

    const handleShow = () => {
        setShow(!show);
        window.location.reload();
    }

    return (
        show ? (<UserTable />) : (
            <form onSubmit={handleSubmit}>
                <div className="form-header">User</div>

                <div className="form-body">

                    <div className="information">
                        <label htmlFor="name">Name:</label>
                        <input className="form-input"
                            type="text"
                            id="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        <br />
                    </div>
                    <div className="information">
                        <label htmlFor="email">Email:</label>
                        <input className="form-input"
                            type="text"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <br />
                    </div>
                    <div className="information">
                        <label htmlFor="registrationDate">Registration Date:</label>
                        <input className="form-input"
                            type="date"
                            id="registrationDate"
                            value={registrationDate}
                            onChange={(event) => setRegistrationDate(event.target.value)}
                        />
                        <br />
                    </div>
                    <div className="admin">
                        <label htmlFor="isAdmin">Admin:</label>
                        <input className="form-input"
                            type="checkbox"
                            id="isAdmin"
                            checked={isAdmin}
                            onChange={(event) => setIsAdmin(event.target.checked)}
                        />
                        <br />
                    </div>
                </div>
                <div className="form-footer">
                    <button className="save" type="submit" onClick={handleShow}>Save</button>
                </div>
            </form>
        )
    );
}

export default AddUserForm;