#include <iostream>
#include <string>
using namespace std;

// Book class to represent book details
class Book
{
public:
    string title;
    string author;
    string isbn;

    Book(string t, string a, string i) : title(t), author(a), isbn(i) {}

    void displayBook()
    {
        cout << "Title: " << title << ", Author: " << author << ", ISBN: " << isbn << endl;
    }
};

// Node class for linked list
class Node
{
public:
    Book *book;
    Node *next;

    Node(Book *b) : book(b), next(nullptr) {}
};

// LinkedList class for book management
class BookLinkedList
{
private:
    Node *head;

public:
    BookLinkedList() : head(nullptr) {}

    // Add a book to the list
    void addBook(string title, string author, string isbn)
    {
        Book *newBook = new Book(title, author, isbn);
        Node *newNode = new Node(newBook);

        if (!head)
        {
            head = newNode;
        }
        else
        {
            Node *temp = head;
            while (temp->next)
            {
                temp = temp->next;
            }
            temp->next = newNode;
        }

        cout << "Book added successfully!" << endl;
    }

    // Search for a book by title
    void searchBook(string title)
    {
        Node *temp = head;
        while (temp)
        {
            if (temp->book->title == title)
            {
                cout << "Book found: ";
                temp->book->displayBook();
                return;
            }
            temp = temp->next;
        }
        cout << "Book not found!" << endl;
    }

    // Delete a book by ISBN
    void deleteBook(string isbn)
    {
        if (!head)
        {
            cout << "No books to delete." << endl;
            return;
        }

        // If the book to delete is the first book
        if (head->book->isbn == isbn)
        {
            Node *temp = head;
            head = head->next;
            delete temp->book;
            delete temp;
            cout << "Book deleted successfully!" << endl;
            return;
        }

        // If the book to delete is not the first book
        Node *current = head;
        Node *previous = nullptr;

        while (current && current->book->isbn != isbn)
        {
            previous = current;
            current = current->next;
        }

        if (!current)
        {
            cout << "Book not found!" << endl;
        }
        else
        {
            previous->next = current->next;
            delete current->book;
            delete current;
            cout << "Book deleted successfully!" << endl;
        }
    }

    // Display all books
    void displayAllBooks()
    {
        if (!head)
        {
            cout << "No books available." << endl;
            return;
        }

        Node *temp = head;
        while (temp)
        {
            temp->book->displayBook();
            temp = temp->next;
        }
    }

    // Destructor to free memory
    ~BookLinkedList()
    {
        Node *current = head;
        while (current)
        {
            Node *nextNode = current->next;
            delete current->book;
            delete current;
            current = nextNode;
        }
    }
};

// Main function to interact with the user
int main()
{
    BookLinkedList bookList;
    int choice;
    string title, author, isbn;

    do
    {
        cout << "\nBook Management System" << endl;
        cout << "1. Add a Book" << endl;
        cout << "2. Search for a Book" << endl;
        cout << "3. Delete a Book" << endl;
        cout << "4. Display All Books" << endl;
        cout << "5. Exit" << endl;
        cout << "Enter your choice (1-5): ";
        cin >> choice;

        switch (choice)
        {
        case 1:
            cout << "Enter book title: ";
            cin.ignore(); // Clear the buffer
            getline(cin, title);
            cout << "Enter book author: ";
            getline(cin, author);
            cout << "Enter book ISBN: ";
            getline(cin, isbn);
            bookList.addBook(title, author, isbn);
            break;

        case 2:
            cout << "Enter the title of the book to search: ";
            cin.ignore(); // Clear the buffer
            getline(cin, title);
            bookList.searchBook(title);
            break;

        case 3:
            cout << "Enter the ISBN of the book to delete: ";
            cin.ignore(); // Clear the buffer
            getline(cin, isbn);
            bookList.deleteBook(isbn);
            break;

        case 4:
            cout << "\nList of all books:" << endl;
            bookList.displayAllBooks();
            break;

        case 5:
            cout << "Exiting the system." << endl;
            break;

        default:
            cout << "Invalid choice. Please try again." << endl;
        }
    } while (choice != 5);

    return 0;
}