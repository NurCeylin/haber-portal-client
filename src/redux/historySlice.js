import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: [],
  reducers: {
    addToHistory: (state, action) => {
      // Aynı haber zaten varsa sil
      const filtered = state.filter(item => item.slug !== action.payload.slug);
      // Yeni haberi en başa ekle
      filtered.unshift(action.payload);
      // Maksimum 10 haber sakla
      return filtered.slice(0, 10);
    },
  },
});

export const { addToHistory } = historySlice.actions;
export default historySlice.reducer;
