
import { useEffect, useState } from 'react';

export const useWebSocket = (symbol, interval) => {
  const [klineData, setKlineData] = useState(null);
  const [error, setError] = useState(null);
  const [historicalData, setHistoricalData] = useState({});
  const [ws, setWs] = useState(null);

  useEffect(() => {
    if (ws) {
      ws.close(); // Close existing WebSocket before creating a new one
    }

    const url = `wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`;
    const newWs = new WebSocket(url);
    let isWsOpen = false;

    newWs.onopen = () => {
      console.log('WebSocket connected');
      isWsOpen = true;
    };

    newWs.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const kline = message.k;

      const newKline = {
        time: kline.t / 1000,
        open: parseFloat(kline.o),
        high: parseFloat(kline.h),
        low: parseFloat(kline.l),
        close: parseFloat(kline.c),
      };

      if (newKline.open && newKline.high && newKline.low && newKline.close && newKline.time) {
        setKlineData(newKline);
        setHistoricalData((prevData) => {
          const updatedData = {
            ...prevData,
            [symbol]: [...(prevData[symbol] || []), newKline],
          };
          return updatedData;
        });
      } else {
        console.warn('Received invalid kline data:', newKline);
      }
    };

    newWs.onerror = (event) => {
      console.error('WebSocket error:', event);
      setError('WebSocket error');
    };

    newWs.onclose = () => {
      console.log('WebSocket disconnected');
    };

    setWs(newWs);

    // Cleanup function to close WebSocket only if it was successfully opened
    return () => {
      if (isWsOpen) {
        newWs.close();
      }
    };
  }, [symbol, interval]);

  return { klineData, historicalData, error };
};
