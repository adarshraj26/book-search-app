import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const newBookshelf = [...bookshelf, book];
    setBookshelf(newBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(newBookshelf));
  };

  const removeBook = (bookKey) => {
    const newBookshelf = bookshelf.filter(book => book.key !== bookKey);
    setBookshelf(newBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(newBookshelf));
  };

  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SearchPage addBook={addBook} />} />
        <Route path="/bookshelf" element={<BookshelfPage bookshelf={bookshelf} removeBook={removeBook} />} />
      </Routes>
    </Router>
  );
};

export default App;
