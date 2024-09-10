import { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Swal from "sweetalert2";

const PendingAssignments = () => {
  const [pendingAssignments, setPendingAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    // Fetch pending assignments (exclude completed ones)
    fetch("http://localhost:9999/tasks")
      .then((res) => res.json())
      .then((data) => setPendingAssignments(data));
  }, []);

  const openModal = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAssignment(null);
    setMarks("");
    setFeedback("");
  };

  const handleSubmitMark = () => {
    if (!marks || !feedback) {
      Swal.fire({
        icon: "warning",
        title: "Please provide both marks and feedback!",
      });
      return;
    }

    // Update the assignment status to completed
    fetch(`http://localhost:9999/assignments/${selectedAssignment.id}/mark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        marks: marks,
        feedback: feedback,
        status: "completed",
      }),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Marks and feedback submitted successfully!",
        });
        // Remove the marked assignment from the list
        setPendingAssignments(
          pendingAssignments.filter(
            (assignment) => assignment.id !== selectedAssignment.id
          )
        );
        closeModal();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error submitting marks!",
          text: error.message,
        });
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Pending Assignments
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white border rounded-lg shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-4">{assignment.title}</h2>
              <p className="text-gray-600 mb-2">Marks: {assignment.marks}</p>
              <p className="text-gray-600 mb-2">
                Examinee: {assignment.examineeName}
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => openModal(assignment)}
              >
                Give Mark
              </button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedAssignment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-2xl font-bold mb-4">
              Mark Assignment: {selectedAssignment.title}
            </h3>
            <p className="mb-4">
              <strong>PDF/Docs:</strong>{" "}
              <a
                href={selectedAssignment.submissionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {selectedAssignment.submissionLink}
              </a>
            </p>
            <p className="mb-4">
              <strong>Notes:</strong> {selectedAssignment.notes}
            </p>

            <input
              type="number"
              placeholder="Enter marks"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="w-full p-2 border mb-4 rounded"
            />

            <textarea
              placeholder="Enter feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-2 border mb-4 rounded"
            />

            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleSubmitMark}
              >
                Submit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PendingAssignments;
