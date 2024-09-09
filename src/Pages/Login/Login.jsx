import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/Provider/ProviderContext";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
const Login = () => {
  const { LogIn, google, github } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
  const handleGoogle = () => {
    google()
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          title: "Login Successfully",
          icon: "success",
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        Swal.fire({
          title: error,
          icon: "warning",
        });
      });
  };

  const handleGithub = () => {
    github()
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          title: "Login Successfully",
          icon: "success",
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        Swal.fire({
          title: error,
          icon: "warning",
        });
      });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    //Sign In
    LogIn(email, password)
      .then((res) => {
        Swal.fire({
          title: "Login Successfully",
          icon: "success",
        });
        console.log(res.user);
        e.target.reset();
         navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        Swal.fire({
          title: error,
          icon: "warning",
        });
      });
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="hero bg-base-200 max-w-6xl mx-auto mb-8 mt-8 overflow-hidden">
        <div className="hero-content flex-col lg:flex-row justify-between">
          <div className="text-center w-80 lg:text-left pr-6 lg:mr-12">
            <h1 className="text-4xl font-bold text-blue-600 mt-4">
              Login <span className="text-yellow-400">Please</span>{" "}
            </h1>
            <h3 className="text-base font-bold mt-2 mb-4">
              {" "}
              & Explore <span className="text-yellow-600">Our</span>{" "}
              <span className="text-blue-600">website</span>
            </h3>
            <img
              loading="lazy"
              className="w-[400px] rounded-lg border shadow-md"
              src="https://i.ibb.co/WWY79Ty/register.jpg"
              alt=""
            />
          </div>
          <div className="card bg-base-100 w-80 max-w-sm shrink-0 shadow-2xl overflow-hidden">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="name"
                  name="name"
                  placeholder="name"
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
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                  autoComplete="current-password"
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary bg-[#fff5f5] text-blue-400 hover:bg-slate-100 hover:text-yellow-400">
                  Login
                </button>
              </div>
            </form>
            <p className="text-center text-blue-400">OR</p>
            <div className="text-center">
              <button
                onClick={handleGoogle}
                className="btn btn-circle bg-yellow-400 mr-4 text-black"
              >
                <FaGoogle />
              </button>
              <button
                onClick={handleGithub}
                className="btn btn-circle bg-black text-white"
              >
                <FaGithub />
              </button>
            </div>
            <p className="text-center">
              Not Registered yet? Please{" "}
              <Link className="link" to={"/register"}>
                <button className="link">Register</button>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Login;
