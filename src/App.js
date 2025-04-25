import React, { useEffect } from 'react';
import './App.css'; 
import CryptoTable from './components/CryptoTable';
import { startMockWebSocket } from './utils/mockWebSocket';

function App() {
  useEffect(() => {
    startMockWebSocket();
  }, []);

  return (
    <div className="App">
      <h1>Real-Time Crypto Prices</h1>
      <CryptoTable />
    </div>
  );
}

export default App;