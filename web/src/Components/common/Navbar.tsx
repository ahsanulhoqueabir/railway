import { Link, NavLink } from "react-router-dom";
import getImage from "../../utilities/getimage";
import { setTitle } from "../../utilities/funtions";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const paths = [
    { path: "/", name: "Home" },
    { path: "/login", name: "Login" },
    { path: "/register", name: "Register" },
    { path: "/train-information", name: "Train Information" },
    {
      path: "contact-us",
      name: "Contact Us",
    },
  ];
  return (
    <div
      className={`navbar z-50 lg:px-24 shadow-md lg:sticky top-0 ${
        isScrolled ? "bg-[#f6f9ff]" : ""
      }`}
    >
      <div className="flex-1">
        <Link to={"/"} className="flex items-center">
          <img
            src={getImage("common", "logo.png")}
            alt=""
            className="size-20"
          />
          <span className=" text-xl font-bold text-[#da934f]">
            Bangladesh <br></br> Railway
          </span>
        </Link>
      </div>
      <div className="hidden lg:block flex-none">
        <ul className="menu menu-horizontal px-1">
          {paths.map((item, index) => (
            <EachItem item={item} key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

interface ItemProps {
  name: string;
  path: string;
}

const EachItem = ({ item }: { item: ItemProps }) => {
  const { name, path } = item;

  return (
    <NavLink
      onClick={() => setTitle(name)}
      to={path}
      className={({ isActive }) =>
        ` px-4 py-2 text-lg bg-transparent transition-all duration-300 hover:border-b-2  border-b-2 border-transparent hover:border-green-500 ${
          isActive ? "border-b-2 border-green-500" : ""
        }`
      }
    >
      {name}
    </NavLink>
  );
};
