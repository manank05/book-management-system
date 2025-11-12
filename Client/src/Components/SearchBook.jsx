// SearchBook.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { searchBook } from '../Services/bookService.js'; // Assume you have a service to handle searching books

function SearchBook() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [book, setBook] = useState(null); // To store search results
  const [errorMsg, setErrorMsg] = useState(''); // To handle errors

  // Function to handle search submission
  const onSubmit = async (data) => {
    console.log(data)
    try {
      const result = await searchBook(data.title); // Assume searchBook fetches book details
      if (result) {
        setBook(result); // Set the found book
        setErrorMsg(''); // Clear any previous error messages
      } else {
        setBook(null); // Clear book if not found
        setErrorMsg('Book not found'); // Set error message if not found
      }
    } catch (error) {
      setBook(null);
      setErrorMsg('Error fetching book'); // Handle any fetch errors
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Search for a Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title Field */}
        <div>
          <input
            type="text"
            placeholder="Enter book title"
            {...register('title', { required: 'Title is required' })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Display Search Result */}
      {errorMsg && <p className="text-red-500 text-lg mt-4">{errorMsg}</p>}
      {book && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50 shadow-sm">
          <p><strong>Title:</strong> {book.title}</p>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
        </div>
      )}
    </div>
  );
}

export default SearchBook;