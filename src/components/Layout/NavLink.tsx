import { type ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
}

export function NavLink({ href, icon, label }: NavLinkProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
    >
      <span className="w-5 h-5">{icon}</span>
      <span>{label}</span>
    </a>
  );
}