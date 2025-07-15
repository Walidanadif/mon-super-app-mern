import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify'; // Importez toast

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  // Supprimez les états message et messageType, ils ne sont plus nécessaires
  // const [message, setMessage] = useState('');
  // const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // Supprimez les réinitialisations de message
    // setMessage('');
    // setMessageType('');

    const result = await login(username, password);

    if (result.success) {
      toast.success(result.message); // Affiche une notification de succès
      setTimeout(() => navigate('/private'), 1000);
    } else {
      toast.error(result.message); // Affiche une notification d'erreur
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Login</h2>
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
        <div className="mb-6 text-left">
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
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-200">Login</button>
        <Link to="/register" className="block mt-4 text-blue-500 hover:text-blue-700 text-sm transition-colors duration-200">Don't have an account? Register</Link>
      </form>
    </div>
  );
}

export default Login;