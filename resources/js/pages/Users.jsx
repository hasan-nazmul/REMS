import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [offices, setOffices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form State for "Add New"
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', role: 'user', office_id: ''
    });

    useEffect(() => {
        fetchUsers();
        fetchOffices();
    }, []);

    const fetchUsers = () => {
        axios.get('/api/users')
            .then(res => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    };

    const fetchOffices = () => {
        // We reuse the hierarchy API to get the list of offices
        axios.get('/api/offices/hierarchy').then(res => setOffices(res.data));
    };

    const handleDelete = async (id) => {
        if(!confirm("Are you sure you want to remove this employee?")) return;
        try {
            await axios.delete(`/api/users/${id}`);
            fetchUsers(); // Refresh list
            alert("Employee removed.");
        } catch (error) {
            alert("Failed to delete. You cannot delete yourself.");
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users', formData);
            alert("Employee Created Successfully!");
            setShowForm(false);
            fetchUsers(); // Refresh list
            // Reset form
            setFormData({ name: '', email: '', password: '', role: 'user', office_id: '' });
        } catch (error) {
            alert("Error creating user. Check console.");
            console.error(error);
        }
    };

    // Helper to color-code roles
    const getRoleBadge = (role) => {
        if(role === 'admin') return <span className="badge bg-danger">System Admin</span>;
        if(role === 'office_head') return <span className="badge bg-primary">Office Head</span>;
        return <span className="badge bg-secondary">Staff</span>;
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>👥 Employee Directory</h2>
                <div className="d-flex gap-2">
                    <Link to="/dashboard" className="btn btn-outline-secondary">Back to Dashboard</Link>
                    <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancel' : '+ Add New Employee'}
                    </button>
                </div>
            </div>

            {/* --- ADD NEW USER FORM (Collapsible) --- */}
            {showForm && (
                <div className="card shadow-sm mb-4 bg-light border-success">
                    <div className="card-body">
                        <h5 className="card-title mb-3">Register New Employee</h5>
                        <form onSubmit={handleCreate}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Full Name</label>
                                    <input type="text" className="form-control" required 
                                        onChange={e => setFormData({...formData, name: e.target.value})} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Email</label>
                                    <input type="email" className="form-control" required 
                                        onChange={e => setFormData({...formData, email: e.target.value})} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Password</label>
                                    <input type="text" className="form-control" placeholder="Default: 12345678" required 
                                        onChange={e => setFormData({...formData, password: e.target.value})} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Role</label>
                                    <select className="form-select" onChange={e => setFormData({...formData, role: e.target.value})}>
                                        <option value="user">Staff (User)</option>
                                        <option value="office_head">Office Head</option>
                                        <option value="admin">System Admin</option>
                                    </select>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label>Assign Office</label>
                                    <select className="form-select" required onChange={e => setFormData({...formData, office_id: e.target.value})}>
                                        <option value="">-- Select Office --</option>
                                        {offices.map(office => (
                                            <option key={office.id} value={office.id}>{office.name} ({office.type})</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success w-100">Create Account</button>
                        </form>
                    </div>
                </div>
            )}

            {/* --- EMPLOYEE LIST TABLE --- */}
            <div className="card shadow-sm">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th>Name / Email</th>
                            <th>Role</th>
                            <th>Assigned Office</th>
                            <th>Status</th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <tr><td colSpan="5" className="text-center p-4">Loading...</td></tr> : 
                         users.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <div className="fw-bold">{user.name}</div>
                                    <div className="small text-muted">{user.email}</div>
                                </td>
                                <td>{getRoleBadge(user.role)}</td>
                                <td>
                                    {user.office ? (
                                        <span>🏢 {user.office.name}</span>
                                    ) : (
                                        <span className="text-danger small">Not Assigned</span>
                                    )}
                                </td>
                                <td><span className="badge bg-success rounded-pill">Active</span></td>
                                <td className="text-end">
                                    <button 
                                        onClick={() => handleDelete(user.id)} 
                                        className="btn btn-sm btn-outline-danger"
                                        title="Remove Employee"
                                    >
                                        🗑 Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;