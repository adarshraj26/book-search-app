import React, { useState } from 'react';
import { useDebounce } from 'react-use';

const SearchPage = ({ addBook }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addedBookKey, setAddedBookKey] = useState(null);

  const fetchBooks = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
      const data = await response.json();
      setResults(data.docs);
    } catch (err) {
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useDebounce(
    () => {
      if (query) {
        fetchBooks(query);
      } else {
        setResults([]);
      }
    },
    500,
    [query]
  );

  const handleAddBook = (book) => {
    addBook(book);
    setAddedBookKey(book.key);
    setTimeout(() => {
      setAddedBookKey(null);
    }, 2000);
  };

  return (
    <div className="container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input"
        placeholder="Search for books"
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
        {results.map(book => (
          <div key={book.key} className="bookCard">
            <h3>{book.title}</h3>
            <p>{book.author_name?.join(', ')}</p>
            <button
              onClick={() => handleAddBook(book)}
              className={`addButton ${addedBookKey === book.key ? 'added' : ''}`}
            >
              {addedBookKey === book.key ? 'Book is added!' : 'Add to Bookshelf'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
