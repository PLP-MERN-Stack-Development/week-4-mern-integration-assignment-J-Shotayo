import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Header from '../components/Header';
import HomePage from '../pages/HomePage';
import PostDetailPage from '../pages/PostDetailPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CreatePostPage from '../pages/CreatePostPage';
import PrivateRoute from '../components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/create-post"
            element={
              <PrivateRoute>
                <CreatePostPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;