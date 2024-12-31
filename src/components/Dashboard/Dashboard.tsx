import React from "react";
import { FileUpload } from "../FileUpload";
import { EmailForm } from "../EmailForm";
import { EmailPreview } from "../EmailPreview";
import { type Recipient } from "../../types";
import { Users, Mail, Clock, ChevronUp, Globe } from "lucide-react";

interface DashboardProps {
  recipients: Recipient[];
  onImportRecipients: (recipients: Recipient[]) => void;
}

export function Dashboard({ recipients, onImportRecipients }: DashboardProps) {
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [selectedCountries, setSelectedCountries] = React.useState<string[]>(
    []
  );
  

  // Extract unique countries and count recipients per country
  const countryStats = React.useMemo(() => {
    const stats = new Map<string, number>();

    recipients.forEach((recipient) => {
      const country = recipient.country || "Non défini";
      stats.set(country, (stats.get(country) || 0) + 1);
    });

    return Array.from(stats.entries())
      .sort((a, b) => b[1] - a[1]) // Sort by count descending
      .map(([country, count]) => ({
        country,
        count,
        percentage: Math.round((count / recipients.length) * 100) || 0,
      }));
  }, [recipients]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetRecipients =
      selectedCountries.length > 0
        ? recipients.filter((r) => selectedCountries.includes(r.country || ""))
        : recipients;
    console.log("Envoi des emails...", { targetRecipients });
  };

  // Sample data - replace with real data
  const stats = {
    totalRecipients: 1234,
    emailsSent: 456,
    activeProfiles: 3,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Destinataires</p>
              <h3 className="text-2xl font-semibold mt-1">
                {stats.totalRecipients}
              </h3>
            </div>
            <div className="p-3 bg-[#20AD96]/10 rounded-lg">
              <Users className="w-6 h-6 text-[#20AD96]" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm text-[#20AD96]">
            <ChevronUp className="w-4 h-4" />
            <span>+12% ce mois</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Emails Envoyés</p>
              <h3 className="text-2xl font-semibold mt-1">
                {stats.emailsSent}
              </h3>
            </div>
            <div className="p-3 bg-[#f4b18e]/10 rounded-lg">
              <Mail className="w-6 h-6 text-[#f4b18e]" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm text-[#f4b18e]">
            <ChevronUp className="w-4 h-4" />
            <span>+8% cette semaine</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Profils Actifs</p>
              <h3 className="text-2xl font-semibold mt-1">
                {stats.activeProfiles}
              </h3>
            </div>
            <div className="p-3 bg-[#20AD96]/10 rounded-lg">
              <Clock className="w-6 h-6 text-[#20AD96]" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <FileUpload onFileUpload={onImportRecipients} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Country Distribution */}
            {countryStats.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#20AD96]" />
                  Distribution par pays
                </h3>
                <div className="space-y-3">
                  {countryStats.map(({ country, count, percentage }) => (
                    <div key={country} className="flex items-center gap-4">
                      <div className="w-32 font-medium text-gray-700">
                        {country}
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#20AD96] rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-20 text-sm text-gray-500">
                        {count} ({percentage}%)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Total Contacts Card */}
            {recipients.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Contacts</p>
                    <h3 className="text-2xl font-semibold mt-1">
                      {recipients.length}
                    </h3>
                  </div>
                  <div className="p-3 bg-[#20AD96]/10 rounded-lg">
                    <Users className="w-6 h-6 text-[#20AD96]" />
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-4 text-sm text-[#20AD96]">
                  <span>{countryStats.length} pays différents</span>
                </div>
              </div>
            )}
          </div>

          <EmailForm
            subject={subject}
            message={message}
            selectedCountries={selectedCountries}
            availableCountries={countryStats.map((s) => s.country)}
            disabled={recipients.length === 0}
            onSubjectChange={setSubject}
            onMessageChange={setMessage}
            onCountriesChange={setSelectedCountries}
            onSubmit={handleSubmit}
          />
        </div>

        <div>
          <EmailPreview
            subject={subject}
            message={message}
            recipient={
              recipients[0] || {
                name: "Example",
                email: "example@email.com",
                country: "France",
              }
            }
          />
        </div>
      </div>
    </div>
  );
}
