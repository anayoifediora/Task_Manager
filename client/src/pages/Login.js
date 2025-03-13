import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER  } from '../utils/mutations';   
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

const Login = () => {

    const [formState, setFormState] = useState({ email: '', password: ''});
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
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
                    {data ? (
                            
                            <p>
                            Success! Proceed to the { ' '}
                            <Link to="/dashboard">Dashboard</Link>
                          </p>
                        ) : (
                    <div className="login-container">
                        <h2>Login</h2>
                        
                        
                        <form className="login-form" onSubmit={handleFormSubmit}>
                            <div className="m-3">
                                <label for="email" className="form-label">Email address</label>
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
                            <div className="m-3">
                                <label for="password" className="form-label">Password</label>
                                <input 
                                    type="password"
                                    name="password" 
                                    value={formState.password}
                                    onChange={handleInputChange}
                                    className="form-control border border-dark" 
                                    id="password"/>
                            </div>
                            <button type="submit" className="custom-login-btn">Login</button>
                        </form>
                        
                        
                    </div>
                    )}
                    {error && (
                        <div className =  'alert alert-danger fs-3' role="alert">
                            {error.message}
                        </div>
                    )

                    }
                    <Link to="/signup">SignUp</Link>
                    <Link to="/">Back to Home</Link>
            </div>
             
        
    

    )
}


export default Login;