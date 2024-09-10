import { useState } from "react";

const FreqQuestions = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const questions = [
    {
      question: "How do I create an assignment?",
      answer:
        "To create an assignment, go to the '' tab and click 'Create New Assignment'. Fill in the required fields and click submit.",
    },
    {
      question: "How can I submit my assignment?",
      answer:
        "Go to 'My ', select the assignment, and click 'Submit'. You can upload your file and notes from there.",
    },
    {
      question: "How do I grade an assignment?",
      answer:
        "In the 'Pending ' section, you can review submissions, assign marks, and provide feedback.",
    },
    {
      question: "Can I update or delete an assignment?",
      answer:
        "Yes, navigate to the assignment and click 'Edit' to update, or 'Delete' to remove the assignment.",
    },
    {
      question: "What happens if I miss the deadline?",
      answer:
        "If you miss the deadline, you won’t be able to submit the assignment unless the deadline is extended by the creator.",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center bg-gray-300 p-8 rounded-lg shadow-lg mb-8 mt-12">
      {/* Left Side: Questions */}
      <div className="w-full lg:w-1/2 p-4">
        <h2 className="text-3xl font-bold text-black mb-6">
          Frequently Asked Questions
        </h2>
        <ul className="space-y-4">
          {questions.map((item, index) => (
            <li
              key={index}
              onClick={() => setSelectedQuestion(item)}
              className={`cursor-pointer p-4 border rounded-lg transition-colors ${
                selectedQuestion === item
                  ? "bg-purple-600 text-white"
                  : "bg-white text-black"
              } hover:bg-purple-400 hover:text-white`}
            >
              {item.question}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4">
        <img
          src="https://i.ibb.co.com/DQvKVhQ/freq1.jpg"
          alt="Big Question Mark"
          className="w-48 h-48 lg:w-64 lg:h-64 object-cover mb-6"
        />
        {selectedQuestion && (
          <div className="bg-white p-6 rounded-lg shadow-md w-full text-center">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              {selectedQuestion.question}
            </h3>
            <p className="text-gray-700">{selectedQuestion.answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreqQuestions;
