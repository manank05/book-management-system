const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Book class to represent book details
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// Node class for linked list
class Node {
    constructor(book) {
        this.book = book;
        this.next = null;
    }
}

// LinkedList class for book management
class BookLinkedList {
    constructor() {
        this.head = null;
    }

    // Add a book to the list
    addBook(title, author, isbn) {
        const newBook = new Book(title, author, isbn);
        const newNode = new Node(newBook);
        
        if (!this.head) {
            this.head = newNode;
        } else {
            let temp = this.head;
            while (temp.next) {
                temp = temp.next;
            }
            temp.next = newNode;
        }
    }

    // Search for a book by title
    searchBook(title) {
        let temp = this.head;
        while (temp) {
            if (temp.book.title === title) {
                return temp.book;
            }
            temp = temp.next;
        }
        return null;
    }

    // Delete a book by ISBN
    deleteBook(isbn) {
        if (!this.head) return false;

        if (this.head.book.isbn === isbn) {
            this.head = this.head.next;
            return true;
        }

        let current = this.head;
        let previous = null;

        while (current && current.book.isbn !== isbn) {
            previous = current;
            current = current.next;
        }

        if (!current) return false;

        previous.next = current.next;
        return true;
    }

    // Display all books
    displayAllBooks() {
        const books = [];
        let temp = this.head;
        while (temp) {
            books.push(temp.book);
            temp = temp.next;
        }
        return books;
    }
}

const bookList = new BookLinkedList();

// Route for adding a book
app.post('/books', (req, res) => {
    const { title, author, isbn } = req.body;
    if (!title || !author || !isbn) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    bookList.addBook(title, author, isbn);
    res.status(201).json({ message: 'Book added successfully!' });
});

// Route for searching a book by title
app.get('/books', (req, res) => {
    const { title } = req.query;
    if (!title) {
        return res.status(400).json({ error: 'Title parameter missing' });
    }
    const book = bookList.searchBook(title);
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// Route for deleting a book by ISBN
app.delete('/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    const deleted = bookList.deleteBook(isbn);
    if (deleted) {
        res.status(200).json({ message: 'Book deleted successfully!' });
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// Route for displaying all books
app.get('/books/all', (req, res) => {
    const books = bookList.displayAllBooks();
    res.status(200).json(books);
});

// Start the Express server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});