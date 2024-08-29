import React from 'react';
import './App.css';
import './components/productTable'
import { Outlet } from 'react-router';

function App() {
    return (
        <>
        <Outlet />
        </>
    );
}

export default App;
