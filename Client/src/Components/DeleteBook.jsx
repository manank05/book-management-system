// DeleteBook.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { deleteBook } from '../Services/bookService.js'; // Assume this service handles book deletion

function DeleteBook() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState(''); // To store the response message

  // Function to handle deletion
  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await deleteBook(data.isbn); // Call the service to delete the book
      if (response.success) {
        setMessage('Book deleted successfully!');
      } else {
        setMessage('Book not found or could not be deleted.');
      }
    } catch (error) {
      setMessage('Error deleting the book.'); // Handle any fetch errors
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Delete a Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* ISBN Field */}
        <div>
          <input
            type="text"
            placeholder="Enter book ISBN"
            {...register('isbn', { 
              required: 'ISBN is required', 
              pattern: {
                value: /^[0-9-]+$/,
                message: 'ISBN should contain only numbers and dashes'
              } 
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.isbn && <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          Delete Book
        </button>
      </form>

      {/* Display Response Message */}
      {message && <p className="text-lg mt-4">{message}</p>}
    </div>
  );
}

export default DeleteBook;