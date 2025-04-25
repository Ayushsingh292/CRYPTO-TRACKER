import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assets: [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 33759.48,
      change1h: 0.43,
      change24h: 0.93,
      change7d: 11.11,
      marketCap: 1681618902186,
      volume24h: 43874350047,
      circulatingSupply: 19.65,
      maxSupply: 21,
      sparkline7d: [],
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 1802.46,
      change1h: 0.60,
      change24h: 3.21,
      change7d: 13.68,
      marketCap: 217581279327,
      volume24h: 23347469307,
      circulatingSupply: 120.71,
      maxSupply: null,
      sparkline7d: [],
    },
    {
      id: 'tether',
      name: 'Tether',
      symbol: 'USDT',
      price: 1.00,
      change1h: 0.00,
      change24h: 0.00,
      change7d: 0.04,
      marketCap: 145320022085,
      volume24h: 92288882007,
      circulatingSupply: 145.27,
      maxSupply: null,
      sparkline7d: [],
    },
    {
      id: 'xrp',
      name: 'XRP',
      symbol: 'XRP',
      price: 0.52,
      change1h: 0.46,
      change24h: 0.54,
      change7d: 6.18,
      marketCap: 28073014966,
      volume24h: 1731481431,
      circulatingSupply: 54.89,
      maxSupply: 100,
      sparkline7d: [],
    },
    {
      id: 'binancecoin',
      name: 'BNB',
      symbol: 'BNB',
      price: 306.65,
      change1h: 0.09,
      change24h: 1.20,
      change7d: 3.73,
      marketCap: 47356256847,
      volume24h: 1374281784,
      circulatingSupply: 154.03,
      maxSupply: null,
      sparkline7d: [],
    },
  ],
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateAsset: (state, action) => {
      const { id, updatedFields } = action.payload;
      const assetIndex = state.assets.findIndex((asset) => asset.id === id);
      if (assetIndex !== -1) {
        state.assets[assetIndex] = {
          ...state.assets[assetIndex],
          ...updatedFields,
        };
      }
    },
  },
});

export const { updateAsset } = cryptoSlice.actions;
export const selectAssets = (state) => state.crypto.assets;

export default cryptoSlice.reducer;