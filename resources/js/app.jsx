import './bootstrap';
import '../sass/app.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* We will add a Login route here later */}
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

// It must match 'app' from the HTML above
if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));
    Index.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}