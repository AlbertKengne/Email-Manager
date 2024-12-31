import { useState, useMemo } from "react";
import { Trash2, Search, Users, AlertCircle, Copy, Globe } from "lucide-react";
import { type Recipient } from "../../types";

// Add this type for duplicate groups
interface DuplicateGroup {
  email: string;
  recipients: Recipient[];
}

interface RecipientsPageProps {
  recipients: Recipient[];
  onDeleteRecipient: (email: string) => void;
  onMergeRecipients?: (emails: string[]) => void;
}

export function RecipientsPage({
  recipients,
  onDeleteRecipient,
  onMergeRecipients,
}: RecipientsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [mergeConfirm, setMergeConfirm] = useState<DuplicateGroup | null>(null);
  const [showDuplicates, setShowDuplicates] = useState(false);

  // Find duplicates based on email or name
  const duplicates = useMemo(() => {
    const groups = recipients.reduce((acc, recipient) => {
      const key = recipient.email.toLowerCase();
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(recipient);
      return acc;
    }, {} as Record<string, Recipient[]>);

    return Object.values(groups).filter((group) => group.length > 1);
  }, [recipients]);

  const duplicateGroups = useMemo(() => {
    const groups = recipients.reduce((acc, recipient) => {
      const key = recipient.email.toLowerCase();
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(recipient);
      return acc;
    }, {} as Record<string, Recipient[]>);

    return (
      Object.entries(groups)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, group]) => group.length > 1)
        .map(([email, recipients]) => ({ email, recipients }))
    );
  }, [recipients]);

  const countryStats = useMemo(() => {
    const countries = new Set(recipients.map((r) => r.country).filter(Boolean));
    return countries.size;
  }, [recipients]);

  const filteredRecipients = useMemo(() => {
    let filtered = recipients;

    if (showDuplicates) {
      const duplicateEmails = new Set(
        duplicates.flatMap((group) => group.map((r) => r.email))
      );
      filtered = recipients.filter((r) => duplicateEmails.has(r.email));
    }

    return filtered.filter(
      (recipient) =>
        recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipient.country?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [recipients, searchTerm, showDuplicates, duplicates]);

  return (
    <div className="space-y-6 p-6">
      {/* Header with Search and Duplicates Toggle */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#20AD96]" />
            Destinataires ({filteredRecipients.length})
          </h1>

          {duplicates.length > 0 && (
            <button
              onClick={() => setShowDuplicates(!showDuplicates)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200
                ${
                  showDuplicates
                    ? "bg-[#20AD96]/10 text-[#20AD96]"
                    : "bg-[#f4b18e]/10 text-[#f4b18e]"
                }`}
            >
              <Copy className="w-4 h-4" />
              {duplicates.length} doublons trouvés
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-[#20AD96]/10 text-[#20AD96]">
          <Globe className="w-4 h-4" />
          {countryStats} pays
        </div>

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

      {/* Duplicates Warning */}
      {showDuplicates && duplicates.length > 0 && (
        <div className="bg-[#f4b18e]/10 border border-[#f4b18e]/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#f4b18e] mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Doublons détectés
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Certains destinataires apparaissent plusieurs fois dans la
                liste. Vous pouvez les fusionner ou les supprimer.
              </p>
              {onMergeRecipients && (
                <button
                  onClick={() =>
                    onMergeRecipients(
                      duplicates.flatMap((group) => group.map((r) => r.email))
                    )
                  }
                  className="mt-3 px-4 py-2 text-sm font-medium text-white bg-[#20AD96] hover:bg-[#20AD96]/90 rounded-lg transition-colors duration-200"
                >
                  Fusionner les doublons
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showDuplicates && duplicateGroups.length > 0 && (
        <div className="space-y-4">
          {duplicateGroups.map((group, index) => (
            <div
              key={group.email}
              className="bg-white rounded-lg border border-[#20AD96]/20 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="bg-[#20AD96]/5 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Copy className="w-5 h-5 text-[#20AD96]" />
                  <h3 className="font-medium text-gray-900">
                    Groupe de doublons #{index + 1}
                  </h3>
                  <span className="text-sm text-[#20AD96]">
                    {group.recipients.length} occurrences
                  </span>
                </div>
                <button
                  onClick={() => setMergeConfirm(group)}
                  className="px-4 py-1.5 text-sm font-medium text-[#20AD96] hover:text-white bg-[#20AD96]/10 hover:bg-[#20AD96] rounded-full transition-all duration-200"
                >
                  Fusionner
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {group.recipients.map((recipient, idx) => (
                  <div
                    key={idx}
                    className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">
                        {recipient.name}
                      </p>
                      <p className="text-sm text-gray-500">{recipient.email}</p>
                      {recipient.country && (
                        <p className="text-sm text-gray-500">
                          {recipient.country}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-[#20AD96]/10">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#20AD96] uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#20AD96] uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#20AD96] uppercase tracking-wider">
                  Pays
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#20AD96] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecipients.map((recipient) => (
                <tr
                  key={recipient.email}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {recipient.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {recipient.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {recipient.country || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button
                      onClick={() => setDeleteConfirm(recipient.email)}
                      className="text-[#f4b18e] hover:text-[#20AD96] transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirmer la suppression
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Êtes-vous sûr de vouloir supprimer ce destinataire ? Cette action
              est irréversible.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  onDeleteRecipient(deleteConfirm);
                  setDeleteConfirm(null);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-[#20AD96] hover:bg-[#20AD96]/90 rounded-lg transition-colors duration-200"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Merge Confirmation Modal */}
      {mergeConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Confirmer la fusion
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Voulez-vous fusionner ces {mergeConfirm.recipients.length}{" "}
              destinataires ? Cette action est irréversible.
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-6">
              <ul className="space-y-2">
                {mergeConfirm.recipients.map((r, idx) => (
                  <li key={idx} className="text-sm text-gray-600">
                    {r.name} ({r.email})
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMergeConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  onMergeRecipients?.(
                    mergeConfirm.recipients.map((r) => r.email)
                  );
                  setMergeConfirm(null);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-[#20AD96] hover:bg-[#20AD96]/90 rounded-lg transition-colors duration-200"
              >
                Confirmer la fusion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
