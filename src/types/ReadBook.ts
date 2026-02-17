import type { Book } from "./Book";

export type ReadBook = Book & {
    finishedAt: string;
    pages: number;
    rating: number;
    review: string;
};