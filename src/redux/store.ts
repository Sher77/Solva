// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';
import cardReducer from './slices/CardSlice';

export const store = configureStore({
  reducer: { user: userReducer, card: cardReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
