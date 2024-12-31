import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EmailState {
  subject: string;
  content: string;
  attachments: File[];
  selectedCountries: string[];
}

const initialState: EmailState = {
  subject: '',
  content: '',
  attachments: [],
  selectedCountries: []
};

export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setSubject: (state, action: PayloadAction<string>) => {
      state.subject = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setAttachments: (state, action: PayloadAction<File[]>) => {
      state.attachments = action.payload;
    },
    setSelectedCountries: (state, action: PayloadAction<string[]>) => {
      state.selectedCountries = action.payload;
    }
  }
});

export const { setSubject, setContent, setAttachments, setSelectedCountries } = emailSlice.actions;
export const emailReducer = emailSlice.reducer;