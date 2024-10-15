import React, { useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import Chart from './Chart';

const WebSocketComponent = () => {
  const [symbol, setSymbol] = useState('ethusdt'); 
  const [interval, setInterval] = useState('1m'); 
  const { klineData, historicalData, error } = useWebSocket(symbol, interval);

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value.toLowerCase());
  };

  const handleIntervalChange = (event) => {
    setInterval(event.target.value);
  };

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  return (
    <div className="m-12 bg-sky-50 text-gray-800 p-6 rounded-lg shadow-lg border border-black hover:drop-shadow-2xl ">
      <h3 className="text-3xl font-bold mb-4">Cryptocurrency Charting Data</h3>
      
      <div className="mb-4">
        <label className="mr-4">Select Cryptocurrency:</label>
        <select 
          className="border border-gray-300 bg-gray-100 text-gray-800 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
          onChange={handleSymbolChange} 
          value={symbol}
        >
          <option value="ethusdt">ETH/USDT</option>
          <option value="bnbusdt">BNB/USDT</option>
          <option value="dotusdt">DOT/USDT</option>
        </select>

        <label className="ml-4 mr-4">Select Interval:</label>
        <select 
          className="border border-gray-300 bg-gray-100 text-gray-800 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
          onChange={handleIntervalChange} 
          value={interval}
        >
          <option value="1m">1 Minute</option>
          <option value="3m">3 Minutes</option>
          <option value="5m">5 Minutes</option>
          <option value="15m">15 Minutes</option>
          <option value="1h">1 Hour</option>
          <option value="1d">1 Day</option>
        </select>
      </div>

      <Chart historicalData={historicalData[symbol] || []} />

      <h4 className="text-xl font-semibold mt-6">Live Data of {symbol}:</h4>
      {klineData ? (
        <div className="mt-2 w-10/12 bg-gray-50 p-4 rounded shadow">
          <p><strong>Open:</strong> {klineData.open}</p>
          <p><strong>High:</strong> {klineData.high}</p>
          <p><strong>Low:</strong> {klineData.low}</p>
          <p><strong>Close:</strong> {klineData.close}</p>
          <p><strong>Open Time:</strong> {new Date(klineData.time * 1000).toLocaleString()}</p>
        </div>
      ) : (
        <p className="mt-2">Loading...</p>
      )}
    </div>
  );
};

export default WebSocketComponent;
