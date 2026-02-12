import { useState } from 'react';
import api from '../services/axios';

interface BuyBookModalProps {
  bookId: number;
  bookTitle: string;
  price: number;
  onSuccess?: () => void;
}

export default function BuyBookModal({ bookId, bookTitle, price, onSuccess }: BuyBookModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    try {
      await api.post(`/buy/${bookId}`);
      setOpen(false);
      onSuccess?.();
      alert('Book purchased successfully!');
      await api.get('/books')
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to purchase book');
    } finally {
      setLoading(false);
    }
  }

  if (!open)
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex-1 px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800"
      >
        Buy
      </button>
    );

  return (
    <div 
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={() => setOpen(false)}
    >
      <div 
        className="bg-[#f4f4f4] p-6 rounded-xl w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-2 text-neutral-900">Purchase Book</h2>
        <p className="text-neutral-600 mb-4">
          Do you want to purchase "<span className="font-medium">{bookTitle}</span>" for ${price}?
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleBuy}
            disabled={loading}
            className="flex-1 bg-neutral-900 text-white py-2 rounded-md hover:bg-neutral-800 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Confirm Purchase'}
          </button>
          <button
            onClick={() => setOpen(false)}
            disabled={loading}
            className="flex-1 border border-neutral-300 py-2 rounded-md hover:bg-neutral-100 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}