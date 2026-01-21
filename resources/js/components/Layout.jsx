import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Layout = ({ children, title, user }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        axios.post('/api/logout').finally(() => {
            localStorage.removeItem('token');
            navigate('/');
        });
    };

    // Helper to make active links look "pressed"
    const isActive = (path) => location.pathname === path ? 'bg-primary text-white' : 'text-dark hover-bg-light';

    return (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f4f6f9' }}>
            {/* --- SIDEBAR --- */}
            <div className="bg-white shadow-sm d-flex flex-column p-3" style={{ width: '260px', minHeight: '100vh' }}>
                <div className="mb-4 text-center">
                    <h5 className="fw-bold text-primary">🚂 REMS Digital Dak</h5>
                    <small className="text-muted">Bangladesh Railway</small>
                </div>
                
                <hr className="text-muted" />

                <ul className="nav nav-pills flex-column mb-auto gap-2">
                    <li className="nav-item">
                        <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
                            🏠 Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/files" className={`nav-link ${isActive('/files')}`}>
                            📂 My Files (Inbox)
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/files/create" className={`nav-link ${isActive('/files/create')}`}>
                            ➕ Create New File
                        </Link>
                    </li>

                    {/* ADMIN ONLY LINKS */}
                    {(user?.role === 'admin' || user?.role === 'office_head') && (
                        <>
                            <li className="nav-item mt-3 text-uppercase small text-muted fw-bold">Administration</li>
                            <li>
                                <Link to="/archive" className={`nav-link ${isActive('/archive')}`}>
                                    🗄️ Master Archive
                                </Link>
                            </li>
                            {user.role === 'admin' && (
                                <li>
                                    <Link to="/users" className={`nav-link ${isActive('/users')}`}>
                                        👥 Employee Directory
                                    </Link>
                                </li>
                            )}
                        </>
                    )}
                </ul>

                <hr className="text-muted" />
                
                <div className="mt-auto">
                    <div className="d-flex align-items-center mb-2">
                        <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{width:'35px', height:'35px'}}>
                            {user?.name?.charAt(0)}
                        </div>
                        <div className="small lh-1">
                            <div className="fw-bold">{user?.name}</div>
                            <div className="text-muted" style={{fontSize: '0.75rem'}}>{user?.office?.name || 'No Office'}</div>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="btn btn-sm btn-outline-danger w-100">
                        🚪 Logout
                    </button>
                </div>
            </div>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-grow-1 p-4">
                {/* Top Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold text-dark">{title}</h3>
                    <span className="badge bg-white text-secondary border shadow-sm p-2">
                        📅 {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                </div>

                {/* The Page Content Goes Here */}
                <div className="bg-white p-4 rounded shadow-sm border">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;