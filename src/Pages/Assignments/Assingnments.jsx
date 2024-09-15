import { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/Provider/ProviderContext";
import { Link } from "react-router-dom";

const Assignments = () => {
  const [assignmentsData, setAssignments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { User } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:9998/tasks", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setAssignments(data))
      .catch((error) => console.error("Error fetching assignments:", error));
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:9998/tasks/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire(
                "Deleted!",
                "Your assignment has been deleted.",
                "success"
              );
              setAssignments(assignmentsData.filter((item) => item._id !== id));
            }
          })
          .catch((error) => console.error("Error deleting assignment:", error));
      }
    });
  };

  const handleUpdateClick = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAssignment(null);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const updatedAssignment = {
      title: e.target.title.value,
      description: e.target.description.value,
      marks: e.target.marks.value,
      difficulty: e.target.difficulty.value,
      dueDate: e.target.dueDate.value,
    };

    fetch(`http://localhost:9998/tasks/${selectedAssignment._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAssignment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire("Updated!", "The assignment has been updated.", "success");

          // Update the state with the new assignment data
          setAssignments((prevAssignments) =>
            prevAssignments.map((assignment) =>
              assignment._id === selectedAssignment._id
                ? { ...assignment, ...updatedAssignment }
                : assignment
            )
          );

          handleModalClose(); // Close the modal
        } else {
          Swal.fire(
            "Error!",
            data.message || "Failed to update the assignment.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error("Error updating assignment:", error);
        Swal.fire(
          "Error!",
          "An error occurred while updating the assignment.",
          "error"
        );
      });
  };

  const filteredAssignments =
    filter === "all"
      ? assignmentsData
      : assignmentsData.filter(
          (assignment) => assignment.difficulty === filter
        );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mb-8 mt-8">
        <h1 className="text-3xl font-bold text-center mb-6">Assignments</h1>

        <div className="flex justify-center mb-6">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredAssignments.map((assignment) => (
            <div
              key={assignment._id}
              className="bg-white border rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={assignment.thumbnailURL}
                alt={assignment.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {assignment.title}
                </h2>
                <p className="text-gray-600 mb-2">{assignment.description}</p>
                <p className="text-gray-500 mb-2">Marks: {assignment.marks}</p>
                <p className="text-gray-500 mb-2">
                  Difficulty: {assignment.difficulty}
                </p>
                <p className="text-gray-500 mb-2">
                  Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex justify-between p-2">
                {User ? (
                  <Link to={`/assignments/${assignment._id}`}>
                    <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
                      View
                    </button>
                  </Link>
                ) : (
                  <Link to={"/login"}>
                    <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
                      View
                    </button>
                  </Link>
                )}
                {User ? (
                  <button
                    onClick={() => handleUpdateClick(assignment)}
                    className="bg-yellow-500 text-white rounded px-4 py-2 hover:bg-yellow-600"
                  >
                    Update
                  </button>
                ) : (
                  <Link to={"/login"}>
                    <button className="bg-yellow-500 text-white rounded px-4 py-2 hover:bg-yellow-600">
                      Update
                    </button>
                  </Link>
                )}
                {User && User?.email === assignment.userEmail ? (
                  <button
                    onClick={() => handleDelete(assignment._id)}
                    className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    className="bg-gray-400 text-white rounded px-4 py-2 cursor-not-allowed"
                    disabled
                  >
                    Cannot Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Update Modal */}
      {isModalOpen && selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Update Assignment</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedAssignment.title}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedAssignment.description}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Marks</label>
                <input
                  type="number"
                  name="marks"
                  defaultValue={selectedAssignment.marks}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Difficulty</label>
                <select
                  name="difficulty"
                  defaultValue={selectedAssignment.difficulty}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  defaultValue={
                    new Date(selectedAssignment.dueDate)
                      .toISOString()
                      .split("T")[0]
                  }
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-500 text-white rounded px-4 py-2 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded px-4 py-2"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Assignments;
