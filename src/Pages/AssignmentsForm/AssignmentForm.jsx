import { useContext,useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { AuthContext } from "../../Contexts/Provider/ProviderContext";

const AssignmentForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [marks, setMarks] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [dueDate, setDueDate] = useState(null);
  const {User}=useContext(AuthContext);
  const {email,displayName}=User;
  const AssignmentData={email,displayName,title,description,thumbnailURL,difficulty,dueDate,marks};
  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your actual form submission logic
    // Example: axios.post("/api/assignments", { title, description, marks, thumbnailURL, difficulty, dueDate })

    Swal.fire({
      title: "Assignment Created Successfully",
      icon: "success",
    });

    // Reset the form after submission
    setTitle("");
    setDescription("");
    setMarks("");
    setThumbnailURL("");
    setDifficulty("easy");
    setDueDate(null);
    //post data to server
    fetch("http://localhost:9999/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(AssignmentData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            title: "Successfully Inserted",
            icon: "success",
          });
        }
      });
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-4xl mx-auto p-6 mt-8 mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Assignment
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-8 space-y-4"
        >
          <div className="form-group">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
              placeholder="Assignment Title"
              required
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
              placeholder="Assignment Description"
              rows="4"
              required
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="marks"
              className="block text-gray-700 font-medium mb-2"
            >
              Marks
            </label>
            <input
              id="marks"
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
              placeholder="Marks"
              required
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="thumbnailURL"
              className="block text-gray-700 font-medium mb-2"
            >
              Thumbnail Image URL
            </label>
            <input
              id="thumbnailURL"
              type="text"
              value={thumbnailURL}
              onChange={(e) => setThumbnailURL(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
              placeholder="Thumbnail Image URL"
              required
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="difficulty"
              className="block text-gray-700 font-medium mb-2"
            >
              Difficulty Level
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
              required
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="form-group">
            <label
              htmlFor="dueDate"
              className="block text-gray-700 font-medium mb-2"
            >
              Due Date
            </label>
            <DatePicker
              id="dueDate"
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
              placeholderText="Select due date"
              required
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-sm hover:bg-blue-700"
            >
              Create Assignment
            </button>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AssignmentForm;
