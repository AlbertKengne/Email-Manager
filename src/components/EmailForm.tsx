import { Send, MessageSquare, Tag, Globe } from "lucide-react";
import { z } from "zod";
import { useState, useMemo } from "react";
import Select from "react-select";

export const emailFormSchema = z.object({
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export interface EmailFormProps {
  subject: string;
  message: string;
  disabled: boolean;
  selectedCountries: string[];
  availableCountries: string[];
  onSubjectChange: (subject: string) => void;
  onMessageChange: (message: string) => void;
  onCountriesChange: (countries: string[]) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export interface EmailFormState {
  isSubmitting: boolean;
  error: string | null;
}

export function useEmailForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Form submission logic here
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, error, handleSubmit };
}

export function EmailForm({
  subject,
  message,
  disabled,
  selectedCountries,
  availableCountries,
  onSubjectChange,
  onMessageChange,
  onCountriesChange,
  onSubmit,
}: EmailFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-8 max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg border border-[#20AD96]/10"
    >
      <div className="space-y-2">
        <label
          htmlFor="subject"
          className="flex items-center gap-2.5 text-sm font-medium text-gray-700 group cursor-pointer"
        >
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
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="flex items-center gap-2.5 text-sm font-medium text-gray-700 group cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 text-[#20AD96] group-hover:text-[#f4b18e] transition-colors duration-200" />
          <span className="transition-colors duration-200 group-hover:text-[#20AD96]">
            Message
          </span>
        </label>
        <div className="space-y-2">
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
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-2.5 text-sm font-medium text-gray-700 group cursor-pointer">
          <Globe className="w-4 h-4 text-[#20AD96] group-hover:text-[#f4b18e] transition-colors duration-200" />
          <span className="transition-colors duration-200 group-hover:text-[#20AD96]">
            Pays destinataires
          </span>
        </label>
        <Select
          isMulti
          options={availableCountries.map((country) => ({
            value: country,
            label: country,
          }))}
          value={selectedCountries.map((country) => ({
            value: country,
            label: country,
          }))}
          onChange={(selected) => {
            onCountriesChange(selected.map((option) => option.value));
          }}
          placeholder="Sélectionnez les pays (tous si vide)"
          className="react-select-container"
          classNamePrefix="react-select"
          styles={{
            control: (base) => ({
              ...base,
              borderColor: "#e5e7eb",
              "&:hover": {
                borderColor: "#20AD96",
              },
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected
                ? "#20AD96"
                : state.isFocused
                ? "#20AD96/10"
                : "transparent",
              color: state.isSelected ? "white" : "#374151",
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: "#20AD96/10",
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: "#20AD96",
            }),
          }}
        />
      </div>
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

interface Recipient {
  country: string;
}

export function EmailContainer() {
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [recipients] = useState<Recipient[]>([]);
  const availableCountries = useMemo(() => 
    [...new Set(recipients.map(r => r.country))].filter(Boolean),
    [recipients]
  );

  return (
    <EmailForm
      subject={subject}
      message={message}
      disabled={recipients.length === 0}
      selectedCountries={selectedCountries}
      availableCountries={availableCountries}
      onSubjectChange={setSubject}
      onMessageChange={setMessage}
      onCountriesChange={setSelectedCountries}
      onSubmit={async (e) => {
        e.preventDefault();
        // Remove unused variable and comment since it's not being used
      }}
    />
  );
}
