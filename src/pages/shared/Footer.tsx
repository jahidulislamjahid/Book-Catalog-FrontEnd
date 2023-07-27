import { Link } from "react-router-dom";
import { Facebook, Twitter, Youtube } from "../../assets/Icons";

const Footer = () => {
  return (
    <>
      <footer className="footer footer-center  p-10 bg-curiousCyan text-base-content rounded">
        <div className="grid grid-flow-col gap-4 text-white">
          <Link to="#" className="link link-hover ">
            About Us
          </Link>
          <Link to="#" className="link link-hover">
            Contact
          </Link>
          <Link to="#" className="link link-hover">
            Blogs
          </Link>
          <Link to="#" className="link link-hover">
            News
          </Link>
          <Link to="#" className="link link-hover">
            Events
          </Link>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4 text-white">
            <a href="#" target="blank">
              <Twitter />
            </a>
            <a href="#" target="blank">
              <Youtube />
            </a>
            <a href="#" target="blank">
              <Facebook />
            </a>
          </div>
        </div>
        <div>
          <p className="text-white font-bold">
            Copyright © 2023 - All right reserved by &nbsp;
            <Link className="text-white underline" target="_blank" to="#">
              Book Box
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
