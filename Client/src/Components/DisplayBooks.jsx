import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../Services/bookService.js'; // Assume this service retrieves all books

function DisplayBooks() {
  const [books, setBooks] = useState([]); // State to store the list of books
  const [errorMsg, setErrorMsg] = useState(''); // To handle any fetch errors

  // Function to fetch books
  const fetchBooks = async () => {
    try {
      const bookList = await getAllBooks();
      setBooks(bookList);
      setErrorMsg('');
    } catch (error) {
      console.error(error); // Log error to get details
      setErrorMsg('Error fetching books');
      setBooks([]);
    }
  };
  

  // Fetch books when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">List of Books</h2>
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}

      {books.length === 0 ? (
        <p className="text-gray-600">No books available.</p> // Message when no books are found
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.isbn} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
              <h3 className="font-semibold">{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DisplayBooks;