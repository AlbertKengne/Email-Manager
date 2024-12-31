export interface Recipient {
  name: string;
  email: string;
  country: string;
}

export interface FilterOptions {
  selectedCountries: string[];
  limit: number;
}

// Ajouter la nouvelle interface
export interface EmailFormData {
  subject: string;
  message: string;
  profileId: string | null;
  selectedCountries: string[];
}