import { useAuth } from '../auth/AuthContext';
import { useEffect, useState } from 'react';
import api from '../services/axios';
import { BookCard } from '../components/BookCard';
import AddBookModal from '../components/AddBookModal';

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  availableCopies: number;
}

export default function Books() {
  const { roles } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);

  const isAdmin = roles.includes('admin');
  const isLibrarian = roles.includes('librarian');
  const isUser = roles.includes('user');

  useEffect(() => {
    api.get('/books').then(res => setBooks(res.data));
  }, []);

  const refreshBooks = () => {
    api.get('/books').then(res => setBooks(res.data));
  }

  return (
    <div className="p-6 text-neutral-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Books</h1>

        {(isAdmin || isLibrarian) && (
          <AddBookModal onSuccess={refreshBooks} />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map(book => (
          <BookCard
            key={book.id}
            book={book}
            canBuy={isUser}
            canDelete={isAdmin || isLibrarian}
            onDelete={refreshBooks}
          />
        ))}
      </div>
    </div>
  );
}
