import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';
import { FaSignInAlt, FaSpinner } from 'react-icons/fa';

const LoginPage = () => {
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        const response = await api.post('/api/auth/login', values);
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FaSignInAlt className="mr-2" /> Login
      </h1>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full p-2 border rounded"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full p-2 border rounded"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>
        
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 flex justify-center items-center"
        >
          {submitting ? (
            <>
              <FaSpinner className="animate-spin mr-2" /> Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-600 hover:underline">
          Register
        </a>
      </div>
    </div>
  );
};

export default LoginPage;