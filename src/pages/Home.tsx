import { Link } from "react-router-dom";
import { IBook } from "../types/book";
import { useGetLatestBooksQuery } from "../redux/features/book/bookApi";
import BookCard from "../components/BookCard";
import Loading from "../components/Loading";

const Home = () => {
  const { data, isLoading } = useGetLatestBooksQuery(undefined) as {
    data: { data: IBook[] };
    isLoading: boolean;
  };
  if (isLoading) return <Loading />;
  const books: IBook[] = data?.data;

  return (
    <div>
      <div
        className="min-h-screen bg-center bg-cover flex justify-center items-center"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/hchXDpJ/robert-anasch-Mc-X3-Xu-JRs-UM-unsplash.jpg)",
        }}
      >
        <div className="text-center text-neutral-content bg-gray-900 bg-opacity-60 min-h-screen w-full flex items-center justify-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Purchase your favorite books from our book store. You can also add
              your favorite books in your wishlist.
            </p>
            <Link to="/all-books" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
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

export default Home;
