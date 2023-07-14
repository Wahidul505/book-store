/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link } from "react-router-dom";
import { IBook } from "../types/book";
import { useGetLatestBooksQuery } from "../redux/features/book/bookApi";

const Home = () => {
  const { data, isLoading, isSuccess, error } =
    useGetLatestBooksQuery(undefined);
  const books: IBook[] = data?.data;
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/hchXDpJ/robert-anasch-Mc-X3-Xu-JRs-UM-unsplash.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Purchase your favourite books from our book store. You can also
              add your favourite books in your wishlist.
            </p>
            <Link to="/all-books" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
