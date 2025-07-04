import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FaUser, FaCalendarAlt, FaTag, FaArrowLeft } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/api/posts/${id}`);
        setPost(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  if (!post) {
    return <div className="text-center py-10">Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back to Posts
      </button>

      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      
      <div className="flex items-center text-gray-600 mb-4">
        <div className="flex items-center mr-4">
          <FaUser className="mr-2" />
          <span>{post.author.username}</span>
        </div>
        <div className="flex items-center mr-4">
          <FaCalendarAlt className="mr-2" />
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <FaTag className="mr-2" />
          <span>{post.category.name}</span>
        </div>
      </div>

      {post.featuredImage && (
        <div className="my-6">
          <img
            src={`http://localhost:5000/uploads/${post.featuredImage.split('\\').pop()}`}
            alt={post.title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      )}

      <div className="prose max-w-none mt-6">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PostDetailPage;