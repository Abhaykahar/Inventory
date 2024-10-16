import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = existingUsers.find(user => user.email === email && user.password === password);

    if (user) {
      dispatch(login({ role: email === 'admin@example.com' ? 'admin' : 'customer' }));
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('role', user.role || 'customer');
      navigate(user.role === 'admin' ? '/admin' : '/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <div className="row">
        <div className="col-lg-6 mx-auto mt-3">
        <form onSubmit={handleLogin} className="card p-4 shadow">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-dark w-100">Login</button>
        <p className="mt-3 text-center">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
