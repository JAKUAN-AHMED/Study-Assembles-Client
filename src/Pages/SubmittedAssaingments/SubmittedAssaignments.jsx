import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/Provider/ProviderContext";

const SubmittedAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const { User, Loader } = useContext(AuthContext);

  // Fetch assignments for the logged-in user
  useEffect(() => {
    const fetchAssignments = async () => {
      const response = await fetch(`http://localhost:9998/submit`);
      const data = await response.json();
      if (Array.isArray(data)) {
        // Filter assignments for the logged-in user
        const userAssignments = data.filter(
          (assignment) => assignment.userEmail === User.email
        );
        setAssignments(userAssignments);
      }
    };

    fetchAssignments();
  }, [User?.email]); // Use User.email as dependency

  if (Loader) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="space-y-4">
          <span className="loading loading-spinner text-primary"></span>
          <span className="loading loading-spinner text-secondary"></span>
          <span className="loading loading-spinner text-accent"></span>
          <span className="loading loading-spinner text-info"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Submitted Assignments
      </h2>

      {assignments.length === 0 ? (
        <div className="text-center">
          <p className="text-lg font-semibold">No assignments submitted yet.</p>
          <Link to="/">
            <button className="btn mt-4 px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-300">
              Home
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <div
              key={assignment._id}
              className="border rounded-lg shadow-md p-4 bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{assignment.title}</h3>

              {assignment.pdfLink && (
                <div className="mb-4">
                  <img
                    src={"https://via.placeholder.com/150?text=PDF+Preview"}
                    alt="PDF Preview"
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <a
                    href={assignment.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:text-blue-700 transition-colors duration-300"
                  >
                    View PDF
                  </a>
                </div>
              )}

              <p className="text-sm">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`${
                    assignment.status === "Pending"
                      ? "text-yellow-500"
                      : "text-green-500"
                  } font-bold`}
                >
                  {assignment.status}
                </span>
              </p>
              <p className="text-sm">
                <span className="font-semibold">Marks:</span>{" "}
                {assignment.marks ? assignment.marks : "N/A"}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Obtained Marks:</span>{" "}
                {assignment.obtained_marks ? assignment.obtained_marks : "N/A"}
              </p>
              <p className="text-sm mb-4">
                <span className="font-semibold">Feedback:</span>{" "}
                {assignment.feedback ? assignment.feedback : "No feedback yet"}
              </p>

              <Link to="/">
                <button className="btn w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition duration-300">
                  Home
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmittedAssignments;
