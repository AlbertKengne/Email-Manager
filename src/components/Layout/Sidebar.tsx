import { Mail, Users, Settings, BarChart, HelpCircle } from "lucide-react";
import logoImage from "../../assets/images/Palons_de_business_logo.png";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <div className="w-70 bg-white border-r h-screen fixed left-0 top-0 shadow-sm">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <img
            src={logoImage}
            alt="ParlonsDeBusiness Logo"
            className="w-12 h-12 rounded-lg object-contain"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              ParlonsDeBusiness
            </h1>
            <p className="text-sm text-[#20AD96]">Email Manager</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        <button
          onClick={() => onNavigate("dashboard")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
            ${
              currentPage === "dashboard"
                ? "bg-[#20AD96]/10 text-[#20AD96]"
                : "text-gray-600 hover:bg-gray-50 hover:text-[#20AD96]"
            }`}
        >
          <BarChart className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </button>

        <button
          onClick={() => onNavigate("recipients")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
            ${
              currentPage === "recipients"
                ? "bg-[#20AD96]/10 text-[#20AD96]"
                : "text-gray-600 hover:bg-gray-50 hover:text-[#20AD96]"
            }`}
        >
          <Users className="w-5 h-5" />
          <span className="font-medium">Destinataires</span>
        </button>

        <button
          onClick={() => onNavigate("settings")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
            ${
              currentPage === "settings"
                ? "bg-[#20AD96]/10 text-[#20AD96]"
                : "text-gray-600 hover:bg-gray-50 hover:text-[#20AD96]"
            }`}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Paramètres</span>
        </button>

        <button
          onClick={() => onNavigate("faq")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
            ${
              currentPage === "faq"
                ? "bg-[#20AD96]/10 text-[#20AD96]"
                : "text-gray-600 hover:bg-gray-50 hover:text-[#20AD96]"
            }`}
        >
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium">FAQ</span>
        </button>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#20AD96]/5">
          <div className="w-8 h-8 rounded-full bg-[#20AD96] flex items-center justify-center">
            <Mail className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Email Pro</p>
            <p className="text-xs text-gray-500">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
