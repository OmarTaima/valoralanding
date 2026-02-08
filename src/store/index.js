import { configureStore } from '@reduxjs/toolkit';
import jobPositionsReducer from './slices/jobPositionsSlice';

export const store = configureStore({
  reducer: {
    jobPositions: jobPositionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
