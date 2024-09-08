import { Link } from "react-router-dom";

const Errorpage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-500">404</h1>
        <h2 className="text-4xl font-semibold mt-4">Oops! Page not found</h2>
        <p className="mt-2 text-lg text-gray-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/">
          <button className="btn btn-primary mt-6">Go Back Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Errorpage;
