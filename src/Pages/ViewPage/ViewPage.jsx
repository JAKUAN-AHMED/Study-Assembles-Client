import { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom"; // Assuming you use react-router-dom v6
import { AuthContext } from "../../Contexts/Provider/ProviderContext";

const ViewPage = () => {
  const { User } = useContext(AuthContext);

  // Get assignment data from the loader
  const assignment = useLoaderData(); 
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Handle modal open
  const openModal = () => {
    setIsModalOpen(true);
  };
  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const submissionData = {
      assignmentId: assignment._id, // ID of the current assignment
      pdfLink: form.pdfLink.value,
      quickNote: form.quickNote.value,
      userEmail: User.email, // Logged user's email
      status: "Pending", // Default status
      title:assignment.title,
      marks:assignment.marks,
    };

    try {
      const response = await fetch("http://localhost:9998/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // Display success message
      } else {
        console.error("Failed to submit assignment");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setIsModalOpen(false); // Close the modal after submission
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Assignment Details</h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">{assignment.title}</h2>
        <p className="mb-2">
          <strong>Marks:</strong> {assignment.marks}
        </p>
        <p className="mb-2">
          <strong>Description:</strong> {assignment.description}
        </p>
        <p className="mb-2">
          <strong>Difficulty:</strong> {assignment.difficulty}
        </p>
        <p className="mb-2">
          <strong>Due Date:</strong> {assignment.dueDate}
        </p>
        <img
          className="w-full h-64 object-cover mb-4"
          src={assignment.thumbnailURL}
          alt={assignment.title}
        />

        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Take Assignment
        </button>
        <Link to={"/"}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4">
            Home
          </button>
        </Link>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Submit Assignment</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="pdfLink"
                >
                  PDF/Doc Link
                </label>
                <input
                  type="url"
                  name="pdfLink"
                  id="pdfLink"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                  defaultValue={assignment.thumbnailURL}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="quickNote"
                >
                  Quick Note
                </label>
                <textarea
                  name="quickNote"
                  id="quickNote"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPage;
