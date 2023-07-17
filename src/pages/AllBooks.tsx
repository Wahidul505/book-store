import { ChangeEvent } from "react";
import BookCard from "../components/BookCard";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { IBook } from "../types/book";
import {
  setFilterOption,
  setSearchTerm,
} from "../redux/features/book/bookSlice";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const AllBooks = () => {
  const { data, isLoading } = useGetBooksQuery(undefined) as {
    data: { data: IBook[] };
    isLoading: boolean;
  };
  const dispatch = useAppDispatch();
  const { book, user } = useAppSelector((state) => state);
  const { searchTerm, filterOption } = book;
  if (isLoading) return <Loading />;

  let books: IBook[] = data.data;

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  if (searchTerm && !filterOption) {
    books = books.filter(
      (book: IBook) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else if (
    searchTerm &&
    filterOption &&
    (filterOption === "genre" || filterOption === "publicationDate")
  ) {
    books = books.filter((book: IBook) =>
      book[filterOption]
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="pt-20 px-6 md:px-4">
      {user.user.email && (
        <Link
          to="/add-new-book"
          className="absolute right-3.5 text-sm md:text-base z-0 font-semibold cursor-pointer text-gray-700"
        >
          + Add New
        </Link>
      )}
      <div className="w-full flex justify-center flex-col md:flex-row gap-4 items-center">
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search books by title, author, or genre"
          className="input input-bordered rounded-none w-1/3 max-w-xl h-12 text-lg"
        />
        <select
          onChange={(e) => dispatch(setFilterOption(e.target.value))}
          className="select rounded-none h-4"
        >
          <option disabled selected>
            Select a category instead
          </option>
          <option value={"genre"}>Genre</option>
          <option value={"publicationDate"}>Published On</option>
          <option value={""}>No category</option>
        </select>
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
