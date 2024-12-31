import { Users, Search } from 'lucide-react';
import { type Recipient } from '../types';
import { useState, useMemo } from 'react';

interface RecipientsListProps {
  recipients: Recipient[];
}

export function RecipientsList({ recipients }: RecipientsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredRecipients = useMemo(() => {
    return recipients.filter(recipient => 
      recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipient.country?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [recipients, searchTerm]);

  return (
    <div className="space-y-4">
      {/* Header and Search */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-[#20AD96]" />
          Destinataires ({filteredRecipients.length})
        </h2>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 
              focus:border-[#20AD96] focus:ring-2 focus:ring-[#20AD96]/20 
              hover:border-[#20AD96]/50
              outline-none transition-all duration-200"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="max-h-[400px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pays
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecipients.length > 0 ? (
                filteredRecipients.map((recipient, index) => (
                  <tr 
                    key={index}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {recipient.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {recipient.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {recipient.country || '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    Aucun destinataire trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}