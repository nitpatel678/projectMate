import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  GitlabIcon as GitHub,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <h2 className="text-xl font-bold">Project Mate</h2>
            </Link>
            <p className="text-sm mb-4 font-poppins text-gray-600">
              Connect, collaborate, and create amazing projects with talented
              individuals from around the world.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-orange-500 hover:text-orange-600 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-orange-500 hover:text-orange-600 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-orange-500 hover:text-orange-600 transition-colors"
              >
                <GitHub size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg text-black font-semibold mb-4 font-geologica">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/home"
                  className="text-gray-600 font-poppins hover:text-gray-950 transition-colors"
                >
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-gray-600 font-poppins hover:text-gray-950transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/create-project"
                  className="text-gray-600 font-poppins hover:text-gray-950 transition-colors"
                >
                  Create Project
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg text-black font-geologica font-semibold mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  className="text-gray-600 font-poppins hover:text-gray-950 transition-colors"
                >
                  Terms Of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 font-poppins hover:text-gray-950 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm font-poppins">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-orange-400">Project Mate</span>. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
