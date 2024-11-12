import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Col, Row, Alert } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import '../App.css';
import BookForm from './BookForm';
import { Link } from 'react-router-dom';

function BookList() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch books data from the API
    const fetchData = () => {
        fetch('http://127.0.0.1:8000/api/books')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Handle delete book with confirmation
    const handleDelete = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this book?');
        if (isConfirmed) {
            fetch(`http://127.0.0.1:8000/api/books/${id}`, {
                method: 'DELETE',
            })
                .then(() => {
                    // Update state after successful deletion
                    const updatedData = data.filter((book) => book.id !== id);
                    setData(updatedData);
                    setSuccessMessage('Book deleted successfully!');
                })
                .catch((error) => {
                    window.confirm('Interal server error. Please come back again later.');
                    console.error('Error deleting book:', error)
                })
        }
    };

    // Handle opening the modal for adding a new book
    const handleAdd = () => {
        setSelectedBook(null); 
        setShowModal(true); 
    };

    // Handle opening the modal for editing an existing book
    const handleEdit = (book) => {
        setSelectedBook(book); 
        setShowModal(true); 
    };

    return (
        <div>
            <div className="mt-4 custom-container">
                <Row>
                    <Col>
                    <h1>Book Management</h1>
                    </Col>
                    
                    <Col className='d-flex justify-content-end'>
                        <Button onClick={handleAdd} variant="outline-primary" className="mb-3 ">
                        Add New Book
                        </Button>
                    </Col>
                </Row>

                <Table hover responsive className="custom-table">
                    <thead className="text-center">
                        <tr>
                            <th className='p-4'>Title</th>
                            <th className='p-4'>Description</th>
                            <th className='p-4'>Author</th>
                            <th>Published <br/>Year</th>
                            <th className='p-4'>Genre</th>
                            <th className='p-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No books available at this moment. Please come back again later.
                                </td>
                            </tr>
                        ) : 
                        (data.map((book) => (
                            <tr key={book.id}>
                                <td width={"200px"} className="text-center p-3">{book.title}</td>
                                <td width={"800px"} className='p-3'>{book.description}</td>
                                <td width={"300px"} className="text-center p-3">{book.author}</td>
                                <td width={"100px"} className="text-center p-3">{book.published_year}</td>
                                <td width={"200px"} className="text-center p-3">{book.genre}</td>
                                <td className="text-center p-3" width={"300"}>
                                    <Link to={`/books/${book.id}`} className="btn btn-outline-warning btn-sm mx-1">
                                        <FaEye/> View
                                    </Link>
                                    <Button
                                        onClick={() => handleEdit(book)}
                                        variant="outline-success"
                                        size="sm"
                                        className="mx-1"
                                    >
                                        <FaEdit/> Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(book.id)}
                                        variant="outline-danger"
                                        size="sm"
                                        className="mx-1"
                                    >
                                        <FaTrash /> Delete
                                    </Button>
                                </td>
                            </tr>
                        )))}                       
                    </tbody>
                </Table>
                {successMessage && (
                    <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
                        {successMessage}
                    </Alert>                   
                )}
            </div>
      
            <BookForm
                show={showModal}
                onHide={() => setShowModal(false)}
                book={selectedBook}
                onAddBook={fetchData}
                onUpdateBook={fetchData}
            />
        </div>
    );
}

export default BookList;

