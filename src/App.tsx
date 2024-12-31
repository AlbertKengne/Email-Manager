import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { RecipientsPage } from './components/Recipients/RecipientsPage';
import { SettingsPage } from './components/Settings/SettingsPage';
import { type Recipient } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [settings, setSettings] = useState({
    senderName: '',
    senderEmail: '',
    defaultSubject: '',
    defaultMessage: '',
    signature: '',
  });

  const renderPage = () => {
    switch (currentPage) {
      case 'recipients':
        return (
          <RecipientsPage
            recipients={recipients}
            onDeleteRecipient={(email) => {
              setRecipients(prev => prev.filter(r => r.email !== email));
            }}
            onImportRecipients={setRecipients}
          />
        );
      case 'settings':
        return (
          <SettingsPage
            settings={settings}
            onSave={setSettings}
          />
        );
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