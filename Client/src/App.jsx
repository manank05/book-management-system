import React, { useState } from 'react';
import AddBook from './Components/AddBook';
import SearchBook from './Components/SearchBook';
import DeleteBook from './Components/DeleteBook';
import DisplayBooks from './Components/DisplayBooks';

function App() {
  const [activeTab, setActiveTab] = useState('Add');

  const renderContent = () => {
    switch (activeTab) {
      case 'Add':
        return <AddBook />;
      case 'Search':
        return <SearchBook />;
      case 'Delete':
        return <DeleteBook />;
      case 'Display':
        return <DisplayBooks />;
      default:
        return <AddBook />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <header className="text-3xl font-bold text-blue-600 my-6">Library Management System</header>
      
      <nav className="flex space-x-4 mb-6">
        <button 
          onClick={() => setActiveTab('Add')} 
          className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'Add' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
          Add Book
        </button>
        <button 
          onClick={() => setActiveTab('Search')} 
          className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'Search' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
          Search Book
        </button>
        <button 
          onClick={() => setActiveTab('Delete')} 
          className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'Delete' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
          Delete Book
        </button>
        <button 
          onClick={() => setActiveTab('Display')} 
          className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'Display' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
          Display All Books
        </button>
      </nav>
      
      <main className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;