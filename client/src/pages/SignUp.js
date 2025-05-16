import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Link } from 'react-router-dom'; //For Navigation Links

import Auth from '../utils/auth'; //Auth utility for handling tokens and login



const SignUp = () => {
    //State to manage form data
    const [formState, setFormState] = useState({ username: " ", email: " ", password: ""})
    //Apollo mutation hook for adding a new user
    const [addUser, { error, data }] = useMutation(ADD_USER);
    // Function to handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            //Attempt to add user with form data
            const { data } = await addUser({
                variables: { ...formState }
            })
            //If successful, log in the user with returned token and save the generated token to local storage
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
        //Update the specific field in the form state
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
            {/* If signup is successful, show a success message */}
            {data ? (
                <div>
                    Successfully signed up! Continue to your {' '}<Link to="/dashboard">dashboard</Link>
                </div>
            ) : (
            // Signup form
            <div className="signup-container">
                <h2 className="ms-3 mt-2">Sign Up</h2>
                <form className="signup-form" onSubmit={handleFormSubmit}>
                    {/* Username input */}
                    <div className="m-3">
                        <label htmlFor="username" className="form-label">Username</label>
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
                    {/* Email input */}
                    <div className="m-3">
                        <label htmlFor="email" className="form-label">Email address</label>
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
                    {/* Password input */}
                    <div className="m-3">
                        <label htmlFor="password" className="form-label">Password</label>
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
                    {/* Submit button */}
                    <button type="submit" className="custom-signup-btn">Sign Up</button>
                </form>
            </div>
            )}
            {/* Navigation links */}
            <Link to="/login">Login</Link>
            <Link to="/">Back to Home</Link>
        </div>
    )
}

export default SignUp;