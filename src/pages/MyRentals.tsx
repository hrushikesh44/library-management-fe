import { useEffect, useState } from 'react';
import api from '../services/axios';

interface Rental {
  id: number;
  userId: number;
  bookId: number;
  rentedAt: string;
  returnedAt: string | null;
  book: {
    id: number;
    title: string;
    author: string;
    isbn: string;
    price: string;
    rentPrice: string;
    totalCopies: number;
    availableCopies: number;
    createdAt: string;
    updatedAt: string;
  };
}

export default function MyRentals() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    setLoading(true);
    try {
      const response = await api.get('/rent/my');
      setRentals(response.data);
    } catch (error) {
      console.error('Failed to fetch rentals:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-neutral-900">
        <h1 className="text-2xl font-semibold mb-6">My Rentals</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-neutral-900">
      <h1 className="text-2xl font-semibold mb-6">My Rentals</h1>

      {rentals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-600">No rented books yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rentals.map((rental) => (
            <div key={rental.id} className="bg-[#d4d4d4] p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{rental.book.title}</h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  rental.returnedAt 
                    ? 'bg-green-600 text-white' 
                    : 'bg-neutral-600 text-white'
                }`}>
                  {rental.returnedAt ? 'Returned' : 'Active'}
                </span>
              </div>
              <p className="text-neutral-600 mb-2">{rental.book.author}</p>
              <p className="text-sm text-neutral-700 mb-1">
                Rent Price: ${rental.book.rentPrice}
              </p>
              <p className="text-xs text-neutral-600 mb-1">
                Rented on: {new Date(rental.rentedAt).toLocaleDateString()}
              </p>
              {rental.returnedAt && (
                <p className="text-xs text-neutral-600">
                  Returned on: {new Date(rental.returnedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}