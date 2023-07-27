import { Link } from "react-router-dom";

import NavBar from "./Navbar";
import { Notfound } from "../../assets/Icons";


const NotFound = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="">
          <figure>
            <Notfound />
          </figure>
          <div className="items-center justify-center">

            <div className="card-actions justify-center mt-5">
              <Link to="/">
                {" "}
                <button className="btn bg-curiousCyan text-white font-semibold hover:bg-gray-900 rounded-md">Back to Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
