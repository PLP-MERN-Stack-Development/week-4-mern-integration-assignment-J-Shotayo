import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaTag, FaArrowRight } from 'react-icons/fa';

const PostCard = ({ post }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg mb-6 hover:shadow-xl transition-shadow">
      {post.featuredImage && (
        <img
          src={`http://localhost:5000/uploads/${post.featuredImage.split('\\').pop()}`}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <FaUser className="mr-1" />
          <span className="mr-3">{post.author?.username}</span>
          <FaCalendarAlt className="mr-1" />
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <FaTag className="mr-1" />
          <span>{post.category?.name}</span>
        </div>
        
        <p className="text-gray-700 mb-4">
          {post.content.substring(0, 100)}...
        </p>
        
        <Link
          to={`/posts/${post._id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          Read More <FaArrowRight className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default PostCard;