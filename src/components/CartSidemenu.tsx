/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { toast } from "react-hot-toast";
import {
  addToCart,
  removeFromCart,
  removeOne,
} from "../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { IBook } from "../types/bookTypes";
import { Delete, MinusIcon, PlusIcon, RightAngle } from "../assets/Icons";

const CartSideMenu = ({ onClose }: any) => {
  const handleClose = () => {
    onClose();
  };

  const { book, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const cartData = book;

  const totalQuantity = () => {
    let totalQuantity = 0;
    cartData.forEach((book) => {
      totalQuantity += book.quantity;
    });

    return totalQuantity;
  };

  const handleRemoveBookFromCart = (book: IBook) => {
    dispatch(removeFromCart(book));
    toast.success("Book Delete From Cart!!");
  };

  return (
    <div className="p-2 shadow-xl z-50">
      <button onClick={handleClose} className="text-xl btn btn-ghost btn-circle">
        <RightAngle />
      </button>
      <h2 className="text-black font-semibold text-sm">Total Items: {totalQuantity()}</h2>
      <div className=" mt-4 gap-5">
        <h1 className="font-bold text-cyan-700">Total: {total?.toFixed(2)}</h1>
        {cartData &&
          cartData?.map((cart: IBook) => (
            <div key={cart._id} className="border-b-2 border-sky-500 p-5 ">
              <div className="border-r pr-20 shrink-0">
                <img src={cart?.bookImage} alt="" className="h-full" />
              </div>
              <p className="text-cyan-700 font-bold "> {cart?.title}</p>
              <p className=" font-bold ">
                {" "}
                price: {(cart.price * cart.quantity!).toFixed(2)}$
              </p>
              <p>Quantity: {cart.quantity}</p>
              <button
                onClick={() => dispatch(addToCart(cart))}
                className="text-xl btn btn-circle btn-ghost mr-2"
              >
                <PlusIcon />
              </button>

              <button
                onClick={() => dispatch(removeOne(cart))}
                className="text-xl btn btn-circle btn-ghost ml-2"
              >
                <MinusIcon />
              </button>

              <button
                onClick={() => handleRemoveBookFromCart(cart)}
                className="text-xl btn btn-circle btn-ghost ml-2"
              >
                <Delete />
              </button>
            </div>
          ))}

        <p className="text-xl font-bold text-blue-600"></p>
      </div>
    </div>
  );
};

export default CartSideMenu;
