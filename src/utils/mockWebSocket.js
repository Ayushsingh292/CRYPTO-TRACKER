import { store } from '../redux/store';
import { updateAsset } from '../redux/cryptoSlice';

const assetsToUpdate = ['bitcoin', 'ethereum', 'tether', 'xrp', 'binancecoin'];
const historicalData = {};

assetsToUpdate.forEach(id => {
    const initialPrice = store.getState().crypto.assets.find(asset => asset.id === id)?.price || 100;
    historicalData[id] = [
        initialPrice * 0.95,
        initialPrice * 1.05,
        initialPrice * 0.90,
        initialPrice * 1.10,
        initialPrice * 0.85,
        initialPrice * 1.15,
        initialPrice * 1.00,
    ].reverse();
});

assetsToUpdate.forEach(id => {
    const initialPrice = store.getState().crypto.assets.find(asset => asset.id === id)?.price || 100;
    historicalData[id] = Array.from({ length: 7 }, (_, i) => {
        const priceChangeFactor = (Math.random() - 0.5) * 0.2; 
        return initialPrice * (1 + priceChangeFactor * (7 - i) / 6); 
    }).reverse();
});

const getRandomChange = (base) => {
  const factor = 0.01;
  return base + (Math.random() - 0.5) * factor * base;
};

const getRandomPercentageChange = () => {
  return (Math.random() - 0.5) * 2;
};

const getRandomVolumeChange = (base) => {
  const factor = 0.05;
  return base + (Math.random() - 0.5) * factor * base;
};

export const startMockWebSocket = () => {
  setInterval(() => {
    assetsToUpdate.forEach((id) => {
      const currentAsset = store.getState().crypto.assets.find((asset) => asset.id === id);
      if (currentAsset) {
        const newPrice = getRandomChange(currentAsset.price);
        historicalData[id].push(newPrice);
        historicalData[id].shift();

        const updatedFields = {
          price: newPrice,
          change1h: getRandomPercentageChange(),
          change24h: getRandomPercentageChange() * 2,
          change7d: getRandomPercentageChange() * 5,
          volume24h: getRandomVolumeChange(currentAsset.volume24h),
          sparkline7d: [...historicalData[id]],
        };
        store.dispatch(updateAsset({ id, updatedFields }));
      }
    });
  }, 1500);
};