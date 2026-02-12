// import DeleteBookModal from "./DeleteModal";

// interface Props {
//   book: any;
//   canBuy: boolean;
//   canDelete: boolean;
//   onDelete?: () => void;
// }

// export function BookCard({
//   book,
//   canBuy,
//   canDelete,
//   onDelete
// }: Props) {
//   return (
//     <div className="border rounded-lg p-4 bg-[#f4f4f4] shadow-md">
//       <h3 className="font-semibold text-lg">{book.title}</h3>
//       <p className="text-sm text-neutral-600">{book.author}</p>

//       <p className="mt-2 text-sm">
//         Available: {book.availableCopies}
//       </p>

//       <div className="flex gap-2 mt-4">
//         {canBuy && book.availableCopies > 0 && (
//           <><button className="px-3 py-1 bg-green-400 text-white rounded">
//             Buy
//           </button><button className="px-3 py-1 bg-blue-400 text-white rounded">
//               Rent
//             </button></>
//         )}
// {/* 
//         {canEdit && (
//           <><button className="px-3 py-1 bg-orange-300 text-black rounded">
            
//           </button><button className="px-3 py-1 bg-red-500 text-white rounded">
//               Delete
//             </button>
//         )} */}

//         {canDelete&& (
//           <DeleteBookModal
//           bookId={book.id}
//           bookTitle={book.title}
//           onSuccess={onDelete || (() =>{})}
//         />
//         )}
//       </div>
//     </div>
//   );
// }


import type { Book } from '../pages/Books';
import BuyBookModal from './BuyBookModal';
import DeleteBookModal from './DeleteModal';
import RentBookModal from './RentBookModal';

interface BookCardProps {
  book: Book;
  canBuy: boolean;
  canDelete: boolean;
  onDelete?: () => void;
}

export function BookCard({ book, canBuy, canDelete, onDelete }: BookCardProps) {
  return (
    <div className="bg-[#d4d4d4] p-4 rounded-lg">
      <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
      <p className="text-neutral-600 mb-2">{book.author}</p>
      <p className="text-sm text-neutral-700 mb-1">Price: ${book.price}</p>
      <p className="text-sm mb-4">Available: {book.availableCopies}</p>
      
      <div className="flex gap-2">
        {canBuy && book.availableCopies > 0 && (
          <>
            <BuyBookModal 
              bookId={book.id}
              bookTitle={book.title}
              price={book.price}
            />
            <RentBookModal 
              bookId={book.id}
              bookTitle={book.title}
              rentPrice={book.price * 0.1} // Adjust rent price logic as needed
            />
          </>
        )}
        
        {canDelete && (
          <DeleteBookModal
            bookId={book.id}
            bookTitle={book.title}
            onSuccess={onDelete || (() => {})}
          />
        )}
      </div>
    </div>
  );
}