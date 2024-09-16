import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Contexts/Provider/ProviderContext";
import { Link, NavLink } from "react-router-dom";
import {motion} from 'framer-motion';
import { Typography } from "@mui/material";
import Swal from "sweetalert2";
import { FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
const characterVariants={
  hidden:{opacity:0,y:20},
  visible:{opacity:1,y:0},
}
const Navbar = () => {
  const { User, LogOut } = useContext(AuthContext);
  const [isDropDownOpen,setDropDownOpen]=useState(false);
  const dropdownref=useRef(null)
  const handleAvatar=()=>{
    setDropDownOpen(!isDropDownOpen)
  }
  const handleLogOut=()=>{
    LogOut()
    .then(()=>{
      setDropDownOpen(false)
      Swal.fire({
        title:"Log Out Successfully",
        icon:'success',
      })
    })
    .catch((error)=>{
      Swal.fire({
        title:error.message,
        icon:"warning",
      })
    })
  }
   const handleClickOutside = (event) => {
     if (dropdownref.current && !dropdownref.current.contains(event.target)) {
       setDropDownOpen(false);
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
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/assignments"}>Assignments</NavLink>
      </li>
      {User && (
        <>
          <li>
            <NavLink to={"/create"}>Create Assignment</NavLink>
          </li>
          <li>
            <NavLink to={"/pending"}>Pending Task</NavLink>
          </li>
          <li><NavLink to={'/contact'}>Contact Us</NavLink></li>
          <li><NavLink to={'/developer'}>Developer</NavLink></li>
        </>
      )}
    </>
  );
  const logoText="Study Assembler";
  return (
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
            className="menu menu-sm dropdown-content text-black rounded-box mt-3 w-40 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap bg-gradient-to-r from-purple-400 to-black p-1 rounded-md lg:w-[240px]">
            {logoText.split("").map((char, idx) => (
              <motion.span
                key={idx}
                variants={characterVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: idx * 0.1 }}
                className="font-bold italic text-white mx-1 my-0"
              >
                {char}
              </motion.span>
            ))}
          </div>
          <Typography variant="body2" color="textSecondary" className="mt-2">
            Make your Study Perfect
          </Typography>
        </div>
      </div>
      <div className="navbar-center ml-4 hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end gap-2">
        {User ? (
          <div className="relative flex items-center gap-2">
            <button className="btn btn-circle" onClick={handleAvatar}>
              <img
                src={User?.photoURL || "https://via.placeholder.com/150"}
                alt={User?.displayName || "user"}
                title={User?.displayName || "user"}
                style={{ cursor: "pointer" }}
                className="border rounded-full w-10 h-10"
              />
            </button>
            {isDropDownOpen && (
              <div
                ref={dropdownref}
                className="absolute right-0 mt-16 pt-8 w-48 bg-white border rounded-lg shadow-lg p-2 z-50"
              >
                <div className="flex items-center p-2 border-b">
                  <img
                    src={User?.photoURL || "User"}
                    alt={User?.displayName || "Name"}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <span>{User?.displayName || "Name"}</span>
                </div>
                <button
                  onClick={handleLogOut}
                  className="flex items-center p-2 hover:bg-gray-200 w-full text-left"
                >
                  <FaSignOutAlt className="mr-2"></FaSignOutAlt>Log Out
                </button>
                <Link to={`/mysubmission`}>
                  <button
                   
                    className="flex items-center p-2 hover:bg-gray-200 w-full text-left"
                  >
                    <FaClipboardList className="mr-2"></FaClipboardList>My
                    Submissions
                  </button>
                </Link>
                <button
                  onClick={() => setDropDownOpen(false)}
                  className="flex items-center p-2 hover:bg-gray-200 w-full text-left"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to={`/register`}>
              <button className="bg-purple-400 text-black font-poppins text-base font-bold border rounded-md shadow-lg">
                Register
              </button>
            </Link>
            <Link to={`/login`}>
              <a className="btn btn-circle bg-red-400 text-black">
                <IoMdLogIn></IoMdLogIn>
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
