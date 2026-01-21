import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

// --- GLOBAL SECURITY CONFIGURATION ---
// 1. Disable Cookies (to stop the "Zombie" login issue)
axios.defaults.withCredentials = false; 

// 2. Automatically attach the Token to EVERY request
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
// -------------------------------------

import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Users from './pages/Users.jsx';
import Files from './pages/Files.jsx';
import FileCreate from './pages/FileCreate.jsx';
import FileView from './pages/FileView.jsx';
import FileArchive from './pages/FileArchive.jsx';

ReactDOM.createRoot(document.getElementById('app')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/files" element={<Files />} />
            <Route path="/files/create" element={<FileCreate />} />
            <Route path="/files/:id" element={<FileView />} />
            <Route path="/archive" element={<FileArchive />} />
        </Routes>
    </BrowserRouter>
);