import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

const CreateOrder = ({ setProgress }) => {
	const [formData, setFormData] = useState({
		title: '',
		desc: '',
		token_name: '',
		last_track_point: '',
		next_track_point: '',
	});

	const [responseMessage, setResponseMessage] = useState('');

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setProgress(50);
			const response = await listFund(formData);
			toast.success(response.data.message);
			navigate('/');
		} catch (error) {
			setProgress(100);
			toast.error(error.response ? error.response.data.error : error.message);
		}
	};

	return (
		<div>
			<Navbar />
			<div className='w-full min-h-screen bg-[url(/bg.jpg)] bg-contain flex justify-center overflow-hidden py-4'>
				<div
					className='mx-auto p-4 rounded-xl bg-[#03071296] backdrop-blur-md border text-white w-[80%] md:w-[50%] h-fit'
				>
					<h1 className='text-2xl font-bold mb-4'>Create Product Order 📦</h1>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<div>
							<label htmlFor='title' className='block text-sm font-medium'>
								Title
							</label>
							<input
								type='text'
								id='title'
								name='title'
								value={formData.title}
								onChange={handleChange}
								className='mt-1 border-2 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-[30px] p-2'
								required
							/>
						</div>
						<div>
							<label htmlFor='desc' className='block text-sm font-medium'>
								Description
							</label>
							<textarea
								id='desc'
								name='desc'
								value={formData.desc}
								onChange={handleChange}
								rows='4'
								className='mt-1 border-2 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
								required
							/>
						</div>
						<div>
							<label htmlFor='token_name' className='block text-sm font-medium'>
								Token name
							</label>
							<input
								type='text'
								id='token_name'
								name='token_name'
								value={formData.token_name}
								onChange={handleChange}
								className='mt-1 border-2 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-[30px] p-2'
								required
							/>
						</div>
						<div>
							<label
								htmlFor='last_track_point'
								className='block text-sm font-medium'
							>
								Last track point
							</label>
							<input
								type='text'
								id='last_track_point'
								name='last_track_point'
								value={formData.last_track_point}
								onChange={handleChange}
								className='mt-1 border-2 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-[30px] p-2'
								required
							/>
						</div>
						<div>
							<label
								htmlFor='next_track_point'
								className='block text-sm font-medium'
							>
								Next track point (for creating trustline)
							</label>
							<input
								type='text'
								id='next_track_point'
								name='next_track_point'
								value={formData.next_track_point}
								onChange={handleChange}
								className='mt-1 border-2 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-[30px] p-2'
								required
							/>
						</div>

						<button
							type='submit'
							className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							Submit
						</button>
					</form>
					{responseMessage && <p className='mt-4 text-lg'>{responseMessage}</p>}
				</div>
			</div>
		</div>
	);
};

export default CreateOrder;
