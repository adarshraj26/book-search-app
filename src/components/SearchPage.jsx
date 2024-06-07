import React, { useState } from 'react';
import { toast } from 'react-toastify';

const SearchPage = ({ addBook }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [addedBookKey, setAddedBookKey] = useState(null);

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value) {
      const response = await fetch(`https://openlibrary.org/search.json?q=${e.target.value}&limit=10&page=1`);
      const data = await response.json();
      setResults(data.docs);
    } else {
      setResults([]);
    }
  };

  const handleAddBook = (book) => {
    addBook(book);
    setAddedBookKey(book.key);
    toast.success('Book added to your shelf!');
    setTimeout(() => {
      setAddedBookKey(null);
    }, 1000);
  };

  return (
    <div className="container">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        className="input"
        placeholder="Search for books"
      />
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
