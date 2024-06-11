import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Feedback = {
  name: string;
  feedback: string;
};

const App: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get<Feedback[]>('http://localhost:3000/feedback');
      setFeedbacks(response.data);
    } catch (error) {
      toast.error('Error fetching feedbacks');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingIndex !== null) {
        await axios.put(`http://localhost:3000/feedback/${editingIndex}`, { name, feedback });
        setEditingIndex(null);
        toast.success('Feedback updated');
      } else {
        const response = await axios.post('http://localhost:3000/feedback', { name, feedback });
        setFeedbacks([response.data, ...feedbacks]); // Prepend the new feedback
        toast.success('Feedback submitted');
      }
      setName('');
      setFeedback('');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data);
      } else {
        toast.error('Network Error');
      }
    }
  };

  const handleEdit = (index: number) => {
    setName(feedbacks[index].name);
    setFeedback(feedbacks[index].feedback);
    setEditingIndex(index);
  };

  const handleDelete = async (index: number) => {
    try {
      await axios.delete(`http://localhost:3000/feedback/${index}`);
      fetchFeedbacks();
      toast.success('Feedback deleted');
    } catch (error) {
      toast.error('Error deleting feedback');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Feedback System</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Feedback"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {editingIndex !== null ? 'Update' : 'Submit'}
        </button>
      </form>
      <div className="max-w-md mx-auto mt-6 grid grid-cols-1 gap-4">
        {feedbacks.map((fb, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition duration-200 flex items-center"
            style={{ maxWidth: '400px' }}
          >
            <div className="mr-4 flex-1">
              <strong className="block text-blue-500">{fb.name}</strong>
              <p>{fb.feedback}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(index)}
                className="text-blue-500 hover:text-blue-700 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
