import { SenderProfile } from '../store/slices/settings/settingsSlice';

export interface EmailFormProps {
  subject: string;
  message: string;
  profiles: SenderProfile[];
  currentProfileId: string | null;
  onProfileChange: (profileId: string) => void;
  selectedCountries: string[];
  availableCountries: string[];
  disabled: boolean;
  onSubjectChange: (subject: string) => void;
  onMessageChange: (message: string) => void;
  onCountriesChange: (countries: string[]) => void;
  onSubmit: (formData: EmailFormData) => Promise<void>;
}

export interface EmailFormData {
  subject: string;
  message: string;
  profileId: string | null;
  selectedCountries: string[];
}