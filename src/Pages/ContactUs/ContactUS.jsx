import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { div } from "framer-motion/m";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const ContactUs = () => {
  const form = useRef();
  const [formStatus, setFormStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_7eidg0m", 
        "template_ptrym3g", 
        form.current,
        "fDigimBQcHMMDa_z7" 
      )
      .then(
        (result) => {
          console.log(result.text);
          setFormStatus("success");
          Swal.fire({
            title: "Message Sent Successfully!",
            icon: "success",
          });
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          setFormStatus("error");
          Swal.fire({
            title: "Failed to send message",
            icon: "error",
          });
        }
      );
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-8 mb-12 p-6 bg-gray-800 text-gray-300 rounded-lg shadow-lg max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-center">Contact Us</h2>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="space-y-4 max-w-lg mx-auto"
          >
            <div>
              <label htmlFor="name" className="block text-lg">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="w-full p-2 rounded-md bg-white text-black border-2 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full p-2 rounded-md bg-white text-black border-2 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="5"
                required
                className="w-full p-2 rounded-md bg-white text-black border-2 focus:border-blue-500"
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full bg-blue-600 p-3 rounded-md font-bold text-white hover:bg-blue-700 transition"
              whileHover={{ scale: 1.05 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Feedback Section */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <h3 className="text-3xl font-bold text-center mb-8">
            What Our Users Say
          </h3>
          <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8">
            {/* User 1 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-md w-full lg:w-1/3 text-center">
              <FaUserCircle className="text-6xl mx-auto mb-4 text-gray-500" />
              <p className="text-xl font-semibold mb-2">John Doe</p>
              <p className="italic">
                "This platform made my study organization so much easier! The
                support team is fantastic."
              </p>
            </div>
            {/* User 2 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-md w-full lg:w-1/3 text-center">
              <FaUserCircle className="text-6xl mx-auto mb-4 text-gray-500" />
              <p className="text-xl font-semibold mb-2">Jane Smith</p>
              <p className="italic">
                "I love how simple and effective the messaging system is. It has
                transformed the way I communicate."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ContactUs;
