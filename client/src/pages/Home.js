import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {

    return (

        <div className="home">
            <h1>
                Welcome to Task Manager!
            </h1>
            <div>
                <Link className="login-btn fw-bolder" to="/login">Login</Link>
                <Link className="signup-btn fw-bolder" to="/signup">SignUp</Link>
            </div>
        
        </div>
    )

    
}

export default Home;