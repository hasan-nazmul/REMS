import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const UserCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
        office_id: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send data to backend
            await axios.post('/api/users', formData);
            alert("User created successfully!");
            navigate('/users'); 
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Failed to create user. Check the console (F12) for details.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="card-header bg-success text-white">
                    <h4 className="mb-0">➕ Add New Employee</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* Name Field */}
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                        </div>

                        {/* Email Field */}
                        <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                required 
                                onChange={e => setFormData({...formData, email: e.target.value})}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                required 
                                onChange={e => setFormData({...formData, password: e.target.value})}
                            />
                        </div>

                        {/* Role & Office */}
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Role</label>
                                <select 
                                    className="form-select" 
                                    onChange={e => setFormData({...formData, role: e.target.value})}
                                >
                                    <option value="user">General User</option>
                                    <option value="office_head">Office Head</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Office ID</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="e.g. 1" 
                                    required 
                                    onChange={e => setFormData({...formData, office_id: e.target.value})}
                                />
                                <small className="text-muted">Use 1 for Head Office</small>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="d-flex justify-content-between">
                            <Link to="/users" className="btn btn-secondary">Cancel</Link>
                            <button type="submit" className="btn btn-success">Create User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserCreate;