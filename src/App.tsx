import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './store/hooks'; 
import { RootState } from './store/store';
import { updateProfile } from './store/slices/settings/settingsSlice'; 
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { RecipientsPage } from './components/Recipients/RecipientsPage';
import { SettingsPage } from './components/Settings/SettingsPage';
import { type Recipient } from './types';
import { FAQ } from './components/FAQ/FAQ';

export function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const settings = useSelector((state: RootState) => state.settings.profiles);
  const dispatch = useAppDispatch();

  const handleMergeRecipients = (emails: string[]) => {
    // Keep only one recipient from the duplicates
    const uniqueRecipient = recipients.find(r => r.email === emails[0]);
    if (!uniqueRecipient) return;

    // Remove all duplicates
    setRecipients(prev => 
      prev.filter(r => !emails.includes(r.email) || r.email === emails[0])
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'recipients':
        return (
          <RecipientsPage
            recipients={recipients}
            onDeleteRecipient={(email) => {
              setRecipients(prev => prev.filter(r => r.email !== email));
            }}
            onMergeRecipients={handleMergeRecipients}
          />
        );
      case 'settings':
        return (
          <SettingsPage
            profiles={settings}
            onSave={(profiles) => {
              profiles.forEach(profile => dispatch(updateProfile(profile)));
            }}
          />
        );
      case 'faq':
        return <FAQ />;
      default:
        return (
          <Dashboard
            recipients={recipients}
            onImportRecipients={setRecipients}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="ml-64 p-8">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;