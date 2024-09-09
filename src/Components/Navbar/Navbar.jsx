import { Link } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../Contexts/Provider/ProviderContext";
import { FaSignOutAlt, FaClipboardList } from "react-icons/fa";
import Swal from "sweetalert2";

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
        setIsDropdownOpen(false); // Close the dropdown after logout
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

  return (
    <div className="navbar bg-base-100">
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
            className="menu menu-sm dropdown-content text-white rounded-box z-[-100] mt-3 w-52 p-2 shadow "
          >
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/assignments"}>Assignments</Link>
            </li>
            {User && (
              <>
                <li>
                  <Link to={"/create"}>Create Assignment</Link>
                </li>
                <li>
                  <Link to={"/pending"}>Pending Task</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <a className="btn btn-ghost w-[150px] lg:w-[250px] text-base lg:text-xl">
          Study Assembles
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/assignments"}>Assignments</Link>
          </li>
          {User && (
            <>
              <li>
                <Link to={"/create"}>Create Assignment</Link>
              </li>
              <li>
                <Link to={"/pending"}>Pending Task</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {User ? (
          <div className="relative flex items-center gap-2">
            <a className="btn btn-circle" onClick={handleAvatarClick}>
              <img
                className="border rounded-full w-10 h-10"
                src={User?.photoURL || "https://via.placeholder.com/50"}
                alt={User?.displayName || "user"}
                title={User?.displayName || "user"}
                style={{ cursor: "pointer" }}
              />
            </a>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-40 w-48 bg-white border rounded-lg shadow-lg p-2 z-50"
              >
                <div className="flex items-center p-2 border-b">
                  <img
                    src={User?.photoURL || "https://via.placeholder.com/50"}
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
                <Link to="/my-submissions">
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
          <div>
            <button className="bg-purple-400 text-black font-poppins font-bold text-base border rounded-md shadow-lg">
              Register
            </button>
            <a className="btn btn-circle bg-red-400 text-black">
              <Link to={"/login"}>
                <IoMdLogIn />
              </Link>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
