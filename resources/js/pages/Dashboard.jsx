import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/'); // Redirect to login if no token
        } else {
            // Fetch the logged-in user's details
            axios.get('/api/user')
                .then(res => {
                    setUser(res.data);
                })
                .catch(err => {
                    console.error("Failed to fetch user:", err);
                    // If the token is invalid, clear it and kick them out
                    localStorage.removeItem('token');
                    navigate('/');
                });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    if (!user) return <div className="text-center mt-5">Loading Dashboard...</div>;

    return (
        <div className="container mt-4">
            {/* --- Top Navbar --- */}
            <nav className="navbar navbar-light bg-light rounded shadow-sm mb-4 p-3 d-flex justify-content-between">
                <span className="navbar-brand mb-0 h1">🚂 REMS - Railway Estate Management</span>
                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">Logout</button>
            </nav>

            {/* --- Welcome & Actions Card --- */}
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h3 className="card-title">Welcome, {user.name}!</h3>
                    <p className="text-muted">
                        <strong>Role:</strong> <span className="badge bg-info text-dark">{user.role}</span> &nbsp;|&nbsp; 
                        <strong>Office:</strong> {user.office ? user.office.name : <span className="text-danger">Not Assigned</span>}
                    </p>
                    
                    <hr />

                    {/* --- ACTION BUTTONS --- */}
                    <div className="d-flex gap-2">
                        {/* 1. The New "My Files" Button (For everyone) */}
                        <Link to="/files" className="btn btn-warning text-dark shadow-sm">
                            📂 My Files (Dak)
                        </Link>

                        {/* 2. The User Management Button (Useful for Admins) */}
                        <Link to="/users" className="btn btn-primary shadow-sm">
                            👥 Manage Employees
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- Dashboard Widgets (Placeholders for now) --- */}
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="card p-3 shadow-sm h-100">
                        <h5 className="text-primary">📌 Recent Notifications</h5>
                        <p className="text-muted small">System is running smoothly. No new alerts.</p>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card p-3 shadow-sm h-100">
                        <h5 className="text-success">📊 Quick Stats</h5>
                        <ul className="list-unstyled">
                            <li><strong>System Status:</strong> <span className="badge bg-success">Online</span></li>
                            <li><strong>Your Office ID:</strong> {user.office_id || 'N/A'}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;