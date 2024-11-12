import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function BookDetails() {
    const { id } = useParams(); // Access book ID from route params
    const [book, setBook] = useState(null);
    const navigate = useNavigate(); // For navigating back

    // Fetch book details
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/books/${id}`)
            .then((response) => response.json())
            .then((data) => setBook(data))
            .catch((error) => console.error('Error fetching book details:', error));
    }, [id]);

    if (!book) {
        return <p className='text-white'>Internal Server Error. Please come back again later.</p>;
    }

    return (
        <Container className="mt-4">
            <Card className="shadow">
                <Card.Header className="bg-dark text-white text-center">
                    <h3 className="mt-2">{book.title}</h3>
                </Card.Header>
                <Card.Body>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Description:</strong> {book.description}</p>
                    <p><strong>Published Year:</strong> {book.published_year}</p>
                    <p><strong>Genre:</strong> {book.genre}</p>
                </Card.Body>
                <Card.Footer className="text-center">
                    <Button variant="primary" onClick={() => navigate('/')}>
                        Back to Book List
                    </Button>
                </Card.Footer>
            </Card>
        </Container>
    );
}

export default BookDetails;
