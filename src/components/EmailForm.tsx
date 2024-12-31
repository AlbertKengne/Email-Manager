import { Send, MessageSquare, Tag, Globe, User } from "lucide-react";
import Select from "react-select";
import { EmailFormProps } from "../types/emailForm";

export function EmailForm({ 
  subject,
  message,
  profiles,
  currentProfileId,
  selectedCountries,
  availableCountries,
  disabled,
  onProfileChange,
  onSubjectChange,
  onMessageChange,
  onCountriesChange,
  onSubmit
}: EmailFormProps) {
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      subject,
      message,
      profileId: currentProfileId,
      selectedCountries
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg border border-[#20AD96]/10">
      {/* Subject Input */}
      <div className="space-y-2">
        <label htmlFor="subject" className="flex items-center gap-2.5 text-sm font-medium text-gray-700 group cursor-pointer">
          <Tag className="w-4 h-4 text-[#20AD96] group-hover:text-[#f4b18e] transition-colors duration-200" />
          <span className="transition-colors duration-200 group-hover:text-[#20AD96]">
            Sujet
          </span>
        </label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          disabled={disabled}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 
            focus:border-[#20AD96] focus:ring-2 focus:ring-[#20AD96]/20 
            hover:border-[#20AD96]/50
            outline-none transition-all duration-200 
            disabled:bg-gray-50 disabled:cursor-not-allowed
            placeholder:text-gray-400"
          placeholder="Entrez le sujet de votre message..."
        />
      </div>

      {/* Message Textarea */}
      <div className="space-y-2">
        <label htmlFor="message" className="flex items-center gap-2.5 text-sm font-medium text-gray-700 group cursor-pointer">
          <MessageSquare className="w-4 h-4 text-[#20AD96] group-hover:text-[#f4b18e] transition-colors duration-200" />
          <span className="transition-colors duration-200 group-hover:text-[#20AD96]">
            Message
          </span>
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          disabled={disabled}
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 
            focus:border-[#20AD96] focus:ring-2 focus:ring-[#20AD96]/20
            hover:border-[#20AD96]/50
            outline-none transition-all duration-200 
            resize-y disabled:bg-gray-50 disabled:cursor-not-allowed
            placeholder:text-gray-400"
          placeholder="Rédigez votre message..."
        />
      </div>

      {/* Profile Selection */}
      <div className="space-y-2">
        <label className="flex items-center gap-2.5 text-sm font-medium text-gray-700 group cursor-pointer">
          <User className="w-4 h-4 text-[#20AD96] group-hover:text-[#f4b18e] transition-colors duration-200" />
          <span className="transition-colors duration-200 group-hover:text-[#20AD96]">
            Profil d'envoi
          </span>
        </label>
        <Select
          value={profiles
            .filter(p => p.id === currentProfileId)
            .map(p => ({ value: p.id, label: `${p.name} ${p.isDefault ? '(Par défaut)' : ''}` }))[0]}
          onChange={(selected) => selected && onProfileChange(selected.value)}
          options={profiles.map(p => ({
            value: p.id,
            label: `${p.name} ${p.isDefault ? '(Par défaut)' : ''}`
          }))}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      {/* Country Selection */}
      <div className="space-y-2">
        <label className="flex items-center gap-2.5 text-sm font-medium text-gray-700 group cursor-pointer">
          <Globe className="w-4 h-4 text-[#20AD96] group-hover:text-[#f4b18e] transition-colors duration-200" />
          <span className="transition-colors duration-200 group-hover:text-[#20AD96]">
            Pays destinataires
          </span>
        </label>
        <Select
          isMulti
          value={selectedCountries.map(country => ({
            value: country,
            label: country
          }))}
          onChange={(selected) => {
            onCountriesChange(selected.map(option => option.value));
          }}
          options={availableCountries.map(country => ({
            value: country,
            label: country
          }))}
          placeholder="Sélectionnez les pays (tous si vide)"
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={disabled}
        className="w-full flex items-center justify-center gap-2 
          px-6 py-3 bg-[#20AD96] text-white font-medium rounded-lg 
          transition-all duration-200 
          hover:bg-[#20AD96]/90 hover:shadow-lg
          focus:ring-4 focus:ring-[#20AD96]/20 focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#20AD96]
          disabled:hover:shadow-none
          active:scale-[0.99]"
      >
        <Send className="w-4 h-4" />
        <span>Envoyer</span>
      </button>
    </form>
  );
}
