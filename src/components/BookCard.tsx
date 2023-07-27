/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCreateWishListMutation } from "../redux/features/wishlist/wishlistApi";
import { IBook } from "../types/bookTypes";

interface IProps {
  book: IBook;
}

const BookCard = ({ book }: IProps) => {
  const email = localStorage.getItem("email");
  const loggedInEmail = localStorage.getItem("email");
  const [createWishList] = useCreateWishListMutation();

  const {
    id,
    title,
    bookImage,
    author,
    genre,
    publicationDate,
  } = book;

  const handleWishList = async (book: IBook) => {
    try {
      const options = {
        data: { wishList: book, email: email },
      };
      await createWishList(options).unwrap();

      toast.success("Book is Added to Wishlist Successfully!");
    } catch (error) {
      toast.error("WishList is Already Exists");
    }
  };

  return (
    <>
      <div className="card w-65 bg-base-200 shadow-xl hover:scale-95 hover:duration-500">
        <Link to={`/book-details/${id}`}>
          <figure className="px-5 pt-5">
            <img src={bookImage} className="rounded-md " />
          </figure>
          <div className="card-body items-center text-center">
            <p className="text-xl font-bold">{title}</p>
            <p className="text-md text-gray-500 font-semibold">Author: <span className=" text-black">{author}</span></p>
            <p className="text-md text-gray-500 font-semibold">Genre: <span className=" text-black">{genre}</span></p>
            <p className="text-md text-gray-500 font-semibold">Published: <span className=" text-black">{publicationDate}</span></p>
            <p className="text-md text-gray-500 font-semibold">Id: <span className=" text-black">{id}</span></p>
          </div>
        </Link>
        <div className="card-actions mx-auto pb-5">
          {loggedInEmail && (
            <button
              onClick={() => handleWishList(book)}
              className="btn btn-outline bg-curiousCyan text-white font-semibold text-center rounded-md"
            >
              Add to WishList
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default BookCard;
