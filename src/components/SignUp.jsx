import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.find(user => user.email === email);

    if (userExists) {
      alert('User already exists!');
    } else {
      existingUsers.push({ email, password });
      localStorage.setItem('users', JSON.stringify(existingUsers));
      alert('Sign-up successful! You can now log in.');
      navigate('/login'); 
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Sign Up</h2>
      <div className="row">
        <div className="col-lg-6 mx-auto  mt-4">
        <form onSubmit={handleSignUp} className="card p-4 shadow">
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
        <button type="submit" className="btn btn-dark w-100">Sign Up</button>
        <p className="mt-3 text-center">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
