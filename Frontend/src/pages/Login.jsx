import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { server_url } from '../../utils/api';

const Login = ({ setProgress }) => {
	const [username, setUsername] = useState('');
	const [secretKey, setSecretKey] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			setProgress(30);
			const resp = await axios.post(`${server_url}/auth/login`, {
				username,
				secret_key: secretKey,
			});
			setProgress(60);
			localStorage.setItem('access_token', resp.data.access_token);
			localStorage.setItem('public_address', resp.data.result.public_address);
			navigate('/');
			toast.success('User logged in successfully 🎉');
		} catch (error) {
			console.error(error);
			toast.error(error.response.data.error);
			setProgress(100);
		}
	};
	return (
		<div
			className='hero min-h-screen'
			style={{
				backgroundImage: 'url(/bg2.jpg)',
			}}
		>
			<div className='hero bg-black bg-opacity-70 min-h-screen'>
				<div className='hero-content  flex-col lg:flex-row-reverse'>
					<div className='text-center lg:text-left mx-20'>
						<h1 className='text-5xl flex items-center mx-3 text-white font-bold'>
							Login to{' '}
							<img className='mx-4' src='/logodt.png' width={100} alt='logo' />{' '}
							DiamFunds!
						</h1>
						<p className='py-6 text-white text-2xl'>
							"A decentralized platform for supply chain management"
						</p>
					</div>
					<div className='card bg-transparent backdrop-blur-md border w-full max-w-sm shrink-0 shadow-2xl'>
						<form onSubmit={handleLogin} className='card-body'>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>User Name</span>
								</label>
								<input
									type='text'
									placeholder='Enter your username '
									className='input input-bordered input-accent text-white'
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									required
								/>
							</div>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Secret Key</span>
								</label>
								<input
									type='text'
									placeholder='Enter your secret key'
									className='input input-bordered input-accent text-white'
									value={secretKey}
									onChange={(e) => setSecretKey(e.target.value)}
									required
								/>
								<label className='label mt-2'>
									<Link
										to={'/signup'}
										className='label-text-alt link link-hover'
									>
										Don't have an account? Sign Up
									</Link>
								</label>
							</div>
							<div className='form-control mt-6'>
								<button className='btn btn-accent'>Login</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
