// AddBook.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { addBook } from '../Services/bookService.js';

function AddBook() {
  // Initialize the form with useForm hook from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Define submit function to handle form submission
  const onSubmit = async (data) => {
    console.log(data)
    try {
      await addBook(data); // Call the service to add book (backend logic here)
      alert('Book added successfully!');
      reset(); // Clear the form after successful submission
    } catch (error) {
      alert('Failed to add book');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Add a New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Title Field */}
        <div>
          <input
            type="text"
            placeholder="Title"
            {...register('title', { required: 'Title is required' })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Author Field */}
        <div>
          <input
            type="text"
            placeholder="Author"
            {...register('author', { required: 'Author is required' })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
        </div>

        {/* ISBN Field */}
        <div>
          <input
            type="text"
            placeholder="ISBN"
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
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;