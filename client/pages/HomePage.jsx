import { useEffect, useState } from 'react';
import PostCard from '../components/Postcard';
import api from '../services/api';
import { FaSpinner } from 'react-icons/fa';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalPosts: 0
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get(`/api/posts?page=${pagination.page}`);
        setPosts(response.data.data);
        setPagination({
          page: response.data.pagination.currentPage,
          totalPages: response.data.pagination.totalPages,
          totalPosts: response.data.pagination.totalPosts
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [pagination.page]);

  const handlePageChange = (event, value) => {
    setPagination(prev => ({ ...prev, page: value }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Pagination
          count={pagination.totalPages}
          page={pagination.page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default HomePage;