import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';


const Nav = () => {
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
                    <li className="nav-item">
                        <i className="bi bi-speedometer2" ></i>
                        <Link className="nav-link custom-nav-link" aria-current="page" to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <i className="bi bi-archive" ></i>
                        <Link className="nav-link custom-nav-link" to="/archive">Archives</Link>
                    </li> 
                    <li className="nav-item custom-logout-btn" onClick={logout}>
                        <i className="bi bi-box-arrow-left" ></i>

                        <p className="nav-link custom-nav-link" to="/archive">Logout</p>
                    </li>

                </ul>
                
            </div>
            
            
        </div>
    )
}

export default Nav;