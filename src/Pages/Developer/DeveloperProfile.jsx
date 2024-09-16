import { motion } from "framer-motion";
import { useContext } from "react";
import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";
import { AuthContext } from "../../Contexts/Provider/ProviderContext";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const DeveloperProfile = () => {
  const {User}=useContext(AuthContext);
  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-6 mb-8 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <img
            src={User?.photoURL} // Replace with developer's picture
            alt="Developer"
            className="w-32 h-32 rounded-full border-4 border-gray-600 mb-4"
          />
          <h2 className="text-3xl font-bold mb-2">John Doe</h2>
          <p className="text-lg mb-6">
            Web Developer with a passion for creating interactive and <br />
            user-friendly applications. Follow me on my social media for updates
            and more projects.
          </p>
          <div className="flex space-x-4">
            <motion.a
              href="https://github.com/JAKUAN-AHMED"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-gray-300 hover:text-gray-100 transition-colors"
            >
              <FaGithub size={32} />
            </motion.a>
            <motion.a
              href="https://www.facebook.com/fullinverse/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-gray-300 hover:text-gray-100 transition-colors"
            >
              <FaFacebook size={32} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/jakuan-ahmed-0514932a3/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-gray-300 hover:text-gray-100 transition-colors"
            >
              <FaLinkedin size={32} />
            </motion.a>
          </div>
        </motion.div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DeveloperProfile;
