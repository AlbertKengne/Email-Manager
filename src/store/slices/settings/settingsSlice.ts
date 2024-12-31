import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SenderProfile {
  id: string;
  name: string;
  email: string;
  defaultSubject: string;
  defaultMessage: string;
  signature: string;
  isDefault: boolean;
}

interface SettingsState {
  profiles: SenderProfile[];
  currentProfileId: string | null;
  isSaving: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  profiles: [],
  currentProfileId: null,
  isSaving: false,
  error: null
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    addProfile: (state, action: PayloadAction<SenderProfile>) => {
      state.profiles.push(action.payload);
    },
    updateProfile: (state, action: PayloadAction<SenderProfile>) => {
      const index = state.profiles.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.profiles[index] = action.payload;
      }
    },
    deleteProfile: (state, action: PayloadAction<string>) => {
      state.profiles = state.profiles.filter(p => p.id !== action.payload);
      if (state.currentProfileId === action.payload) {
        state.currentProfileId = state.profiles[0]?.id || null;
      }
    },
    setCurrentProfile: (state, action: PayloadAction<string>) => {
      state.currentProfileId = action.payload;
    },
    setIsSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setDefaultProfile: (state, action: PayloadAction<string>) => {
      state.profiles = state.profiles.map(profile => ({
        ...profile,
        isDefault: profile.id === action.payload
      }));
    }
  }
});

export const {
  addProfile,
  updateProfile,
  deleteProfile,
  setCurrentProfile,
  setIsSaving,
  setError,
  setDefaultProfile
} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;