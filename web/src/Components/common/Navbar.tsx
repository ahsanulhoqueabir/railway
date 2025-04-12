import { Link, NavLink } from "react-router-dom";
import getImage from "../../utilities/getimage";
import { setTitle } from "../../utilities/funtions";
import { useEffect, useState } from "react";
import useAuth from "@/Hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import GetIcon from "@/utilities/getIcon";
import { FaMobileAlt, FaSignOutAlt } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa6";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, setUser } = useAuth();

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

  const pathss = [
    { path: "/", name: "Home" },
    { path: "/verify-ticket", name: "Verify Ticket" },
    { path: "/train-information", name: "Train Information" },
    {
      path: "contact-us",
      name: "Contact Us",
    },
  ];
  const profiles = [
    {
      path: "/profile",
      name: "Profile",
      icon: "FaUserAlt",
      pack: "fa" as const,
    },
    {
      path: "purchase-history",
      name: "Purchase History",
      icon: "FaBriefcase",
      pack: "fa6" as const,
    },
    {
      path: "/profile/change-password",
      name: "Update Password",
      icon: "FaShieldAlt",
      pack: "fa" as const,
    },
  ];

  const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.removeItem("railbd-token");
    toast.success("Logout successful");
    setUser(null);
  };
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
          {user
            ? pathss.map((item, index) => <EachItem item={item} key={index} />)
            : paths.map((item, index) => <EachItem item={item} key={index} />)}
        </ul>
        {user && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="border-[1px] border-gray-400 p-1 px-3 rounded-lg">
                  <span className="w-16 font-semibold overflow-hidden text-ellipsis select-none whitespace-nowrap">
                    {user ? user.name : "MD. Ahsanul Hoque Abir"}{" "}
                  </span>
                  <span className="ml-2 select-none">&#x25BC;</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 text-gray-600">
                <DropdownMenuLabel>
                  <span className="text-xl text-black">{user?.name}</span>
                </DropdownMenuLabel>
                <DropdownMenuLabel className="flex items-center gap-2">
                  <FaRegEnvelope />
                  <span className="text-sm text-gray-400">{user?.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuLabel className="flex items-center gap-2">
                  <FaMobileAlt />
                  <span className="text-sm text-gray-400">{user?.phone}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {profiles.map((i, ind) => {
                    return (
                      <DropdownMenuItem key={ind}>
                        <Link to={i.path} className="flex items-center gap-2">
                          {<GetIcon className="" icon={i.icon} lib={i.pack} />}
                          <span className="text-sm">{i.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
                <DropdownMenuItem onClick={handleLogout}>
                  <FaSignOutAlt />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
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
