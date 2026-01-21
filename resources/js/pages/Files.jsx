import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Files = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch files currently in my office
        axios.get('/api/files')
            .then(res => {
                setFiles(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching files:", err);
                setLoading(false);
            });
    }, []);

    // Helper for badge colors
    const getPriorityBadge = (priority) => {
        if (priority === 'top_priority') return <span className="badge bg-danger">Top Priority</span>;
        if (priority === 'urgent') return <span className="badge bg-warning text-dark">Urgent</span>;
        return <span className="badge bg-secondary">Normal</span>;
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>📂 My Office Files (Dak)</h2>
                <div>
                    <Link to="/files/create" className="btn btn-primary me-2">+ Create New File</Link>
                    <Link to="/dashboard" className="btn btn-secondary">Back</Link>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body p-0">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Subject</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Created By</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" className="text-center p-3">Loading...</td></tr>
                            ) : files.length === 0 ? (
                                <tr><td colSpan="5" className="text-center p-3">No files found on your desk.</td></tr>
                            ) : (
                                files.map(file => (
                                    <tr key={file.id}>
                                        <td>
                                            <strong>{file.subject}</strong>
                                            <div className="text-muted small text-truncate" style={{maxWidth: '300px'}}>
                                                {file.description}
                                            </div>
                                        </td>
                                        <td>{getPriorityBadge(file.priority)}</td>
                                        <td><span className="badge bg-info text-dark">{file.status}</span></td>
                                        <td>{file.creator ? file.creator.name : 'Unknown'}</td>
                                        <td>{new Date(file.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Files;