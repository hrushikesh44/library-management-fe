import { useState } from 'react';
import api from '../services/axios';

export default function AddBookModal({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    price: '',
    rentPrice: '',
    totalCopies: '',
  });

  async function submit() {
    await api.post('/books', {
      ...form,
      price: Number(form.price),
      rentPrice: Number(form.rentPrice),
      totalCopies: Number(form.totalCopies),
    });

    setOpen(false);
    onSuccess();
  }

  if (!open)
    return (
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-neutral-900 text-white rounded-md"
      >
        Add Book
      </button>
    );

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-[#f4f4f4] p-6 rounded-xl w-96">
        <h2 className="text-lg font-semibold mb-4">Add Book</h2>

        {Object.keys(form).map(key => (
          <input
            key={key}
            placeholder={key}
            className="w-full mb-3 p-2 border rounded-md"
            value={(form as any)[key]}
            onChange={e =>
              setForm({ ...form, [key]: e.target.value })
            }
          />
        ))}

        <div className="flex gap-2 mt-4">
          <button
            onClick={submit}
            className="flex-1 bg-neutral-900 text-white py-2 rounded-md"
          >
            Save
          </button>
          <button
            onClick={() => setOpen(false)}
            className="flex-1 border py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
