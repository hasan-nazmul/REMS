import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.jsx'; // Import the new layout!

const FileView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [user, setUser] = useState(null); // Need user to pass to Layout
    const [file, setFile] = useState(null);
    const [offices, setOffices] = useState([]);
    
    const [targetOffice, setTargetOffice] = useState('');
    const [remarks, setRemarks] = useState('');

    useEffect(() => {
        // Fetch User first (for layout)
        axios.get('/api/user').then(res => setUser(res.data));

        // Fetch File
        axios.get(`/api/files/${id}`)
            .then(res => {
                setFile(res.data.file);
                setOffices(res.data.offices);
            })
            .catch(() => navigate('/files'));
    }, [id]);

    const handleAction = async (actionType) => {
        if(!confirm(`Are you sure you want to ${actionType} this file?`)) return;
        
        const remarksInput = prompt("Enter remarks for this decision:", `${actionType} by officer`);
        if(!remarksInput) return;

        try {
            await axios.post(`/api/files/${id}/status`, {
                status: actionType,
                remarks: remarksInput
            });
            alert("Status Updated!");
            // Reload page to show new status
            window.location.reload();
        } catch (err) {
            alert("Failed to update status.");
        }
    };

    const handleForward = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/files/${id}/forward`, { to_office_id: targetOffice, remarks });
            alert("File Forwarded!");
            navigate('/files');
        } catch (err) {
            alert("Failed.");
        }
    };

    if (!file || !user) return <div className="p-5 text-center">Loading...</div>;

    return (
        <Layout title={`Tracking File #${file.id}`} user={user}>
            <div className="row">
                <div className="col-md-8">
                    {/* FILE INFO CARD */}
                    <div className="card shadow-sm mb-4 border-primary">
                        <div className="card-header bg-primary text-white d-flex justify-content-between">
                            <h5 className="mb-0">{file.subject}</h5>
                            <span className="badge bg-light text-dark">{file.status}</span>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">{file.description}</p>
                            <div className="d-flex gap-3 mt-3">
                                <div className="p-2 bg-light rounded border">
                                    <small className="text-muted d-block">Current Location</small>
                                    <strong>🏢 {file.current_office?.name || 'Unknown'}</strong>
                                </div>
                                <div className="p-2 bg-light rounded border">
                                    <small className="text-muted d-block">Created By</small>
                                    <strong>👤 {file.creator?.name}</strong>
                                </div>
                                <div className="p-2 bg-light rounded border">
                                    <small className="text-muted d-block">Priority</small>
                                    <strong>⚡ {file.priority}</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* HISTORY TIMELINE */}
                    <h5 className="text-secondary border-bottom pb-2">📜 History & Decisions</h5>
                    <div className="list-group list-group-flush">
                        {file.movements?.map(move => (
                            <div key={move.id} className="list-group-item">
                                <div className="d-flex justify-content-between">
                                    <strong>{move.action}</strong>
                                    <small className="text-muted">{new Date(move.created_at).toLocaleString()}</small>
                                </div>
                                <p className="mb-0 small text-muted">
                                    User: {move.user?.name} | Note: <span className="fst-italic">"{move.remarks}"</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-md-4">
                    {/* ACTION PANEL */}
                    <div className="card shadow-sm border-0 bg-light">
                        <div className="card-body">
                            <h5 className="card-title">⚡ Actions</h5>
                            <hr />
                            
                            {/* DECISION BUTTONS */}
                            <div className="d-grid gap-2 mb-4">
                                <button onClick={() => handleAction('Approved')} className="btn btn-success text-white">
                                    ✅ Approve File
                                </button>
                                <button onClick={() => handleAction('Rejected')} className="btn btn-danger text-white">
                                    ❌ Reject File
                                </button>
                            </div>

                            <hr />

                            {/* FORWARD FORM */}
                            <form onSubmit={handleForward}>
                                <label className="form-label fw-bold">Forward to Office:</label>
                                <select className="form-select mb-2" onChange={e => setTargetOffice(e.target.value)} required>
                                    <option value="">Select...</option>
                                    {offices.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                                </select>
                                <textarea className="form-control mb-2" placeholder="Remarks..." onChange={e => setRemarks(e.target.value)} required></textarea>
                                <button className="btn btn-primary w-100">Forward ➤</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FileView;