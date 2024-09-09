import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import {updateProfile } from "firebase/auth";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Contexts/Provider/ProviderContext";
const Register = () => {
  const [show, setShow] = useState(false);
  const passRef = useRef();
   const {CreateUser}=useContext(AuthContext);
  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const photoURL = form.get("photoURL");
    const email = form.get("email");
    const password = form.get("password");
    const pass = passRef.current.value;
    if (pass.length < 6) {
      Swal.fire({
        title: "Password must be 6 characters or longer",
        icon: "warning",
      });
    } else if (!/[A-Z]/.test(pass)) {
      Swal.fire({
        title: "Password should have at least one uppercase letter",
        icon: "warning",
      });
    } else if (!/[a-z]/.test(pass)) {
      Swal.fire({
        title: "Password should have at least one lowercase letter",
        icon: "warning",
      });
    } else {
      // Create user
      CreateUser(email, password)
        .then((res) => {
          console.log(res.user);
          Swal.fire({
            title: "Successfully Registered",
            icon: "success",
          });
          // Update profile
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL,
          })
            .then(() => {})
            .catch((error) => {
              Swal.fire({
                title: error,
                icon: "warning",
              });
            });

          e.target.reset();
        })
        .catch((error) => {
          Swal.fire({
            title: error,
            icon: "warning",
          });
        });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="hero bg-base-200 max-w-6xl mx-auto mb-8 mt-8">
        <div className="hero-content flex-col lg:flex-row justify-between">
          <div className="text-center w-80 lg:text-left pr-6 lg:mr-12">
            <h1 className="text-4xl font-bold text-blue-60">
              Register <span className="text-yellow-400">Please</span>
            </h1>
            <h3 className="text-base font-bold mt-">
              & Explore <span className="text-yellow-600">Our</span>{" "}
              <span className="text-blue-600">website</span>
            </h3>
            <img
              loading="lazy"
              className="w-[400px] h-[300px] rounded-lg border shadow-md mt-4"
              src="https://i.ibb.co/WWY79Ty/register.jpg"
              alt="Login"
            />
          </div>
          <div className="card bg-base-100 w-80 max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photoURL"
                  placeholder="Photo URL"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={show ? "password" : "text"}
                  name="password"
                  ref={passRef}
                  placeholder="Password"
                  className="input input-bordered relative"
                  required
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute top-[69%] right-[15%]"
                >
                  {show ? <FaEyeSlash /> : <FaEye />}
                </span>
                {Error && <p className="text-red-600 text-base">{Error}</p>}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary bg-[#fff5f5] text-blue-400 hover:bg-slate-100 hover:text-yellow-400">
                  Register
                </button>
              </div>
            </form>

            <p className="text-center">
              Already Registered? Please{" "}
              <Link className="link" to="/login">
                <button className="link">Login</button>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
