import { useEffect, useState } from 'react';
import api from '../services/axios';

interface Purchase {
  id: number;
  userId: number;
  bookId: number;
  price: string;
  purchasedAt: string;
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

export default function MyPurchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    setLoading(true);
    try {
      const response = await api.get('/buy/my');
      console.log(response)
      setPurchases(response.data);
    } catch (error) {
      console.error('Failed to fetch purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-neutral-900">
        <h1 className="text-2xl font-semibold mb-6">My Purchases</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-neutral-900">
      <h1 className="text-2xl font-semibold mb-6">My Purchases</h1>

      {purchases.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-600">No purchased books yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {purchases.map((purchase) => (
            <div key={purchase.id} className="bg-[#d4d4d4] p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-1">{purchase.book.title}</h3>
              <p className="text-neutral-600 mb-2">{purchase.book.author}</p>
              <p className="text-sm text-neutral-700 mb-1">
                Price: ${purchase.price}
              </p>
              <p className="text-xs text-neutral-600">
                Purchased on: {new Date(purchase.purchasedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}