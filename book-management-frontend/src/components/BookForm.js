import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form, Button, Col, Row, Alert } from 'react-bootstrap';
import '../App.css';


function BookForm(props) {
    // State for form fields
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [published_year, setPublishedYear] = useState('');
    const [genre, setGenre] = useState('');
    
    // State for error messages
    const [titleError, setTitleError] = useState('');
    const [authorError, setAuthorError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [publishedYearError, setPublishedYearError] = useState('');
    const [genreError, setGenreError] = useState('');

    const [successMessage, setSuccessMessage] = useState('');

    // Effect to prefill form in edit mode
    useEffect(() => {
        if (props.book) {
            prefillForm();
        } else {
            resetForm();
        }
    }, [props.book]);

    // Function to prefill the form
    const prefillForm = () => {
        setTitle(props.book.title || '');
        setAuthor(props.book.author || '');
        setDescription(props.book.description || '');
        setPublishedYear(props.book.published_year || '');
        setGenre(props.book.genre || '');
    };

    // Function to reset the form
    const resetForm = () => {
        setTitle('');
        setAuthor('');
        setDescription('');
        setPublishedYear('');
        setGenre('');
        setSuccessMessage('');
    };

    const clearErrors = () => {
        setTitleError('');
        setAuthorError('');
        setDescriptionError('');
        setPublishedYearError('');
        setGenreError('');
    };


    // Function to handle the form submission for adding a new book
    const handleAddBook = () => {
              
        const bookData = { title, author, description, published_year, genre };

        fetch('http://127.0.0.1:8000/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        })
        
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            setSuccessMessage('Book added successfully!');
            props.onAddBook(); 
            props.onHide(); 
        })
        .catch((error) => {
            window.confirm('Interal server error. Please come back again later.');
            console.error('Error adding book:', error);
        });
       
    };

    // Function to handle the form submission for updating an existing book
    const handleEditBook = () => {
        const bookData = { title, author, description, published_year, genre };

        console.log("Book data to update:", bookData);
        console.log("Book ID:", props.book?.id);

        fetch(`http://127.0.0.1:8000/api/books/${props.book.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                console.log('heres the book:', props);
                setSuccessMessage('Book updated successfully!');
                props.onUpdateBook(); 
                props.onHide(); 
            })
            .catch((error) => {      
                window.confirm('Internal Server error. Please come back again later.');        
                console.error('Error updating book:', error);
            });
    };

    // Main form submission handler
    const handleSubmit = (e) => {

        e.preventDefault();
        clearErrors();

        let isValid = true;

        if (!title) {
            setTitleError('Title is required.');
            isValid = false;
        }
        if (!author) {
            setAuthorError('Author is required.');
            isValid = false;
        }
        if (!description) {
            setDescriptionError('Description is required.');
            isValid = false;
        }
        if (!published_year) {
            setPublishedYearError('Published year is required.');
            isValid = false;
        }
        if (published_year <= 0) {
            setPublishedYearError('Published year must be a positive number.');
            isValid = false;
        }
        if (!genre) {
            setGenreError('Genre is required.');
            isValid = false;
        }

        if (isValid) {
            if (props.book) {
                handleEditBook();
            } else {
                handleAddBook();
            }
        }
    };

    return (
        <div className='custom-container'>
        {successMessage && (
            <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
                {successMessage}
            </Alert>          
        )}
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            keyboard={false}
        >
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.book ? 'Edit Book' : 'Add Book'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>                  
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="title">
                                <Form.Label className="fw-bold">Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter title"
                                    autoFocus
                                />
                                {titleError && <div className="text-danger">{titleError}</div>}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="author">
                                <Form.Label className="fw-bold">Author</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    placeholder="Enter author"
                                />
                                {authorError && <div className="text-danger">{authorError}</div>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="description">
                                <Form.Label className="fw-bold">Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter description"
                                />
                                {descriptionError && <div className="text-danger">{descriptionError}</div>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="year">
                                <Form.Label className="fw-bold">Published Year</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={published_year}
                                    onChange={(e) => setPublishedYear(e.target.value)}
                                    placeholder="Enter year"
                                />
                                {publishedYearError && <div className="text-danger">{publishedYearError}</div>}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="genre">
                                <Form.Label className="fw-bold">Genre</Form.Label>
                                {/* <Form.Control
                                    type="text"
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    placeholder="Enter genre"
                                /> */}
                                <Form.Select value={genre} onChange={(e) => setGenre(e.target.value)}>
                                    <option value="" disabled>Choose...</option>
                                    <option>Scifi</option>
                                    <option>Romance</option>
                                    <option>Family</option>
                                    <option>Kids</option>
                                    <option>Horror</option>
                                    <option>Entertainement</option>
                                    <option>Drama</option>
                                    <option>Comedy</option>
                                    <option>Thrill</option>     
                                </Form.Select>
                                {genreError && <div className="text-danger">{genreError}</div>}
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary">
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </div>
    );
}

export default BookForm;
