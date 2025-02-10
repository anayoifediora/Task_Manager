import React from 'react';

import Auth from '../utils/auth';


const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        window.location.assign('/');
    }


    return (

        <ul className="nav justify-content-center">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Active</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
                <button className="nav-link" onClick={logout}>Logout</button>
            </li>
            
        </ul>
    )
}

export default Header;