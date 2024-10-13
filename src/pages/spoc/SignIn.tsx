import React, { useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { spocLogin } from '../../api/api'; // Adjust the import path as needed
import './SignIn.css'; // Import the CSS file

const SpocSignIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await spocLogin({ email, password });
      localStorage.setItem('token', data.token);
      navigate('/spoc/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Login failed');
      } else {
        setError('Login failed');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <div className="text-center">
          <img
            className="signin-logo"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Your Logo"
          />
          <h2 className="signin-title">Welcome Back</h2>
          <p className="signin-subtitle">Sign in to continue to your dashboard</p>
        </div>
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="signin-input-group">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={handleChange}
              className="signin-input"
              placeholder="Email address"
            />
          </div>
          <div className="signin-input-group">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={handleChange}
              className="signin-input"
              placeholder="Password"
            />
          </div>
          {error && <div className="signin-error">{error}</div>}
          <div className="flex items-center justify-between mt-4">
            <a href="#" className="signin-forgot">
              Forgot your password?
            </a>
          </div>
          <div>
            <button type="submit" className="signin-button">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpocSignIn;
