import React, { useState } from "react";
import { Link } from 'react-router-dom'
import UserTable from "./userTable";
import SnippetsTable from "./snippetsTable";
import { FaBars } from 'react-icons/fa'

import '../styles/Sidebar.css'

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showOtherComponent, setShowOtherComponent] = useState(false)

    const openSidebar = () => {
        setIsOpen(!isOpen);
    }

    const handleTabClick = () => {

        setShowOtherComponent(true)

    }

    return (
        <div>
            <button className="select" onClick={openSidebar}><FaBars /></button>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <ul>
                    <li className="sidebarHeader">Menu</li>
                    
                        <li className="selectedLi" onClick={handleTabClick}>Users</li>
                        <li className="selectedLi" onClick={handleTabClick}>Snippets</li>
                        <li className="selectedLi" onClick={openSidebar}>Back to main page</li>
                    
                </ul>
            </div>
        </div>

    );
};

export default Sidebar;