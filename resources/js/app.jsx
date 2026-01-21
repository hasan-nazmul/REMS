import './bootstrap';
import '../sass/app.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Files from './pages/Files.jsx';
import FileCreate from './pages/FileCreate.jsx';

// Import your pages
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Users from './pages/Users.jsx';
import UserCreate from './pages/UserCreate.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/create" element={<UserCreate />} />
                <Route path="/files" element={<Files />} />
                <Route path="/files/create" element={<FileCreate />} />
            </Routes>
        </BrowserRouter>
    );
}

// Logic to attach React to the HTML
if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));
    Index.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}