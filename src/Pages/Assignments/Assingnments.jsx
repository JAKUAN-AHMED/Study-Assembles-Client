import{ useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";

const Assignments= () => {
  const [assignmentsData,setAssignments]=useState([]);
  useEffect(()=>{
    fetch("http://localhost:9999/tasks")
    .then(res=>res.json())
    .then(data=>setAssignments(data));
  })
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredassignments =
    filter === "all"
      ? assignmentsData
      : assignmentsData.filter(
          (assignment) => assignment.difficulty === filter
        );

  return (
    <div>
      <Navbar></Navbar>
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
          {filteredassignments.map((assignment) => (
            <div
              key={assignment.title}
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
              <div className="flex justify-end p-4">
                <Link to={`/assignments/${assignment.id}`}>
                  <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
                    View
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Assignments;
