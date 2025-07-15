import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Importez toast

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  // Supprimez les états message et messageType
  // const [message, setMessage] = useState('');
  // const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const { username, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // Supprimez les réinitialisations de message
    // setMessage('');
    // setMessageType('');

    if (password !== password2) {
      toast.error('Les mots de passe ne correspondent pas'); // Notification d'erreur
    } else {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const body = JSON.stringify({ username, email, password });
        const res = await axios.post('http://localhost:5000/api/auth/register', body, config);

        toast.success(res.data.msg); // Notification de succès
        setTimeout(() => navigate('/login'), 1000);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
        const msg = err.response?.data?.msg || 'Erreur lors de l\'inscription. Veuillez réessayer.';
        toast.error(msg); // Notification d'erreur
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Register</h2>
        {/* Supprimez le bloc d'affichage des messages manuel */}
        {/* {message && (
          <div className={`p-3 rounded-md mb-4 font-semibold ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )} */}
        <div className="mb-4 text-left">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={onChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 text-left">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 text-left">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6 text-left">
          <label htmlFor="password2" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-200">Register</button>
        <Link to="/login" className="block mt-4 text-blue-500 hover:text-blue-700 text-sm transition-colors duration-200">Already have an account? Login</Link>
      </form>
    </div>
  );
}

export default Register;