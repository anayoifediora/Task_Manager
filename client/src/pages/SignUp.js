import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';



const SignUp = () => {

    const [formState, setFormState] = useState({ username: " ", email: " ", password: ""})
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...formState }
            })
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
        //clear form values 
        setFormState({
            username: '',
            email: '',
            password: ''
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormState(
            { ...formState,
            [name]: value
            }
        )
    }

    return (
        <div className = "signup-page">
            <h1> 
                Task Manager
            </h1>
            {data ? (
                <div>
                    Successfully signed up! Continue to your {' '}<Link to="/dashboard">dashboard</Link>
                </div>
            ) : (
            
            <div className="signup-container">
                <h2 className="ms-3 mt-2">Sign Up</h2>
                <form className="signup-form" onSubmit={handleFormSubmit}>
                    <div className="m-3">
                        <label for="username" className="form-label">Username</label>
                        <input 
                            type="username" 
                            className="form-control border border-dark" 
                            id="username" 
                            aria-describedby="username"
                            name="username"
                            value={formState.username}
                            onChange={handleInputChange}
                        />   
                    </div>
                    <div className="m-3">
                        <label for="email" className="form-label">Email address</label>
                        <input 
                            type="email" 
                            className="form-control border border-dark" 
                            id="email" 
                            aria-describedby="email"
                            name="email"
                            value={formState.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="m-3">
                        <label for="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control border border-dark" 
                            id="password"
                            name="password"
                            value={formState.password}
                            onChange={handleInputChange}
                        />
                        <div id="emailHelp" className="form-text">Password must be at least 8 characters, can include alphanumeric and special characters.</div>
                    </div>
                    <button type="submit" className="custom-signup-btn">Sign Up</button>
                </form>
            </div>
            )}
            <Link to="/login">Login</Link>
            <Link to="/">Back to Home</Link>
        </div>
    )
}

export default SignUp;