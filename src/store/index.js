import { configureStore } from '@reduxjs/toolkit';
import jobPositionsReducer from './slices/jobPositionsSlice';
import projectsReducer from './slices/projectsSlice';

export const store = configureStore({
  reducer: {
    jobPositions: jobPositionsReducer,
    projects: projectsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
