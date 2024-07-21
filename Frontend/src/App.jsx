import { useState } from 'react';
import './App.css';
import TrackingPage from './pages/Tracking';
import Home from './pages/Home';
import SendPage from './pages/SendPage';
import RecievedPage from './pages/RecievedPage';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LoadingBar from 'react-top-loading-bar';
import CreateOrder from './pages/CreateOrder';
function App() {
	const [progress, setProgress] = useState(0);

	return (
		<>
			<BrowserRouter>
				<div className='main'>
					<Toaster />
					<LoadingBar
						color='#3120e2'
						height={4}
						shadow={true}
						progress={progress}
						onLoaderFinished={() => setProgress(0)}
					/>
					<Routes>
						<Route
							path='/send'
							element={<SendPage setProgress={setProgress} />}
						/>
						<Route
							path='/recieved'
							element={<RecievedPage setProgress={setProgress} />}
						/>
						<Route path='/' element={<Home setProgress={setProgress} />} />
						<Route
							path='/track'
							element={<TrackingPage setProgress={setProgress} />}
						/>
						<Route
							path='/login'
							element={<Login setProgress={setProgress} />}
						/>
						<Route
							path='/signup'
							element={<Signup setProgress={setProgress} />}
						/>
						<Route
							path='/create-order'
							element={<CreateOrder setProgress={setProgress} />}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</>
	);
}

export default App;
