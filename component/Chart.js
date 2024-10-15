// src/components/Chart.js

import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const Chart = ({ historicalData }) => {
  const chartContainerRef = useRef();
  const candleSeriesRef = useRef(null); // Ref to store the candle series

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        layout: {
          backgroundColor: '#ffffff',
          textColor: '#333',
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: true,
        },
      });

      candleSeriesRef.current = chart.addCandlestickSeries({
        upColor: '#4fff4f',
        downColor: '#ff4976',
        borderVisible: false,
        wickVisible: true,
      });

      return () => {
        chart.remove();
      };
    }
  }, []);

  useEffect(() => {
    if (candleSeriesRef.current && historicalData.length > 0) {
      candleSeriesRef.current.setData(historicalData);
    }
  }, [historicalData]);

  return (
    <div ref={chartContainerRef} style={{ position: 'relative', width: '100%', height: '500px' }} />
  );
};

export default Chart;
