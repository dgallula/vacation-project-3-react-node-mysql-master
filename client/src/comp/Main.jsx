import React from 'react';
import { Routes, Route } from 'react-router-dom'
import CharAdmin from './CharAdmin';
import Login from './Login';
import Register from './Register';
import Vacations from './Vacations';


export default function Main() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Vacations />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chart" element={<CharAdmin />} />
            </Routes>
        </div>
    )
}
