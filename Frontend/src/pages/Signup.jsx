import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { server_url } from '../../utils/api';
import toast from 'react-hot-toast';
import axios from 'axios';

const Signup = ({ setProgress }) => {
	// !/^[a-zA-Z0-9_]{3,60}$/.test(username)
	const [username, setUsername] = useState('');
	const [secretKey, setSecretKey] = useState('');
	const [publicAddress, setPublicAddress] = useState('');
	const navigate = useNavigate();

	const handleGenerateKeys = async (e) => {
		e.preventDefault();
		if (!/^[a-zA-Z0-9_]{3,60}$/.test(username)) {
			toast.error('Invalid username');
			return;
		}
		try {
			document.getElementById('my_modal_5').showModal();
			setProgress(30);
			const resp = await axios.post(`${server_url}/auth/signup`, {
				username,
			});
			setProgress(47);
			setSecretKey(resp.data.result.secret_key);
			setPublicAddress(resp.data.result.public_address);
			localStorage.setItem('access_token', resp.data.access_token);
			localStorage.setItem('public_address', resp.data.result.public_address);
			const fund = await axios.post(
				`${server_url}/auth/fund-account`,
				{ public_address: resp.data.result.public_address },
				{
					headers: { Authorization: `Bearer ${resp.data.access_token}` },
				}
			);
			setProgress(60);
			toast.success('User registered successfully 🎉');
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.error);
			setProgress(100);
		}
	};

	return (
		<div
			className='hero min-h-screen'
			style={{
				backgroundImage:
					'url(/bg2.jpg)',
			}}
		>
			<dialog
				id='my_modal_5'
				className='modal modal-bottom sm:modal-middle text-white'
			>
				<div className='modal-box'>
					<h1 className='font-bold text-xl'>Secret Key</h1>
					<div className='my-4 text-wrap'>
						<p>{secretKey} </p>
						<p
							onClick={() => {
								navigator.clipboard.writeText(secretKey);
								toast('Copied to clipboard!', {
									style: {
										background: '#7065F0',
										color: 'white',
									},
								});
							}}
							className='cursor-pointer my-5 bg-cyan-700 p-1 text-center rounded-xl'
						>
							Copy Secret Key{' '}
						</p>
						<h2 className='text-lg my-3 font-bold'>Your Public Address :</h2>{' '}
						<p>{publicAddress}</p>
						<p
							onClick={() => {
								navigator.clipboard.writeText(publicAddress);
								toast('Copied to clipboard!', {
									style: {
										background: '#7065F0',
										color: 'white',
									},
								});
							}}
							className='cursor-pointer my-5 bg-cyan-700 p-1 text-center rounded-xl'
						>
							Copy Public Address{' '}
						</p>
					</div>
					<span className='my-3 text-gray-300'>
						<b>
							Note: Copy and save this secret key, you will need it for next
							time you login. Don't share it with anyone!
						</b>
					</span>
					<div className='modal-action'>
						<form method='dialog'>
							{/* if there is a button in form, it will close the modal */}

							<button
								className='btn bg-cyan-500 hover:bg-cyan-600 text-black'
								onClick={() => navigate('/create-order')}
							>
								Proceed
							</button>
						</form>
					</div>
				</div>
			</dialog>

			<div className='hero bg-black bg-opacity-70 min-h-screen'>
				<div className='hero-content  flex-col lg:flex-row-reverse'>
					<div className='text-center lg:text-left mx-20'>
						<h1 className='text-5xl flex items-center text-white font-bold'>
							Sign Up on{' '}
							<img src='/logodt.png' className='mx-4' width={100} alt='logo' />{' '}
							DiamFunds!
						</h1>
						<p className='py-6 text-white text-2xl'>
							"A decentralized platform for supply chain management"
						</p>
					</div>
					<div className='card bg-transparent backdrop-blur-md border w-full max-w-sm shrink-0 shadow-2xl'>
						<form onSubmit={handleGenerateKeys} className='card-body'>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>User Name</span>
								</label>
								<input
									type='text'
									placeholder='Enter your username'
									className='input input-bordered input-accent text-white text-md'
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									required
								/>
							</div>
							<div className='form-control'>
								<label className='label mt-2'>
									<p className='label-text text-md link link-hover'>
										Already have an account? <Link to={'/login'}>Login</Link>
									</p>
								</label>
							</div>
							<div className='form-control my-3'>
								<button className='btn btn-accent'>Generate Keys</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
