import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';


const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        window.location.assign('/');
    }


    return (
        <div className='menubar'>
            <div className = "navbar">
                <h2>Task Manager</h2>
                <ul className="nav">
                    <li className="nav-item" style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <i className="bi bi-speedometer2 fs-4" ></i>
                        <Link className="nav-link active" aria-current="page" to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item" style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <i className="bi bi-calendar-check fs-4"></i>
                        <Link className="nav-link">Calendar</Link>
                    </li>
                    <li className="nav-item" style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <i className="bi bi-archive fs-4" ></i>
                        <Link className="nav-link" to="/archive" style={{textAlign: "center"}}>Archives</Link>
                    </li>        
                </ul>
                
            </div>
            <div className = 'm-3'>
                <button className="custom-logout-btn m-4 p-2" onClick={logout}>Log out</button>
            </div>
        </div>
    )
}

export default Header;