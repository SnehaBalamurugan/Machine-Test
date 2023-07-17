import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import MainPage from './Components/MainPage';
import AddEditUser from './Components/AddEditUser';
import Footer from './Components/Footer';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/main-page" element={<MainPage />} />
                    <Route path="/add-user" element={<AddEditUser />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
};

export default App;
