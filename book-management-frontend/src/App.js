import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BookList/>} />
                <Route path="/books/:id" element={<BookDetails/>} /> 
            </Routes>
        </Router>
    );
}

export default App;
