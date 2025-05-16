import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER  } from '../utils/mutations';   
import Auth from '../utils/auth';
//Used for navigation between routes
import { Link } from 'react-router-dom';

const Login = () => {
    // State to manage form input values
    const [formState, setFormState] = useState({ email: '', password: ''});
    // Apollo mutation hook for logging in the user
    const [login, { error, data }] = useMutation(LOGIN_USER);
    
    // Handles form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            // Execute the login mutation with the form values
            const { data } = await login({
                variables: {
                    email: formState.email,
                    password: formState.password,
                }
            })
            //saves the generated token to local storage
            Auth.login(data.login.token);
        } catch (e) {
            console.error(e)
        }
        //clear form values 
        setFormState({
            email: '',
            password: ''
        })
    }
    // Updates state as the user types into form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormState({
            ...formState,
            [name]: value,
        })
    };

    return (

        

          <div className = 'login-page'>
            
                    <h1> 
                        Task Manager
                    </h1>
                    {/* Show success message if login is successful */}
                    {data ? (
                            
                            <p>
                            Success! Proceed to the { ' '}
                            <Link to="/dashboard">Dashboard</Link>
                          </p>
                        ) : (
                            //Login form
                    <div className="login-container">
                        <h2>Login</h2>
                        
                        
                        <form className="login-form" onSubmit={handleFormSubmit}>
                            {/* Email input field */}
                            <div className="m-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formState.email}
                                    onChange={handleInputChange}
                                    className="form-control border border-dark" 
                                    id="email" 
                                    aria-describedby="emailHelp"
                                />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            {/* Password input field */}
                            <div className="m-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input 
                                    type="password"
                                    name="password" 
                                    value={formState.password}
                                    onChange={handleInputChange}
                                    className="form-control border border-dark" 
                                    id="password"/>
                            </div>
                            {/* Submit button */}
                            <button type="submit" className="custom-login-btn">Login</button>
                        </form>
                        
                        
                    </div>
                    )}
                    {/* Displays error message if login fails */}
                    {error && (
                        <div className =  'alert alert-danger fs-3' role="alert">
                            {error.message}
                        </div>
                    )

                    }
                    {/* Navigation links */}
                    <Link to="/signup">SignUp</Link>
                    <Link to="/">Back to Home</Link>
            </div>
             
        
    

    )
}


export default Login;