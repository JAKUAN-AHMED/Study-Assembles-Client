import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const AssaignmentForm = () => {
    return (
      <div>
        <Navbar></Navbar>
        <div className="hero bg-base-200 min-h-screen mt-8 mb-8">
          <div className="hero-content flex-col">
            
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
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
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
};

export default AssaignmentForm;