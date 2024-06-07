import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import BookshelfPage from './components/BookshelfPage';
import Navbar from './components/Navbar';
import SearchPage from './components/SearchPage';

const App = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  const addBook = (book) => {
    const isAlreadyInShelf = bookshelf.some(b => b.key === book.key);
    if (!isAlreadyInShelf) {
      const newBookshelf = [...bookshelf, book];
      setBookshelf(newBookshelf);
      localStorage.setItem('bookshelf', JSON.stringify(newBookshelf));
    }
  };

  const removeBook = (bookKey) => {
    const newBookshelf = bookshelf.filter(book => book.key !== bookKey);
    if (newBookshelf.length !== bookshelf.length) {
      setBookshelf(newBookshelf);
      localStorage.setItem('bookshelf', JSON.stringify(newBookshelf));
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchPage addBook={addBook} />} />
        <Route path="/bookshelf" element={<BookshelfPage bookshelf={bookshelf} removeBook={removeBook} />} />
      </Routes>
    </Router>
  );
};

export default App;
