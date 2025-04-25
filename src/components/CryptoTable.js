import React from 'react';
import { useSelector } from 'react-redux';
import { selectAssets } from '../redux/cryptoSlice';
import './CryptoTable.css';

const CryptoTable = () => {
  const assets = useSelector(selectAssets);

  const formatNumber = (number) => {
    if (number >= 1_000_000_000_000) return (number / 1_000_000_000_000).toFixed(2) + 'T';
    if (number >= 1_000_000_000) return (number / 1_000_000_000).toFixed(2) + 'B';
    if (number >= 1_000_000) return (number / 1_000_000).toFixed(2) + 'M';
    return number.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const formatPercentage = (percentage) => {
    const formatted = parseFloat(percentage).toFixed(2);
    return <span style={{ color: formatted >= 0 ? 'green' : 'red' }}>{formatted}%</span>;
  };

  const SparklineChart = ({ data }) => {
    if (!data || data.length < 2) return <div>No Data</div>;

    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);

    const points = data.map((price, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((price - minValue) / (maxValue - minValue)) * 100;
      return `${x},${y}`;
    });

    return (
      <svg width="100" height="30" viewBox="0 0 100 100" style={{ border: '1px solid red', borderRadius: '4px' }}>
        <polyline
          fill="none"
          stroke="green"
          strokeWidth="4.5"
          points={points.join(' ')}
        />
        {points.map((point, index) => {
          const [cx, cy] = point.split(',').map(Number);
          return <circle key={index} cx={cx} cy={cy} r="1.5" fill="green" />;
        })}
      </svg>
    );
  };

  return (
    <div className="crypto-page">
      <div className="table-container">
        <table className="crypto-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>1h %</th>
              <th>24h %</th>
              <th>7d %</th>
              <th>Market Cap</th>
              <th>24h Volume</th>
              <th>Circulating Supply</th>
              <th>Max Supply</th>
              <th>7D Chart</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <tr key={asset.id}>
                <td>{index + 1}</td>
                <td><strong>{asset.symbol}</strong> {asset.name}</td>
                <td>${asset.price.toFixed(2)}</td>
                <td>{formatPercentage(asset.change1h)}</td>
                <td>{formatPercentage(asset.change24h)}</td>
                <td>{formatPercentage(asset.change7d)}</td>
                <td>${formatNumber(asset.marketCap)}</td>
                <td>${formatNumber(asset.volume24h)}</td>
                <td>{formatNumber(asset.circulatingSupply)} {asset.symbol}</td>
                <td>{asset.maxSupply ? formatNumber(asset.maxSupply) + ' ' + asset.symbol : '∞'}</td>
                <td><SparklineChart data={asset.sparkline7d} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;
