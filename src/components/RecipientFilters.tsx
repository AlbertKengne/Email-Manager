import { type FilterOptions } from '../types';

interface RecipientFiltersProps {
  countries: string[];
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export function RecipientFilters({ countries, filters, onFiltersChange }: RecipientFiltersProps) {
  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filtrer par pays
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {countries.map(country => (
            <label key={country} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.selectedCountries.includes(country)}
                onChange={(e) => {
                  const newCountries = e.target.checked
                    ? [...filters.selectedCountries, country]
                    : filters.selectedCountries.filter(c => c !== country);
                  onFiltersChange({ ...filters, selectedCountries: newCountries });
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{country || 'Non spécifié'}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Limite de destinataires
        </label>
        <input
          type="number"
          min="1"
          value={filters.limit}
          onChange={(e) => onFiltersChange({ ...filters, limit: parseInt(e.target.value) || 0 })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}