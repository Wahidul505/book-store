/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
  usePostReviewMutation,
} from "../redux/features/book/bookApi";
import { IBook } from "../types/book";
import { LuPenTool } from "react-icons/lu";
import { TbCategory2 } from "react-icons/tb";
import { BsCalendar2Date } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { HiCheck } from "react-icons/hi";
import moment from "moment";
import Review from "../components/Review";
import { FormEvent, useEffect, useState } from "react";
import { useAppSelector } from "../redux/hook";
import { toast } from "react-hot-toast";
import {
  useAddToWishListMutation,
  useGetWishListQuery,
} from "../redux/features/wishList/wishListApi";
import { IWishList } from "../types/wishList";
import {
  useChangeReadingStatusMutation,
  useGetReadingStatusQuery,
} from "../redux/features/readingStatus/readingStatusApi";
import { IReadingStatusData } from "../types/readingStatus";
import Loading from "../components/Loading";

const BookDetails = () => {
  const { id } = useParams();
  const [review, setReview] = useState("");
  const [wishListed, setWishListed] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const navigate = useNavigate();
  const { user, isLoading: isUserLoading } = useAppSelector(
    (state) => state.user
  );
  const { data, isLoading, isError } = useGetSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
  }) as {
    isLoading: boolean;
    isError: boolean;
    data: { data: IBook };
  };
  const [postReview, { isError: isPostReviewError }] = usePostReviewMutation();
  const [
    deleteBook,
    {
      isError: isDeleteBookError,
      isLoading: isDeleteBookLoading,
      isSuccess: isDeleteBookSuccess,
    },
  ] = useDeleteBookMutation();
  const { data: wishListData, isLoading: isWishListLoading } =
    useGetWishListQuery(user.email as string) as {
      data: { data: IWishList };
      isLoading: boolean;
    };
  const [addToWishList, { isLoading: isAddToWishListLoading }] =
    useAddToWishListMutation();
  const [changeReadingStatus] = useChangeReadingStatusMutation();
  const { data: readingStatusData, isLoading: isReadingStatusLoading } =
    useGetReadingStatusQuery(user.email as string) as {
      data: { data: IReadingStatusData };
      isLoading: boolean;
    };

  useEffect(() => {
    isDeleteBookSuccess && toast.success("Book deleted successfully");
    isDeleteBookError && toast.error("Something went wrong");
    isDeleteBookSuccess && navigate("/");
    isError && navigate("/");
    isPostReviewError && toast.error("Something went wrong");
  }, [isDeleteBookError, isDeleteBookSuccess, isError, isPostReviewError]);

  useEffect(() => {
    if (wishListData) {
      const exist = wishListData.data.wishList.find(
        (book) => book._id.toString() === id
      );
      exist ? setWishListed(true) : setWishListed(false);
    }
    if (readingStatusData) {
      const exist = readingStatusData.data.bookList.find(
        (bookStatus) => bookStatus.book._id.toString() === id
      );
      exist && setCurrentStatus(exist.status);
    }
  }, [id, wishListData, readingStatusData]);

  if (isLoading || isUserLoading || isWishListLoading || isReadingStatusLoading)
    return <Loading />;

  const { title, genre, author, publicationDate, reviews, addedBy } = data.data;

  const handlePostReview = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (review) {
      const options = {
        id: id as string,
        reviewData: review,
      };
      postReview(options);
      setReview("");
    }
  };

  const handleDeleteBook = () => {
    deleteBook({ id, user: user.email } as { id: string; user: string });
  };

  const handleAddToWishList = () => {
    addToWishList({ id, user: user.email } as { id: string; user: string });
  };

  const handleChangeReadingStatus = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    changeReadingStatus({ id, user: user.email, status: e.target.value } as {
      id: string;
      user: string;
      status: string;
    });
  };

  return (
    <div className="pt-24">
      <div className="flex justify-end items-center mb-8 px-6">
        <select
          onChange={handleChangeReadingStatus}
          className="rounded-none h-8 border-none focus:border-none mr-2"
        >
          <option disabled selected>
            Select reading status
          </option>
          <option value={"reading"}>Currently Reading</option>
          <option value={"will-read"}>Will Read</option>
          <option value={"finished"}>Finished Reading</option>
        </select>

        {!wishListed ? (
          <button
            disabled={isAddToWishListLoading}
            onClick={handleAddToWishList}
            className="bg-orange-400 text-white p-1 flex items-center gap-2"
          >
            <HiPlus />
            To Wish list
          </button>
        ) : (
          <button
            disabled
            className="bg-green-500 text-white p-1 flex items-center gap-2 "
          >
            <HiCheck />
            Wish listed
          </button>
        )}
      </div>
      <div className="flex justify-center">
        <div className="relative flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-3xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src="https://i.ibb.co/0q6LRFz/red-hardcover-book-front-cover-1.jpg"
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
            <p className="mb-3 text-white font-bold text-lg flex gap-3 items-center">
              <LuPenTool />{" "}
              <span className="text-gray-300 font-normal">{author}</span>
            </p>
            <p className="mb-3 text-white font-bold text-lg flex gap-3 items-center">
              <TbCategory2 />{" "}
              <span className="text-gray-300 font-normal">{genre}</span>
            </p>
            <p className="mb-3 text-white font-bold text-lg flex gap-3 items-center">
              <BsCalendar2Date />{" "}
              <span className="text-gray-300 font-normal">
                {moment(publicationDate.toString()).format(
                  "dddd, MMMM Do YYYY"
                )}
              </span>
            </p>
          </div>
          {currentStatus && (
            <p className="absolute right-4 z-20 bottom-4 text-rose-400">
              {currentStatus === "reading" && "Reading"}
              {currentStatus === "will-read" && "Will Read"}
              {currentStatus === "finished" && "Finished"}
            </p>
          )}
        </div>
      </div>

      {user.email === addedBy && (
        <div
          className="inline-flex rounded-md shadow-sm justify-end w-full pr-4 pt-6"
          role="group"
        >
          <button
            onClick={() => navigate(`/edit-book/${id as string}`)}
            type="button"
            className="px-4 py-2 text-sm font-medium  border rounded-l-lg focus:z-10 focus:ring-2 bg-amber-500 border-amber-600 text-white hover:bg-amber-600"
          >
            Edit
          </button>

          <label
            htmlFor="my_modal_6"
            className="px-4 py-2 text-sm font-medium  border rounded-r-lg focus:z-10 focus:ring-2 bg-rose-500 border-rose-600 text-white hover:bg-rose-600 cursor-pointer"
          >
            Delete
          </label>
        </div>
      )}

      <div className="mt-8">
        <div className="grid h-12 bg-primary place-items-center">Reviews</div>
        <div className="px-8 py-6">
          <form onSubmit={handlePostReview} className="flex gap-3 mb-4">
            <input
              onChange={(e) => setReview(e.target.value)}
              value={review}
              type="text"
              placeholder="Drop a review"
              className="input input-bordered rounded w-full max-w-3xl"
            />
            <button className="btn rounded">Post</button>
          </form>
          {reviews.length &&
            reviews.map((review, index) => (
              <Review key={index} review={review} />
            ))}
        </div>
      </div>
      {/* modal for delete */}
      {true && (
        <>
          {" "}
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                Make sure you want to delete the book
              </h3>
              <div className="flex gap-3 items-center justify-end mt-3">
                <button
                  disabled={isDeleteBookLoading}
                  onClick={handleDeleteBook}
                  className="btn btn-error hover:bg-red-500 hover:text-white"
                >
                  {isDeleteBookLoading ? (
                    <span className="loading loading-dots loading-xs"></span>
                  ) : (
                    "Delete"
                  )}
                </button>
                <label htmlFor="my_modal_6" className="btn">
                  Close!
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookDetails;
