import { IBook } from "./book";

export type IStatus = "reading" | "will-read" | "finished";

export type IReadingStatusBook = {
  book: IBook;
  status: IStatus;
};

export type IReadingStatusData = {
  user: string;
  bookList: IReadingStatusBook[];
};
