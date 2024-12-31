export interface Recipient {
  name: string;
  email: string;
  country: string;
}

export interface FilterOptions {
  selectedCountries: string[];
  limit: number;
}