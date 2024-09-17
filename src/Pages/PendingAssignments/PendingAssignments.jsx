import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
const PendingAssignments = () => {
  const [pendingAssignments, setPendingAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
 useEffect(() => {
   AOS.init({
     duration: 1000, // You can also configure AOS here
   });
 }, []);
  // Fetch pending assignments
  useEffect(() => {
    const fetchPendingAssignments = async () => {
      try {
        const response = await fetch(
          "http://localhost:9998/submissions/pending"
        );
        const data = await response.json();
        setPendingAssignments(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pending assignments:", error);
        setLoading(false);
      }
    };

    fetchPendingAssignments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="space-x-4">
          <span className="loading loading-spinner text-primary"></span>
          <span className="loading loading-spinner text-secondary"></span>
          <span className="loading loading-spinner text-accent"></span>
          <span className="loading loading-spinner text-neutral"></span>
          <span className="loading loading-spinner text-info"></span>
          <span className="loading loading-spinner text-success"></span>
          <span className="loading loading-spinner text-warning"></span>
          <span className="loading loading-spinner text-error"></span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="p-6 bg-gray-100 min-h-screen mt-4 mb-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Pending Assignments
        </h2>

        {pendingAssignments.length === 0 ? (
          <p className="text-center text-gray-600">No pending assignments.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingAssignments.map((assignment) => (
              <div
                key={assignment._id}
                data-aos="fade-up-right"
                className="bg-white border p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={assignment.pdfLink}
                  alt="Assignment"
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  {assignment.title}
                </h3>
                <p className="text-gray-600 mt-2">
                  Examinee:{" "}
                  <span className="font-medium">{assignment.userEmail}</span>
                </p>
                <p className="mt-2">
                  Status:{" "}
                  <span className="text-yellow-500 font-bold">
                    {assignment.status}
                  </span>
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <Link to={`/give-marks/${assignment._id}`}>
                    <button className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-200">
                      Give Marks
                    </button>
                  </Link>
                  <Link to="/">
                    <button className="btn bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-200">
                      Home
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default PendingAssignments;
