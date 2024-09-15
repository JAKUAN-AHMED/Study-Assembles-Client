import { Link, NavLink } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../Contexts/Provider/ProviderContext";
import { FaSignOutAlt, FaClipboardList } from "react-icons/fa";
import Swal from "sweetalert2";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

const characterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Navbar = () => {
  const { User, LogOut } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogOut = () => {
    LogOut()
      .then(() => {
        setIsDropdownOpen(false);
        Swal.fire({
          title: "Log Out Successfully",
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: error.message,
          icon: "warning",
        });
      });
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/assignments">Assignments</NavLink>
      </li>
      {User && (
        <>
          <li>
            <NavLink to="/create">Create Assignment</NavLink>
          </li>
          <li>
            <NavLink to="/pending">Pending Task</NavLink>
          </li>
        </>
      )}
    </>
  );

  const logoText = "Study Assembler";

  return (
    <div>
      <div className="navbar bg-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content text-white rounded-box mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-wrap bg-gradient-to-r from-purple-400 via-purple-600 to-black p-2 rounded-md">
              {logoText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={characterVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="font-bold italic text-white mx-1"
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <Typography variant="body2" color="textSecondary" className="mt-2">
              Make Your Study Perfect
            </Typography>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end gap-2">
          {User ? (
            <div className="relative flex items-center gap-2">
              <a className="btn btn-circle" onClick={handleAvatarClick}>
                <img
                  className="border rounded-full w-10 h-10"
                  src={User?.photoURL || "https://via.placeholder.com/150"}
                  alt={User?.displayName || "user"}
                  title={User?.displayName || "user"}
                  style={{ cursor: "pointer" }}
                />
              </a>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-12 w-48 bg-white border rounded-lg shadow-lg p-2 z-50"
                >
                  <div className="flex items-center p-2 border-b">
                    <img
                      src={User?.photoURL || "User"}
                      alt={User?.displayName || "user"}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <span>{User?.displayName || "User"}</span>
                  </div>
                  <button
                    onClick={handleLogOut}
                    className="flex items-center p-2 hover:bg-gray-200 w-full text-left"
                  >
                    <FaSignOutAlt className="mr-2" /> Log Out
                  </button>
                  <Link to="/mysubmission">
                    <button className="flex items-center p-2 hover:bg-gray-200 w-full text-left">
                      <FaClipboardList className="mr-2" /> My Submissions
                    </button>
                  </Link>
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center p-2 hover:bg-gray-200 w-full text-left"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/register">
                <button className="bg-purple-400 text-black font-poppins font-bold text-base border rounded-md shadow-lg">
                  Register
                </button>
              </Link>
              <Link to="/login">
                <a className="btn btn-circle bg-red-400 text-black">
                  <IoMdLogIn />
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
