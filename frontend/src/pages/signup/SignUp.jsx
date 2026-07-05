import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup'; // Adjust this path to match your folder structure!

const SignUp = () => {
  // 1. State for managing form inputs
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });

  // 2. Getting the signup function and loading state from your custom hook
  const { loading, signup } = useSignup();

  // 3. Handle submit event
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents silent page refresh
    await signup(inputs); // Passes your form data to the backend hook
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-950 px-4'>
      <div className='w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl'>
        
        <h1 className='text-3xl font-extrabold text-center text-white mb-6 tracking-wide'>
          Create Account <span className='text-blue-500 bg-blue-500/10 px-2 py-1 rounded-lg ml-1'>ChatSphere</span>
        </h1>

        {/* 4. Connected handleSubmit to form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Full Name */}
          <div>
            <label className='block text-sm font-medium text-slate-300 mb-1.5'>Full Name</label>
            <input 
              type='text' 
              placeholder='John Doe' 
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
              className='w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200'
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className='block text-sm font-medium text-slate-300 mb-1.5'>Username</label>
            <input 
              type='text' 
              placeholder='johndoe' 
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              className='w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200'
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className='block text-sm font-medium text-slate-300 mb-1.5'>Password</label>
            <input 
              type='password' 
              placeholder='••••••••' 
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              className='w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200'
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className='block text-sm font-medium text-slate-300 mb-1.5'>Confirm Password</label>
            <input 
              type='password' 
              placeholder='••••••••' 
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
              className='w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200'
              required
            />
          </div>

          {/* Gender Options */}
          <div className='flex items-center space-x-6 py-1'>
            <label className='flex items-center space-x-2.5 text-sm text-slate-300 cursor-pointer select-none'>
              <input 
                type='radio' 
                name='gender' 
                checked={inputs.gender === 'male'}
                onChange={() => setInputs({ ...inputs, gender: 'male' })}
                className='w-4 h-4 text-blue-600 bg-slate-900 border-slate-700 focus:ring-blue-500 focus:ring-offset-slate-900' 
              />
              <span>Male</span>
            </label>
            <label className='flex items-center space-x-2.5 text-sm text-slate-300 cursor-pointer select-none'>
              <input 
                type='radio' 
                name='gender' 
                checked={inputs.gender === 'female'}
                onChange={() => setInputs({ ...inputs, gender: 'female' })}
                className='w-4 h-4 text-blue-600 bg-slate-900 border-slate-700 focus:ring-blue-500 focus:ring-offset-slate-900' 
              />
              <span>Female</span>
            </label>
          </div>

          {/* Action Button changing state visually during network request */}
          <button 
            type='submit' 
            disabled={loading}
            className='w-full py-3 mt-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.99] transition-all duration-150 disabled:opacity-50'
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className='mt-6 text-sm text-center text-slate-400'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-400 hover:underline font-medium hover:text-blue-300 transition-colors'>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;