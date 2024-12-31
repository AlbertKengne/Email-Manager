import { configureStore } from '@reduxjs/toolkit';
import { emailReducer } from './slices/email/emailSlice';
import { recipientsReducer } from './slices/recipients/recipientsSlice';
import { settingsReducer } from './slices/settings/settingsSlice';

export const store = configureStore({
  reducer: {
    email: emailReducer,
    recipients: recipientsReducer,
    settings: settingsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;