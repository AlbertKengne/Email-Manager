import { useState } from "react";
import { Upload, X, FileText, AlertCircle, Download } from "lucide-react";
import { type Recipient } from "../types";
import exampleCsv from '../assets/contacts.csv';

interface FileUploadProps {
  onFileUpload: (recipients: Recipient[]) => void;
}

// Ajouter validation et preview
const allowedTypes = ["text/csv", "application/vnd.ms-excel"];
const maxSize = 5 * 1024 * 1024; // 5MB

const validateFile = (file: File) => {
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Type de fichier non supporté");
  }
  if (file.size > maxSize) {
    throw new Error("Fichier trop volumineux");
  }
};

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      setError(null);
      validateFile(file);
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split("\n");
        const parsedRecipients = lines
          .filter((line) => line.trim())
          .map((line) => {
            const [name, email, country = ""] = line
              .split(",")
              .map((item) => item.trim());
            return { name, email, country };
          });
        onFileUpload(parsedRecipients);
      };
      reader.readAsText(file);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium text-gray-900">
          Import des destinataires
        </h2>
        <a
          href={exampleCsv}
          download="exemple_destinataires.csv"
          className="flex items-center gap-2 px-4 py-2 text-sm text-[#20AD96] hover:bg-[#20AD96]/10 rounded-lg transition-all duration-200"
        >
          <Download className="w-4 h-4" />
          Télécharger le fichier d'exemple
        </a>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-lg p-6
          ${isDragging ? "border-[#20AD96] bg-[#20AD96]/5" : "border-gray-300"}
          ${error ? "border-red-300 bg-red-50" : ""}
          transition-all duration-200`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) {
            const input = document.createElement("input");
            input.type = "file";
            input.files = e.dataTransfer.files;
            const event = new Event("change", { bubbles: true });
            Object.defineProperty(event, "target", { value: input });
            handleFileUpload(
              event as unknown as React.ChangeEvent<HTMLInputElement>
            );
          }
        }}
      >
        <label className="flex flex-col items-center justify-center gap-2 cursor-pointer">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isLoading}
          />
          <Upload
            className={`w-10 h-10 ${
              isLoading ? "text-gray-400" : "text-[#20AD96]"
            }`}
          />
          <div className="text-center">
            {isLoading ? (
              <p className="text-gray-500">Chargement en cours...</p>
            ) : (
              <>
                <p className="text-gray-700 font-medium">
                  Glissez-déposez votre fichier ici
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  ou cliquez pour sélectionner
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Format accepté: CSV (max 5MB)
                </p>
              </>
            )}
          </div>
        </label>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {fileName && !error && (
        <div className="flex items-center justify-between bg-[#20AD96]/10 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#20AD96]" />
            <span className="text-sm text-gray-600">{fileName}</span>
          </div>
          <button
            onClick={() => {
              setFileName(null);
              setError(null);
            }}
            className="p-1 hover:bg-[#20AD96]/20 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-[#20AD96]" />
          </button>
        </div>
      )}
    </div>
  );
}

