import React from 'react';
import { toast } from 'react-toastify';

const BookshelfPage = ({ bookshelf, removeBook }) => {
  const handleRemoveBook = (bookKey) => {
    removeBook(bookKey);
    toast.error('Book removed from your shelf!');
  };

  return (
    <div className="container">
      <h2>My Bookshelf</h2>
      {bookshelf.map(book => (
        <div key={book.key} className="bookCard">
          <h3>{book.title}</h3>
          <p>{book.author_name?.join(', ')}</p>
          <button className="removeButton" onClick={() => handleRemoveBook(book.key)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default BookshelfPage;
