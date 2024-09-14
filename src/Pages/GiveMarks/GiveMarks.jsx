import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const GiveMarks = () => {
  const { id } = useParams(); // Assignment ID from the URL
  const [assignment, setAssignment] = useState(null);
  const [obtained_marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await fetch(`http://localhost:9998/submit/${id}`); // This should work now
        const data = await response.json();
        setAssignment(data);
      } catch (error) {
        console.error("Error fetching assignment:", error);
      }
    };

    fetchAssignment();
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    
      const response = await fetch(`http://localhost:9998/submissions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ obtained_marks, feedback }),
      });

      const result = await response.json(); 

      if (response.ok) {
        alert("Marks and feedback submitted successfully!");
        navigate("/pending");
      } else {
        alert(
          `Error submitting marks and feedback: ${
            result.message || response.statusText
          }`
        );
      }
   
  };


  if (!assignment) {
    return <div>Loading assignment...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Give Marks for: {assignment.title}
      </h2>
      <p>Examinee: {assignment.userEmail}</p>
      <p>
        PDF Link:{" "}
        <a href={assignment.pdfLink} target="_blank" rel="noopener noreferrer">
          {assignment.pdfLink}
        </a>
      </p>
      <p>Notes: {assignment.quickNote}</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block mb-2">Marks</label>
          <input
            type="number"
            value={obtained_marks}
            onChange={(e) => setMarks(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <button type="submit" className="btn bg-green-500 text-white">
          Submit Marks and Feedback
        </button>
      </form>
    </div>
  );
};

export default GiveMarks;
