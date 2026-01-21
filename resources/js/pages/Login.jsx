import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // 1. Stop the page from reloading
        setError('');

        try {
            console.log("Attempting login with:", email);
            
            // 2. Send request to backend
            const response = await axios.post('/api/login', {
                email: email,
                password: password
            });

            console.log("Server Response:", response.data);

            // 3. CHECK THE TOKEN
            // Sometimes it is 'token', sometimes 'access_token'. We check both.
            const token = response.data.token || response.data.access_token;

            if (token) {
                // 4. Save the token securely
                localStorage.setItem('token', token);
                
                // 5. Send user to dashboard
                console.log("Token saved! Redirecting...");
                window.location.href = "/dashboard"; // Force a hard redirect to be safe
            } else {
                setError("Login successful, but no token received from server.");
            }

        } catch (err) {
            console.error("Login Error:", err);
            if (err.response && err.response.status === 401) {
                setError("Invalid Email or Password.");
            } else {
                setError("System Error. Check console.");
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-sm p-4" style={{ width: '400px' }}>
                <h3 className="text-center mb-4">🚂 REMS Login</h3>
                
                {error && <div className="alert alert-danger">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;