/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { FormEvent, useEffect, useState } from "react";
import { useAddNewBookMutation } from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hook";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddNewBook = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: new Date(),
    addedBy: "",
    reviews: [],
  });
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const user = useAppSelector((state) => state.user.user);
  const [addNewBook, { data, isSuccess, isLoading, isError }] =
    useAddNewBookMutation();

  const handleSetBookData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewBook(bookData);
  };

  useEffect(() => {
    setBookData({ ...bookData, addedBy: user?.email as string });
  }, [user?.email]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSetBookData}
        className="card flex-shrink-0 w-full max-w-xl shadow-2xl bg-base-100 p-8"
      >
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={(e) =>
              setBookData({ ...bookData, title: e.target.value })
            }
            type="text"
            name="title"
            id="title"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="title"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Book Title
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={(e) =>
              setBookData({ ...bookData, author: e.target.value })
            }
            type="text"
            name="author"
            id="author"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="author"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Author
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              onChange={(e) =>
                setBookData({ ...bookData, genre: e.target.value })
              }
              type="text"
              name="genre"
              id="genre"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="genre"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Genre
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group -mt-3">
            <label htmlFor="publicationDate" className="text-gray-500 text-sm">
              Publication Date
            </label>
            <DatePicker
              showIcon
              selected={bookData.publicationDate}
              maxDate={new Date()}
              onChange={(date) =>
                setBookData({ ...bookData, publicationDate: date as Date })
              }
            />
          </div>
        </div>
        <div>{isError && <p>{error}</p>}</div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddNewBook;
