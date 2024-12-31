import { Eye, Globe, Mail } from 'lucide-react';
import { convertLinksToAnchors } from '../utils/linkUtils';



// Import custom social media icons as React components
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TiktokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

export interface Sender {
  facebook?: string;
  youtube?: string;
  tiktok?: string;
}

export interface Recipient {
  name: string;
  email: string;
  country?: string;
}

// Add default sender object
export const defaultSender: Sender = {
  facebook: "https://www.facebook.com/parlonsdebusiness",
  youtube: "https://www.youtube.com/@ParlonsDeBusiness",
  tiktok: "https://www.tiktok.com/@parlons_debusiness"
};

interface EmailPreviewProps {
  subject: string;
  message: string;
  recipient: Recipient;
  sender?: typeof defaultSender;
  signature?: string; // Add signature
}

export function EmailPreview({ subject, message, recipient, sender, signature }: EmailPreviewProps) {
  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-all duration-200">
      <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
        <Eye className="w-5 h-5 text-blue-600" />
        Aperçu du mail
      </h2>
      
      <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
        <div className="space-y-3">
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            À: {recipient.name} &lt;{recipient.email}&gt;
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Pays: {recipient.country || 'Non spécifié'}
          </p>
          <h3 className="text-lg font-medium">
            {subject || '(Aucun sujet)'}
          </h3>
        </div>

        {/* Sender Social Media Section */}
        {sender && (
          <div className="mt-6 pt-4 border-t border-[#20AD96]/20">
            <p className="text-sm font-medium text-[#20AD96] mb-3">Suivez-nous sur :</p>
            <div className="flex gap-6">
              {sender.facebook && (
                <a
                  href={sender.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-[#20AD96] transition-all duration-300 group"
                >
                  <FacebookIcon />
                  <span className="text-sm font-medium">Facebook</span>
                </a>
              )}
              
              {sender.youtube && (
                <a
                  href={sender.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-[#20AD96] transition-all duration-300 group"
                >
                  <YoutubeIcon />
                  <span className="text-sm font-medium">YouTube</span>
                </a>
              )}
              
              {sender.tiktok && (
                <a
                  href={sender.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-[#20AD96] transition-all duration-300 group"
                >
                  <TiktokIcon />
                  <span className="text-sm font-medium">TikTok</span>
                </a>
              )}
            </div>
            
            <div className="mt-4 py-2 px-4 bg-[#f4b18e]/10 rounded-lg">
              <p className="text-xs text-[#20AD96] font-medium">
                Restez connecté avec nous sur les réseaux sociaux !
              </p>
            </div>
          </div>
        )}
        
        <div className="prose prose-sm max-w-none">
        {message ? (
          <div className="whitespace-pre-wrap">
            {convertLinksToAnchors(message)}
            
            {/* Add signature section */}
            {signature && (
              <div className="mt-8 pt-4 border-t border-gray-200">
                <div className="whitespace-pre-wrap text-gray-600">
                  {convertLinksToAnchors(signature)}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-400 italic">(Aucun contenu)</p>
        )}
      </div>

        {/* Email Footer */}
        <footer className="mt-8 pt-6 border-t border-[#20AD96]/20">
          <div className="text-center">
            <h3 className="text-[#20AD96] font-medium text-xl mb-4">
              Parlons De Business
            </h3>
            
            <div className="flex justify-center items-center gap-6">
              <a
                href={sender?.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#1877F2] transition-all duration-300 group"
              >
                <FacebookIcon />
              </a>
              
              <a
                href={sender?.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#FF0000] transition-all duration-300 group"
              >
                <YoutubeIcon />
              </a>
              
              <a
                href={sender?.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#000000] transition-all duration-300 group"
              >
                <TiktokIcon />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}