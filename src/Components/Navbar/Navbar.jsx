import { NavLink } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/assaignments"}>Assaignments</NavLink>
      </li>
      <li>
        <NavLink to={"/submitted"}>Submitted Task</NavLink>
      </li>
      <li>
        <NavLink to={"/pending"}>Pending Task</NavLink>
      </li>
    </>
  );
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
            className="menu menu-sm dropdown-content bg-opacity-50 rounded-box z-[-100] mt-3 w-52 p-2 shadow text-white"
          >
            {navLinks}
          </ul>
        </div>
        <a className="btn btn-ghost w-[150px] lg:w-[250px]  text-base lg:text-xl">Study Assembles</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end gap-2">
        <button className="btn btn-secondary bg-purple-400 text-black">Login</button>
        <a className="btn btn-circle bg-red-400 text-black"><IoMdLogIn></IoMdLogIn></a>
      </div>
    </div>
  );
};

export default Navbar;
