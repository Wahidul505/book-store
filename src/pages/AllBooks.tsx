/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import BookCard from "../components/BookCard";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/book";

const AllBooks = () => {
  const { data, isLoading, isSuccess, error } = useGetBooksQuery(undefined);
  const books: IBook[] = data?.data;

  return (
    <div className="pt-20">
      <div className="w-full flex justify-center">
        <input
          type="text"
          placeholder="Search books by title, author, or genre"
          className="input input-bordered rounded-none w-full max-w-xl h-12 text-lg"
        />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 px-10 mt-10 items-end gap-6">
        {books &&
          books.map((book: IBook, index: number) => (
            <BookCard key={index} book={book} />
          ))}
      </div>
    </div>
  );
};

export default AllBooks;
