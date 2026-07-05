import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin'; // Adjust this path to match your folder structure!

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-950 px-4'>
      <div className='w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl'>
        
        <h1 className='text-3xl font-extrabold text-center text-white mb-2 tracking-wide'>
          Welcome Back
        </h1>
        <p className='text-sm text-center text-slate-400 mb-6'>
          Connect to <span className='text-blue-400 font-semibold'>ChatSphere</span>
        </p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Username */}
          <div>
            <label className='block text-sm font-medium text-slate-300 mb-1.5'>Username</label>
            <input 
              type='text' 
              placeholder='Enter username' 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200'
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className='flex justify-between items-center mb-1.5'>
              <label className='block text-sm font-medium text-slate-300'>Password</label>
              <a href='#' className='text-xs text-blue-400 hover:underline'>Forgot?</a>
            </div>
            <input 
              type='password' 
              placeholder='••••••••' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200'
              required
            />
          </div>

          {/* Action Button */}
          <button 
            type='submit' 
            disabled={loading}
            className='w-full py-3 mt-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.99] transition-all duration-150 disabled:opacity-50'
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className='mt-6 text-sm text-center text-slate-400'>
          Don't have an account?{' '}
          <Link to='/signup' className='text-blue-400 hover:underline font-medium hover:text-blue-300 transition-colors'>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;