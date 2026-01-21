import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const FileCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        subject: '',
        description: '',
        priority: 'normal',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/files', formData);
            alert("File created successfully!");
            navigate('/files'); // Redirect to the list
        } catch (error) {
            console.error("Error creating file:", error);
            alert("Failed to create file.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm" style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">📝 Start New File (Dak)</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* Subject */}
                        <div className="mb-3">
                            <label className="form-label">Subject</label>
                            <input 
                                type="text" className="form-control" required placeholder="e.g. Leave Application"
                                onChange={e => setFormData({...formData, subject: e.target.value})}
                            />
                        </div>

                        {/* Priority */}
                        <div className="mb-3">
                            <label className="form-label">Priority</label>
                            <select 
                                className="form-select"
                                onChange={e => setFormData({...formData, priority: e.target.value})}
                            >
                                <option value="normal">Normal</option>
                                <option value="urgent">Urgent</option>
                                <option value="top_priority">Top Priority</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                            <label className="form-label">Description / Notes</label>
                            <textarea 
                                className="form-control" rows="4"
                                onChange={e => setFormData({...formData, description: e.target.value})}
                            ></textarea>
                        </div>

                        {/* Buttons */}
                        <div className="d-flex justify-content-between">
                            <Link to="/files" className="btn btn-secondary">Cancel</Link>
                            <button type="submit" className="btn btn-primary">Create File</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FileCreate;