import { IBook } from "../types/book";
import { FaPenFancy } from "react-icons/fa";
interface IProps {
  book: IBook;
}
const BookCard = ({ book }: IProps) => {
  const { title, author, genre, publicationDate, reviews } = book;
  return (
    <div
      className="bg-center bg-cover w-full h-96 cursor-pointer"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/0q6LRFz/red-hardcover-book-front-cover-1.jpg)",
      }}
    >
      <div className="hero-content text-center text-neutral-content bg-gray-900 bg-opacity-60 h-full flex items-start">
        <div className="max-w-md">
          <h1 className="mb-2 text-5xl font-bold">{title}</h1>
          <p className="font-semibold text-red-300 flex items-center gap-2 justify-center">
            <FaPenFancy /> {author}
          </p>
          <div className="mt-4 flex flex-col items-star justify-end text-lg">
            <p className="">
              <span className="font-semibold">Genre:</span> {genre}
            </p>
            <p className="">
              <span className="font-semibold">Published:</span>{" "}
              {publicationDate.toString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
