import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({ pending: 0, processed: 0 });

    useEffect(() => {
        // Fetch User Data
        axios.get('/api/user')
            .then(res => setUser(res.data))
            .catch(() => navigate('/'));

        // Optional: Fetch quick stats (We can implement the API for this later)
        // axios.get('/api/stats').then(res => setStats(res.data));
    }, [navigate]);

    if (!user) return null; // Or a loading spinner

    return (
        <Layout title="Dashboard" user={user}>
            <div className="row g-4">
                {/* Welcome Card */}
                <div className="col-12">
                    <div className="alert alert-primary d-flex align-items-center" role="alert">
                        <div className="fs-1 me-3">👋</div>
                        <div>
                            <h4 className="alert-heading mb-0">Welcome back, {user.name}!</h4>
                            <p className="mb-0">You are currently logged in as <strong>{user.role}</strong> at <strong>{user.office?.name}</strong>.</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm bg-warning bg-gradient text-dark">
                        <div className="card-body text-center p-4">
                            <h1 className="display-4">📂</h1>
                            <h5>My Inbox</h5>
                            <p className="small">Check pending files on your desk.</p>
                            <Link to="/files" className="btn btn-light w-100 stretched-link fw-bold">View Files</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm bg-success bg-gradient text-white">
                        <div className="card-body text-center p-4">
                            <h1 className="display-4">➕</h1>
                            <h5>New File</h5>
                            <p className="small">Initiate a new Dak or proposal.</p>
                            <Link to="/files/create" className="btn btn-light w-100 stretched-link fw-bold text-success">Create File</Link>
                        </div>
                    </div>
                </div>

                {/* Only Show for Admin/Head */}
                {(user.role === 'admin' || user.role === 'office_head') && (
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm bg-secondary bg-gradient text-white">
                            <div className="card-body text-center p-4">
                                <h1 className="display-4">🗄️</h1>
                                <h5>Archive</h5>
                                <p className="small">Search global file history.</p>
                                <Link to="/archive" className="btn btn-light w-100 stretched-link fw-bold text-secondary">Search Archive</Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Dashboard;