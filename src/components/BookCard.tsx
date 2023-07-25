/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
// import defaultBook from "../assets/defaultbook.jpg";

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
    <div className="card w-65  border-solid border-2 border-gray-400 shadow-xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300">
      <figure className="px-10 pt-2">
        <img src={bookImage} alt="Book" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center py-3">
        <h6 className="text-black-400 ">Book ID : {id}</h6>
        <h6 style={{ fontSize: 25, fontWeight: "bold" }}>{title}</h6>
        <h6 className="text-cyan-700 font-bold ">Author: {author}</h6>
        <h6 className=" text-dark-400 ">Genre: {genre}</h6>
        <p>Publication Date: {publicationDate}</p>
        <Link to={`/book-details/${id}`}>
          <button
            className="btn-outline btn-sm mx-2 w-full"
          >
            VIEW DETAILS
          </button>
        </Link>
        {loggedInEmail && (
          <button
            onClick={() => handleWishList(book)}
            className="btn btn-outline btn-defult btn-sm mx-2 w-full ml-5"
          >
            Add to WishList
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
