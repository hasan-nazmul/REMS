import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FileArchive = () => {
    const [files, setFiles] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = () => {
        setLoading(true);
        axios.get(`/api/files/search/all?q=${search}`)
            .then(res => {
                console.log("Archive Data:", res.data); // Debug log
                setFiles(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Archive Error:", err);
                setLoading(false);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchFiles();
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">🗄️ Master File Archive (Global Search)</h2>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="d-flex mb-4 gap-2">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search by file subject..." 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {/* Results Table */}
            <div className="card shadow-sm">
                {loading ? (
                    <div className="p-4 text-center">Loading Archive...</div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Subject</th>
                                    <th>Current Location</th>
                                    <th>Created By</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center p-3">No files found.</td>
                                    </tr>
                                ) : (
                                    files.map(file => (
                                        <tr key={file.id}>
                                            <td>#{file.id}</td>
                                            <td>{file.subject}</td>
                                            <td>
                                                <span className={`badge ${file.current_office ? 'bg-warning text-dark' : 'bg-danger'}`}>
                                                    {/* SAFETY CHECK: Prevent crash if office is null */}
                                                    {file.current_office?.name || file.currentOffice?.name || 'Unknown Location'}
                                                </span>
                                            </td>
                                            <td>
                                                {/* SAFETY CHECK: Prevent crash if creator is null */}
                                                {file.creator?.name || 'Unknown User'}
                                            </td>
                                            <td>
                                                <Link to={`/files/${file.id}`} className="btn btn-sm btn-outline-primary">
                                                    Track 📍
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileArchive;