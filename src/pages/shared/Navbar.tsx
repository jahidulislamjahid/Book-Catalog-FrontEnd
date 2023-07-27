/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  setAccessToken,
  setFirstName,
  setUserEmail,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CartIcon, SyncOff, SyncOn } from "../../assets/Icons";
import CartSideMenu from "../../components/CartSidemenu";

const NavBar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    document.body.classList.toggle("drawer-open");
  };
  const handleCartSliderClose = () => {
    setIsDrawerOpen(false);
    document.body.classList.remove("drawer-open");
  };
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const navOptions = (
    <>
      <li className="nav-link">
        <Link to="/" className="hover:text-white hover:bg-transparent">
          Home
        </Link>
      </li>
      <li className="nav-link">
        <Link to="/books" className="hover:text-white hover:bg-transparent">
          Books
        </Link>
      </li>
      <li className="nav-link">
        <Link to="/wishlist" className="hover:text-white hover:bg-transparent">
          WishList
        </Link>
      </li>
      <li className="nav-link">
        <Link
          to="/add-new-book"
          className="hover:text-white hover:bg-transparent"
        >
          Add New Books
        </Link>
      </li>

    </>
  );

  const { accessToken, firstName } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("firstName");
    localStorage.removeItem("cart");
    dispatch(setAccessToken({ data: { accessToken: null } }));
    dispatch(setFirstName(null));
    dispatch(setUserEmail({ data: { email: null } }));
    navigate("/");
  };

  const { book } = useAppSelector((state) => state.cart);

  const totalQuantity = () => {
    let totalQuantity = 0;
    book.forEach((book) => {
      totalQuantity += book.quantity;
    });

    return totalQuantity;
  };

  return (
    <>
      <div className="navbar bg-curiousCyan text-white font-semibold px-10 ">
        <div className="flex-1">
          <div
            className="navbar  mt-0"
          >
            <div className="navbar-start">
              <div className="dropdown ">
                {!isDropdownOpen ? (
                  <label
                    tabIndex={0}
                    onClick={toggleDropdown}
                    className="btn btn-ghost lg:hidden"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                      />
                    </svg>
                  </label>
                ) : (
                  <label
                    tabIndex={0}
                    onClick={toggleDropdown}
                    className="btn btn-ghost  lg:hidden"
                  >
                    <svg
                      xmlns="http://www.w3.org/1990/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </label>
                )}

                {isDropdownOpen && (
                  <ul
                    tabIndex={0}
                    className="menu menu-compact bg-black  dropdown-content mt-3 p-2 text-primary font-bold shadow  rounded-box w-52 z-50"
                  >
                    {navOptions}
                  </ul>
                )}
              </div>

              <Link to="/" className="btn btn-ghost normal-case text-white text-xl">
                Book Box
              </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
              <ul className="menu font-bold menu-horizontal px-1 ">{navOptions}</ul>
            </div>

            <div className="navbar-end">
              <>
                <div className="drawer navbar-end drawer-end mr-5">
                  <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                    checked={isDrawerOpen}
                    onChange={handleDrawerToggle}
                  />
                  <div className="drawer-content">
                    <label htmlFor="my-drawer-4" className="btn btn-ghost btn-circle font-semibold">
                      <span>
                        <CartIcon />
                      </span>
                      <sup className="-ms-2 ">
                        {totalQuantity()}
                      </sup>
                    </label>
                  </div>

                  <div className="drawer-side z-50">
                    <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

                    <div className="menu bg-base-300 p-4 w-72 h-full  text-base-content">
                      <ul className="cart-slider-list">
                        {" "}
                        <CartSideMenu onClose={handleCartSliderClose} />
                      </ul>
                    </div>
                  </div>
                </div>
              </>
              {firstName && (
                <p className="font-bold mr-3 text-white">{firstName}</p>
              )}
              {accessToken ? (
                <button onClick={handleLogOut} className="btn btn-ghost btn-circle ">
                  <span className="text-white text-xs"><SyncOn /></span>
                </button>
              ) : (
                <Link to="/login">
                  {" "}
                  <button className="btn btn-circle btn-ghost font-semibold"><SyncOff /></button>
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default NavBar;
