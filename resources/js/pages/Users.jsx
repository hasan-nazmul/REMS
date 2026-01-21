import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>👥 Employee List</h2>
                <Link to="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
            </div>

            <div className="card shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>👥 Employee List</h2>
                    <div>
                        {/* ADD THIS BUTTON */}
                        <Link to="/users/create" className="btn btn-primary me-2">+ Add New</Link>
                        <Link to="/dashboard" className="btn btn-secondary">Back</Link>
                    </div>
                </div>
                <table className="table table-hover mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Office</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>{user.office ? user.office.name : <span className="text-muted">N/A</span>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;