import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PostCard from '../components/Postcard';
import api from '../services/api';
import { FaSpinner, FaSearch, FaSadTear } from 'react-icons/fa';

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchPosts = async () => {
      try {
        const response = await api.get(`/api/posts/search?query=${query}`);
        setPosts(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (query) {
      searchPosts();
    }
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FaSearch className="mr-3" />
        Search Results for "{query}"
      </h1>
      
      {posts.length === 0 ? (
        <div className="text-center py-10">
          <FaSadTear className="text-5xl text-gray-400 mx-auto mb-4" />
          <p className="text-xl">No posts found matching your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;