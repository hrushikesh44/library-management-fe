import { useState } from 'react';
import api from '../services/axios';

interface DeleteBookModalProps {
  bookId: number;
  bookTitle: string;
  onSuccess: () => void;
}

export default function DeleteBookModal({ bookId, bookTitle, onSuccess }: DeleteBookModalProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await api.delete(`/books/${bookId}`);
      setOpen(false);
      onSuccess();
    } catch (error) {
      console.error('Failed to delete book:', error);
    } finally {
      setIsDeleting(false);
    }
  }

  if (!open)
    return (
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-1 bg-[#dc2626] text-white rounded-md hover:bg-[#b91c1c]"
      >
        Delete
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
        <h2 className="text-lg font-semibold mb-2 text-neutral-900">Delete Book</h2>
        <p className="text-neutral-600 mb-6">
          Are you sure you want to delete "<span className="font-medium">{bookTitle}</span>"? This action cannot be undone.
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 bg-[#dc2626] text-white py-2 rounded-md hover:bg-[#b91c1c] disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
          <button
            onClick={() => setOpen(false)}
            disabled={isDeleting}
            className="flex-1 border border-neutral-300 py-2 rounded-md hover:bg-neutral-100 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}