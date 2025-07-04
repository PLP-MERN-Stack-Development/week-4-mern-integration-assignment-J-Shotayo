import { Link } from 'react-router-dom';
import { FaHome, FaList, FaTags, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:text-blue-200">
            MERN Blog
          </Link>
        </h1>
        <nav className="flex space-x-4">
          <Link to="/" className="flex items-center hover:text-blue-200">
            <FaHome className="mr-1" /> Home
          </Link>
          <Link to="/posts" className="flex items-center hover:text-blue-200">
            <FaList className="mr-1" /> Posts
          </Link>
          <Link to="/categories" className="flex items-center hover:text-blue-200">
            <FaTags className="mr-1" /> Categories
          </Link>
          <Link to="/login" className="flex items-center hover:text-blue-200">
            <FaSignInAlt className="mr-1" /> Login
          </Link>
          <Link to="/register" className="flex items-center hover:text-blue-200">
            <FaUserPlus className="mr-1" /> Register
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;