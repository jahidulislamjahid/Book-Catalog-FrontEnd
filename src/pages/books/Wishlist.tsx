/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { toast } from "react-hot-toast";

import {
  useDeleteWishMutation,
  useGetWishListQuery,
  useUpdateWishListMutation,
} from "../../redux/features/wishlist/wishlistApi";
import { IBook } from "../../types/bookTypes";
import { Delete } from "../../assets/Icons";

const WishList = () => {
  const email = localStorage.getItem("email");
  const { data } = useGetWishListQuery(email, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 5000,
  });

  const actualData = data?.data[0]?.wishList;
  const [deleteWish] = useDeleteWishMutation();
  const [updateWishList] = useUpdateWishListMutation();

  const handleRemoveBookFromWish = async (book: IBook) => {
    const options = {
      email: email,
      wishlistItemId: book._id,
    };
    await deleteWish(options).unwrap();

    toast.success("Book is removed from the Wishlist!!");
  };

  const handleMarkBookStatus = async (book: IBook, status: string) => {
    console.log(status);
    const updatedStatus = !book.finishedReading;

    const options = {
      email: email,
      wishlistItemId: book._id,
      finishedReading: updatedStatus,
    };

    const result = await updateWishList(options).unwrap();
    if (result.success) {
      toast.success("Book status updated successfully!");
    } else {
      toast.error("Failed to update book status.");
    }
  };

  return (
    <div className="p-2 shadow-xl py-32">
      <h2 className="text-curiousCyan mb-5 text-xl flex justify-center font-bold">
        Total Wishlist Books: {actualData?.length}
      </h2>
      <hr className="h-px my-8  border-0 bg-curiousCyan"></hr>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {actualData?.map((book: any) => (
            <div
              key={book._id}
              className="card  flex items-center  card-compact w-64 bg-base-200 p-5 shadow-xl"
            >
              <div className="">
                <img
                  src={book?.bookImage}
                  alt=""
                  className="h-32"
                />
              </div>
              <p className="text-black font-bold ">Name: {book?.title}</p>
              <p className="text-gray-700 font-bold ">Genre: {book?.genre}</p>
              <p className=" font-bold text-gray-700 ">Author: {book?.author}</p>

              <div className="flex justify-between items-center mt-4">
                {book.finishedReading ? (
                  <button
                    onClick={() => handleMarkBookStatus(book, "unfinished")}
                    className="text-red-500 btn btn-sm p-2 rounded-md"
                  >
                    Continue Reading
                  </button>
                ) : (
                  <button
                    onClick={() => handleMarkBookStatus(book, "finished")}
                    className="text-curiousCyan btn btn-sm "
                  >
                    Finished Reading
                  </button>
                )}

                <button
                  onClick={() => handleRemoveBookFromWish(book)}
                  className="text-3xl  "
                >
                  <Delete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishList;
