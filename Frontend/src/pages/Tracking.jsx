import React, { useState } from 'react';

function TrackingPage() {
  const [middlePoints, setMiddlePoints] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [reachedPoints, setReachedPoints] = useState([]);

  const addMiddlePoint = () => {
    if (inputValue.trim() !== '') {
      const newPoint = {
        name: inputValue,
        city: 'City Name', // Replace with actual city data
        dateTime: new Date().toLocaleString()
      };
      setMiddlePoints([...middlePoints, newPoint]);
      setInputValue('');
    }
  };

  const markPointAsReached = (index) => {
    setReachedPoints([...reachedPoints, index]);
  };

  // Calculate margin size based on the number of points
  const marginSize = middlePoints.length > 0 ? `mx-${Math.min(10, 2 + middlePoints.length * 2)}` : 'mx-2';

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tracker</h1>
      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a middle point"
          className="input input-bordered w-full max-w-xs"
        />
        <button onClick={addMiddlePoint} className="btn btn-primary ml-2">
          Add Point
        </button>
      </div>
      <div className="flex items-center justify-center w-full h-[60vh]">
        <div className="w-full ">
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center">1</div>
              <div className="text-center mt-2">Initial</div>
              <div className="text-center mt-1 text-sm">City Name</div>
              <div className="text-center text-xs">Date and Time</div>
            </div>
            <div className={`flex-1 h-1 bg-gray-300 ${marginSize}`}></div>
            {middlePoints.map((point, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div
                    className={`${
                      reachedPoints.includes(index) ? 'bg-green-500' : 'bg-gray-500'
                    } text-white rounded-full h-8 w-8 flex items-center justify-center`}
                    onClick={() => markPointAsReached(index)}
                  >
                    {index + 2}
                  </div>
                  <div className="text-center mt-2">{point.name}</div>
                  <div className="text-center mt-1 text-sm">{point.city}</div>
                  <div className="text-center text-xs">{point.dateTime}</div>
                </div>
                <div className={`flex-1 h-1 bg-gray-300 ${marginSize}`}></div>
              </React.Fragment>
            ))}
            <div className="flex flex-col items-center">
              <div className="bg-green-700 text-white rounded-full h-8 w-8 flex items-center justify-center">
                {middlePoints.length + 2}
              </div>
              <div className="text-center mt-2">Final</div>
              <div className="text-center mt-1 text-sm">City Name</div>
              <div className="text-center text-xs">Date and Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackingPage;
