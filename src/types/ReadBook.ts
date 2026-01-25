import type { Book } from "./Book";

export type ReadBook = Book & {
    rating: number;
    review: string;
    pages: number;
    finishedAt: string;
};