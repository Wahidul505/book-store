import { useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/book";
import { LuPenTool } from "react-icons/lu";
import { TbCategory2 } from "react-icons/tb";
import { BsCalendar2Date } from "react-icons/bs";
import moment from "moment";
import Review from "../components/Review";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id) as {
    isLoading: boolean;
    data: { data: IBook };
  };

  if (isLoading) return <div>Loading...</div>;

  const { title, genre, author, publicationDate, reviews } = data.data;

  return (
    <div className="pt-32">
      <div className="flex justify-center">
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-3xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
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
        </div>
      </div>
      <div className="mt-8">
        <div className="grid h-12 bg-primary place-items-center">Reviews</div>
        <div>
          {reviews.length &&
            reviews.map((review, index) => (
              <Review key={index} review={review} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
