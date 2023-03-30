import React, { useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import data from '../snippets.json'
import AddSnippetForm from "./AddSnippet.jsx";
import '../styles/snippetsTable.css'



const SnippetsTable = () => {
    const [snippet, setSnippet] = useState([]);
    const [selectedSnippet, setSelectedSnippet] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const history = createBrowserHistory();

    useEffect(() => {
        fetch("/api/snippets")
            .then((response) => response.json())
            .then((data) => setSnippet(data))
            .catch((error) => console.error(error));
    }, []);

    const handleEditSnippet = (id, updateSnippet) => {
        fetch(`/api/snippets/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateSnippet),
        })
            .then((response) => response.json())
            .then((data) => {
                setSnippet((prevSnippet) =>
                    prevSnippet.map((snippet) => (snippet.id === id ? data : snippet))
                );
                setSelectedSnippet(null);
            })
            .catch((error) => console.error(error));
        window.location.reload();
    };

    const handleDeleteSnippet = (id) => {
        fetch(`/api/snippets/${id}`, { method: "DELETE" })
            .then(() => {
                setSnippet((prevSnippet) =>
                    prevSnippet.filter((snippet) => snippet.id !== id)
                );
            })
            .catch((error) => console.error(error));


    }

    const handleSelectSnippet = (snippet) => {
        setSelectedSnippet(snippet);
    };

    const handleShowAddForm = () => {

        setShowAddForm(!showAddForm);


    }

    const handleCanselAddForm = () => {
        setShowAddForm(false);
        window.location.reload();

    }

    const handleSaveSnippet = (snippet) => {
        fetch('/api/snippets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(snippet),
        })
            .then((response) => response.json())
            .then((data) => {
                setSnippet([...snippet, data]);
                setShowAddForm(false);
            })
            .catch((error) => console.error(error));
    };

    if (showAddForm) {
        return (
            <div>
                <AddSnippetForm onSave={handleSaveSnippet} onCancel={handleCanselAddForm} />
            </div>
        );
    }

    if (selectedSnippet) {
        return (
            <div>
                <AddSnippetForm snippet={selectedSnippet} onSave={(updateSnippet) => handleEditSnippet(selectedSnippet.id, updateSnippet)} />
            </div>
        );
    }

    return (
        <div>
            <h1>Snippets Table</h1>
            <table>
                <thead>
                    <tr>
                        <td >
                        </td>
                        <td >
                            Тут будет фильтр
                        </td>
                        <td colSpan={3}>
                            <button className="addSnippet" type="submit" onClick={handleShowAddForm}>Add</button>
                        </td>
                    </tr>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date of Creation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {snippet.map((object) => (
                        <tr key={object.id}>
                            <td>{object.id}</td>
                            <td>{object.title}</td>
                            <td>{object.description}</td>
                            <td>{object.creationDate}</td>
                            <td>
                                <button>Edit onClick={() => handleSelectSnippet(object)}</button>
                                <button>Delete onClick={() => handleDeleteSnippet(object.id)}</button>
                            </td>
                        </tr>
                    ))} */}


                    {/* Test */}

                    {data.map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.title}</td>
                            <td>{row.description}</td>
                            <td>{row.creationDate}</td>
                            <td>
                                <button onClick={() => handleSelectSnippet(row)}>Edit</button>
                                <button onClick={() => handleDeleteSnippet(snippet.id)} >Delete</button>
                            </td>
                        </tr>
                    ))
                    }

                </tbody>
            </table>
        </div>
    );
};

export default SnippetsTable;