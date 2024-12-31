import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipient } from '../../../types';

interface RecipientsState {
  recipients: Recipient[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipientsState = {
  recipients: [],
  loading: false,
  error: null
};

const recipientsSlice = createSlice({
  name: 'recipients',
  initialState,
  reducers: {
    setRecipients: (state, action: PayloadAction<Recipient[]>) => {
      state.recipients = action.payload;
    },
    addRecipient: (state, action: PayloadAction<Recipient>) => {
      state.recipients.push(action.payload);
    },
    removeRecipient: (state, action: PayloadAction<string>) => {
      state.recipients = state.recipients.filter(r => r.email !== action.payload);
    }
  }
});

export const recipientsReducer = recipientsSlice.reducer;