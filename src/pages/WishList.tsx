import Loading from "../components/Loading";
import { useGetWishListQuery } from "../redux/features/wishList/wishListApi";
import { useAppSelector } from "../redux/hook";
import { IWishList } from "../types/wishList";

const WishList = () => {
  const { user, isLoading: isUserLoading } = useAppSelector(
    (state) => state.user
  );
  const { data, isLoading } = useGetWishListQuery(user?.email as string) as {
    data: { data: IWishList };
    isLoading: boolean;
    isError: boolean;
  };
  if (isLoading || isUserLoading) {
    return <Loading />;
  }

  if (!data) {
    return (
      <div className="pt-24 text-primary text-center text-xl">
        Add book to your Wish list
      </div>
    );
  }

  return (
    <div className=" pt-24 px-6">
      <table className="w-full text-sm text-left text-gray-500 relative overflow-x-auto shadow-md sm:rounded-lg table-sm">
        <thead className="text-xs text-gray-700 uppercase bg-gray-300">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Author
            </th>
            <th scope="col" className="px-6 py-3">
              Genre
            </th>
          </tr>
        </thead>
        <tbody>
          {data.data &&
            data.data.wishList.map((book, index) => (
              <tr key={index} className="border-b  bg-gray-100 text-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  {book.title}
                </th>
                <td className="px-6 py-4">{book.author}</td>
                <td className="px-6 py-4">{book.genre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default WishList;
