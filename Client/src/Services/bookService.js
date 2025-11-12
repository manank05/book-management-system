// services/bookService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/books'; // Replace with your actual API URL

// Function to get all books
export const getAllBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data; // Axios automatically parses JSON
  } catch (error) {
    throw new Error('Failed to fetch books: ' + error.message);
  }
};

// Function to add a book
export const addBook = async (book) => {
  try {
    const response = await axios.post(API_URL, book);
    return response.data; // Return the added book data
  } catch (error) {
    throw new Error('Failed to add book: ' + error.message);
  }
};

// Function to search for a book by title
export const searchBook = async (title) => {
  try {
    const response = await axios.get(`${API_URL}?title=${encodeURIComponent(title)}`);
    return response.data; // Return the search results
  } catch (error) {
    throw new Error('Failed to fetch book: ' + error.message);
  }
};

// Function to delete a book by ISBN
export const deleteBook = async (isbn) => {
  try {
    await axios.delete(`${API_URL}/${isbn}`);
    return { success: true }; // Return success status
  } catch (error) {
    throw new Error('Failed to delete book: ' + error.message);
  }
};