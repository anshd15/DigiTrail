import { useEffect, useState } from 'react';
import { Horizon } from 'diamante-sdk-js';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const server = new Horizon.Server('https://diamtestnet.diamcircle.io');
	const [balance, setBalance] = useState(0);
	const navigate = useNavigate();
	const fetchDiamBalance = async () => {
		try {
			const response = await server.loadAccount(
				localStorage.getItem('public_address')
			);
			setBalance(response.balances[0].balance);
		} catch (error) {
			console.error('Failed to fetch balance:', error);
		}
	};
	const publicAddress = localStorage.getItem('public_address');
	const addressLen = publicAddress ? publicAddress.length : 0;
	useEffect(() => {
		fetchDiamBalance();
	}, [balance]);
	return (
		<div>
			<div className='navbar bg-base-300'>
				<div className='flex-1 text-xl text-white'>
					<img width={50} src='/logodt.png' alt='' />
					<a className='btn btn-ghost text-xl'>DigiTrail</a>
				</div>
				<div className='flex-none'>
					<ul className='flex w-full gap-x-4'>
						<div className='text-black flex min-w-[27%] gap-x-2 border-2 bg-gray-900 border-cyan-500 rounded-full p-1'>
							{publicAddress && (
								<div
									onClick={() => {
										navigator.clipboard.writeText(publicAddress);
										toast.success('Public address copied to clipboard!', {
											style: {
												background: '#7065F0',
												color: 'white',
											},
										});
									}}
									className='cursor-pointer border-1 bg-cyan-200 rounded-full p-2'
								>
									{publicAddress.slice(0, 5) +
										'...' +
										publicAddress.slice(addressLen - 5)}
								</div>
							)}

							<div className='flex items-center gap-2 border-1 w-full bg-cyan-200 rounded-full p-2'>
								<img src='/diam.png' width={50} alt='' />
								<p>{balance} DIAMS</p>
							</div>
						</div>
						<button
							onClick={() => {
								navigate('/create-order');
							}}
							className='bg-cyan-600 text-white hover:bg-cyan-500 py-2 px-3 text-lg rounded-xl'
						>
							Create Order 👜
						</button>
						<img
							src='/logout.png'
							width={30}
              className='cursor-pointer'
							onClick={() => {
								localStorage.clear();
								navigate('/login');
							}}
						/>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
