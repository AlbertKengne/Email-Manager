import { configureStore } from '@reduxjs/toolkit';
import { settingsReducer } from './slices/settings/settingsSlice';
import { recipientsReducer } from './slices/recipients/recipientsSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    recipients: recipientsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;