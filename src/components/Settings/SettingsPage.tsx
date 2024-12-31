import { Settings as SettingsIcon } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../Forms/Input';
import { TextArea } from '../Forms/TextArea';

// Update interfaces
interface SenderProfile {
  id: string;
  name: string;
  email: string;
  defaultSubject: string;
  defaultMessage: string;
  signature: string;
  isDefault: boolean;
}

interface SettingsPageProps {
  profiles: SenderProfile[];
  onSave: (profiles: SenderProfile[]) => void;
}

// Fix button and form submission
export function SettingsPage({ profiles: initialProfiles, onSave }: SettingsPageProps) {
  const [profiles, setProfiles] = useState<SenderProfile[]>(initialProfiles || []);
  const [selectedProfileId, setSelectedProfileId] = useState<string>(
    profiles.find(p => p.isDefault)?.id || profiles[0]?.id || ''
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleAddProfile = () => {
    const newProfile: SenderProfile = {
      id: Date.now().toString(),
      name: '',
      email: '',
      defaultSubject: '',
      defaultMessage: '',
      signature: '',
      isDefault: false
    };
    setProfiles([...profiles, newProfile]);
    setSelectedProfileId(newProfile.id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(profiles);
    } catch (error) {
      console.error('Failed to save profiles:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        Une erreur est survenue: {error.message}
      </div>
    );
  }

  try {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        <header className="flex items-center justify-between pb-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <SettingsIcon className="w-6 h-6 text-[#20AD96]" />
            Paramètres
          </h1>
        </header>

        {/* Profile Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Profils d'envoi</h2>
            <button
              onClick={handleAddProfile}
              className="px-4 py-2 text-sm bg-[#20AD96] text-white rounded-lg hover:bg-[#20AD96]/90 transition-colors duration-200"
            >
              Nouveau profil
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {profiles?.map(profile => (
              <button
                key={profile.id}
                onClick={() => setSelectedProfileId(profile.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                  ${selectedProfileId === profile.id 
                    ? 'bg-[#20AD96] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {profile.name || 'Nouveau profil'}
                {profile.isDefault && ' (Par défaut)'}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Form */}
        {selectedProfileId && (
          <form className="space-y-8" onSubmit={handleSubmit}>
            <section className="space-y-6 p-6 border border-gray-200 rounded-lg">
              <div className="grid gap-6 sm:grid-cols-2">
                <Input
                  label="Nom du profil"
                  value={profiles.find(p => p.id === selectedProfileId)?.name}
                  onChange={(e) => {
                    setProfiles(profiles.map(p => 
                      p.id === selectedProfileId 
                        ? { ...p, name: e.target.value }
                        : p
                    ));
                  }}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={profiles.find(p => p.id === selectedProfileId)?.email}
                  onChange={(e) => {
                    setProfiles(profiles.map(p => 
                      p.id === selectedProfileId 
                        ? { ...p, email: e.target.value }
                        : p
                    ));
                  }}
                  required
                />
              </div>

              <TextArea
                label="Sujet par défaut"
                value={profiles.find(p => p.id === selectedProfileId)?.defaultSubject}
                onChange={(e) => {
                  setProfiles(profiles.map(p => 
                    p.id === selectedProfileId 
                      ? { ...p, defaultSubject: e.target.value }
                      : p
                  ));
                }}
              />

              <TextArea
                label="Message par défaut"
                rows={4}
                value={profiles.find(p => p.id === selectedProfileId)?.defaultMessage}
                onChange={(e) => {
                  setProfiles(profiles.map(p => 
                    p.id === selectedProfileId 
                      ? { ...p, defaultMessage: e.target.value }
                      : p
                  ));
                }}
              />

              <TextArea
                label="Signature"
                rows={4}
                value={profiles.find(p => p.id === selectedProfileId)?.signature}
                onChange={(e) => {
                  setProfiles(profiles.map(p => 
                    p.id === selectedProfileId 
                      ? { ...p, signature: e.target.value }
                      : p
                  ));
                }}
              />

              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={profiles.find(p => p.id === selectedProfileId)?.isDefault}
                  onChange={(e) => {
                    setProfiles(profiles.map(p => ({
                      ...p,
                      isDefault: p.id === selectedProfileId ? e.target.checked : false
                    })));
                  }}
                />
                <label htmlFor="isDefault" className="text-sm text-gray-600">
                  Définir comme profil par défaut
                </label>
              </div>
            </section>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setProfiles(profiles.filter(p => p.id !== selectedProfileId));
                  setSelectedProfileId(profiles[0]?.id);
                }}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-700"
              >
                Supprimer le profil
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 text-sm bg-[#20AD96] text-white rounded-lg 
                  hover:bg-[#20AD96]/90 disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors duration-200"
              >
                {isSaving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        )}
      </div>
    );
  } catch (err) {
    console.error('Render error:', err);
    setError(err instanceof Error ? err : new Error('Une erreur inattendue est survenue'));
    return null;
  }
}