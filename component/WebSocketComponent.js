

import React, { useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import Chart from './Chart';

const WebSocketComponent = () => {
  const [symbol, setSymbol] = useState('ethusdt'); // Default symbol
  const [interval, setInterval] = useState('1m'); // Default interval
  const { klineData, historicalData, error } = useWebSocket(symbol, interval);

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value.toLowerCase());
  };

  const handleIntervalChange = (event) => {
    setInterval(event.target.value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>Cryptocurrency Charting Data</h3>
      <div>
        <label>Select Cryptocurrency: </label>
        <select onChange={handleSymbolChange} value={symbol}>
          <option value="ethusdt">ETH/USDT</option>
          <option value="bnbusdt">BNB/USDT</option>
          <option value="dotusdt">DOT/USDT</option>
        </select>

        <label>Select Interval: </label>
        <select onChange={handleIntervalChange} value={interval}>
          <option value="1m">1 Minute</option>
          <option value="3m">3 Minute</option>
          <option value="5m">5 Minutes</option>
          <option value="15m">15 Minutes</option>
          <option value="1h">1 Hour</option>
          <option value="1d">1 Day</option>
        </select>
      </div>

      <Chart historicalData={historicalData[symbol] || []} />

      <h4>Live Data of {symbol}:</h4>
      {klineData ? (
        <div>
          <p>Open: {klineData.open}</p>
          <p>High: {klineData.high}</p>
          <p>Low: {klineData.low}</p>
          <p>Close: {klineData.close}</p>
          <p>Open Time: {new Date(klineData.time * 1000).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WebSocketComponent;
