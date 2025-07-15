import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook
import './Auth.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth(); // Get the register function from context

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    const result = await register(username, password); // Call register from context

    if (result.success) {
      setMessage(result.message);
      setMessageType('success');
      setTimeout(() => navigate('/private'), 1000); // Redirect after successful registration (auto-login)
    } else {
      setMessage(result.message);
      setMessageType('danger');
    }
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={onSubmit}>
        <h2>Register</h2>
        {message && (
          <div className={`alert alert-${messageType}`}>
            {message}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <button type="submit" className="btn-primary">Register</button>
        <Link to="/login" className="auth-link">Already have an account? Login</Link>
      </form>
    </div>
  );
}

export default Register;