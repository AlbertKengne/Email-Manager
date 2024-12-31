import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

export interface SenderProfile {
  id: string;
  name: string;
  email: string;
  defaultSubject: string;
  defaultMessage: string;
  signature: string;
  isDefault: boolean;
}

export interface SettingsState {
  profiles: SenderProfile[];
  currentProfileId: string | null;
  isSaving: boolean;
  error: string | null;
}

export const defaultProfile: SenderProfile = {
  id: nanoid(),
  name: "Parlons de business",
  email: "hello@parlonsdebusiness.com",
  defaultSubject: "Bonjour et Bienvenue sur Parlons de Business !",
  defaultMessage: `Alors, ici on parle de quoi🤔? 
On Parle de Business, On parle d'opportunités d'affairerrrrr,
On parle d'argent, ahannnn.
Et on parle de tout ce qui peut faire grossir ton compte bancaire, 
et meme de mindset.

si vous me découvrez maintenant, mon nom c'est Stéphanie Mbida, entrepreneur depuis l'age de 9 ans ! non c'est faux je le suis depuis l'age de 6 ans !
passionnée par le business et experte dans la multiplication de l'agent l'ahann.

Ensemble, nous allons explorer de nouvelles idées, partager des connaissances et collaborer pour atteindre nos objectifs communs.

N'hésitez pas à poser des questions, partager vos réflexions ou proposer des sujets de discussion. Votre contribution est précieuse, et j'ai hâte de voir ce que nous pouvons accomplir ensemble.

Merci et bienvenue à bord! https://parlonsdebusiness.com`,

  signature: "Stéphanie Mbida",
  isDefault: true
};

const initialState: SettingsState = {
  profiles: [defaultProfile],
  currentProfileId: defaultProfile.id,
  isSaving: false,
  error: null
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    addProfile: (state, action: PayloadAction<SenderProfile>) => {
      if (action.payload.isDefault) {
        state.profiles = state.profiles.map((p) => ({
          ...p,
          isDefault: false,
        }));
      }
      state.profiles.push(action.payload);
    },
    updateProfile: (state, action: PayloadAction<SenderProfile>) => {
      const index = state.profiles.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.profiles[index] = action.payload;
      }
    },
    deleteProfile: (state, action: PayloadAction<string>) => {
      state.profiles = state.profiles.filter((p) => p.id !== action.payload);
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
      state.profiles = state.profiles.map((profile) => ({
        ...profile,
        isDefault: profile.id === action.payload,
      }));
    },
  },
});

export const {
  addProfile,
  updateProfile,
  deleteProfile,
  setCurrentProfile,
  setIsSaving,
  setError,
  setDefaultProfile,
} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
