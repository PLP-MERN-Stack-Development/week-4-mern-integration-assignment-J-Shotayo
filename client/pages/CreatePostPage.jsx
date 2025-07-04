import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaSpinner, FaUpload, FaArrowLeft } from 'react-icons/fa';

const CreatePostPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/categories');
        setCategories(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      category: '',
      featuredImage: null
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      content: Yup.string().required('Required'),
      category: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('content', values.content);
        formData.append('category', values.category);
        if (values.featuredImage) {
          formData.append('featuredImage', values.featuredImage);
        }

        const response = await api.post('/api/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        navigate(`/posts/${response.data.data._id}`);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to create post');
      } finally {
        setSubmitting(false);
      }
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <FaArrowLeft className="mr-1" /> Back
      </button>
      
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="w-full p-2 border rounded"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500 text-sm">{formik.errors.title}</div>
          ) : null}
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows="6"
            className="w-full p-2 border rounded"
            value={formik.values.content}
            onChange={formik.handleChange}
          ></textarea>
          {formik.touched.content && formik.errors.content ? (
            <div className="text-red-500 text-sm">{formik.errors.content}</div>
          ) : null}
        </div>
        
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="w-full p-2 border rounded"
            value={formik.values.category}
            onChange={formik.handleChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category ? (
            <div className="text-red-500 text-sm">{formik.errors.category}</div>
          ) : null}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Featured Image</label>
          <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg border border-dashed cursor-pointer hover:bg-gray-50">
            <FaUpload className="text-2xl mb-2 text-gray-500" />
            <span className="text-sm text-gray-600">
              {formik.values.featuredImage 
                ? formik.values.featuredImage.name 
                : 'Click to upload image'}
            </span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(event) => {
                formik.setFieldValue('featuredImage', event.currentTarget.files[0]);
              }}
            />
          </label>
        </div>
        
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 flex justify-center items-center"
        >
          {submitting ? (
            <>
              <FaSpinner className="animate-spin mr-2" /> Creating...
            </>
          ) : (
            'Create Post'
          )}
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;