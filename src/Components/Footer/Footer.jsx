import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Brand and Social Icons */}
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <h3 className="text-2xl font-bold text-white mb-3">
              Study Assembles
            </h3>
            <p className="mb-4">
              Connecting learners and educators seamlessly.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-gray-300 hover:text-white"
              >
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-300 hover:text-white"
              >
                <FaTwitter className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-300 hover:text-white"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://github.com"
                className="text-gray-300 hover:text-white"
              >
                <FaGithub className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <h4 className="text-xl font-bold text-white mb-3">Services</h4>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">
                  Assignment Creation
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">
                  Grading System
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">
                  Group Study
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">
                  Responsive Design
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full lg:w-1/3">
            <h4 className="text-xl font-bold text-white mb-3">Contact Us</h4>
            <p>Email: support@studyassembles.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Address: 123 Learning St, Knowledge City</p>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-4">
          <p className="text-center text-gray-400 text-sm">
            &copy; 2024 Study Assembles. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
