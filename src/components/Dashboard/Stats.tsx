import { Users, Mail, Globe } from 'lucide-react';
import { type Recipient } from '../../types';

interface StatsProps {
  recipients: Recipient[];
}

export function Stats({ recipients }: StatsProps) {
  const uniqueCountries = new Set(recipients.map(r => r.country)).size;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        icon={<Users className="w-8 h-8 text-blue-600" />}
        label="Total Destinataires"
        value={recipients.length}
      />
      <StatCard
        icon={<Globe className="w-8 h-8 text-green-600" />}
        label="Pays"
        value={uniqueCountries}
      />
      <StatCard
        icon={<Mail className="w-8 h-8 text-purple-600" />}
        label="Emails Envoyés"
        value={0}
      />
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}