import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;