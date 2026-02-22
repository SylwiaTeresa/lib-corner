import "./BookDetailsModal.scss";
import { useEffect, useState } from "react";
import { useReadBooks } from "../../context/ReadBooksContext";
import { ReadBook } from "../../types/ReadBook";

type BookDetailsModalProps = {
  book: ReadBook;
  onClose: () => void;
};

export function BookDetailsModal({ book, onClose }: BookDetailsModalProps) {
  const { updateRead } = useReadBooks();

  const [rating, setRating] = useState<number | "">(book.rating || "");
  const [pages, setPages] = useState<number | "">(book.pages || "");
  const [review, setReview] = useState<string | "">(book.review ?? "");

  useEffect(() => {
    setRating(book.rating || "");
    setPages(book.pages || "");
    setReview(book.review ?? "");
  }, [book]);

  const handleSave = () => {
    const updates: Partial<ReadBook> = {};

    if (rating !== "") updates.rating = rating;
    if (pages !== "") updates.pages = pages;
    if (review !== "") updates.review = review;

    updateRead(book.key, updates);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>✖</button>

        <h2>{book.title}</h2>
          <label htmlFor="">
          Rating
          <input type="number" 
            min={0} max={5} 
            value={rating} 
            onChange={(e) => setRating((e.target.value === "" ? "" : Number(e.target.value)))} />
        </label>

        <label htmlFor="">
          Pages read
          <input type="number" 
            min={0} 
            value={pages} 
            onChange={(e) => setPages((e.target.value === "" ? "" : Number(e.target.value)))} />
        </label>

        <label htmlFor="">
          Notes
          <textarea value={review} onChange={(e) => setReview(e.target.value)}/>
        </label>

        <button className="primary" onClick={handleSave}>Save</button>        
      </div>
    </div>
  );
};