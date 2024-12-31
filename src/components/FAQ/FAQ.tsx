import { Search, HelpCircle, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    question: "Comment importer des destinataires ?",
    answer: "Vous pouvez importer vos destinataires en utilisant un fichier CSV. Le fichier doit contenir les colonnes suivantes : nom, email, pays. Cliquez sur le bouton 'Importer CSV' dans le dashboard pour commencer.",
    category: "Import"
  },
  {
    question: "Comment gérer les doublons ?",
    answer: "L'application détecte automatiquement les doublons basés sur l'adresse email. Vous pouvez les visualiser dans la section 'Destinataires' et choisir de les fusionner ou de les supprimer.",
    category: "Destinataires"
  },
  {
    question: "Comment créer un profil d'envoi ?",
    answer: "Accédez à la section 'Paramètres', cliquez sur 'Nouveau profil' et remplissez les informations requises (nom, email, signature). Vous pouvez définir un profil par défaut qui sera utilisé automatiquement.",
    category: "Profils"
  },
  {
    question: "Comment envoyer un email à des pays spécifiques ?",
    answer: "Lors de la composition d'un email, utilisez le sélecteur de pays pour choisir les destinataires par pays. Si aucun pays n'est sélectionné, l'email sera envoyé à tous les destinataires.",
    category: "Envoi"
  },
  {
    question: "Comment personnaliser la signature ?",
    answer: "Dans les paramètres, sélectionnez un profil et modifiez la section 'Signature'. Vous pouvez inclure du texte formaté et des liens vers vos réseaux sociaux.",
    category: "Profils"
  }
];

export function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(faqData.map(item => item.category)));

  const filteredFAQ = faqData.filter(item => 
    (selectedCategory ? item.category === selectedCategory : true) &&
    (searchTerm ? 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    )
  );

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <header className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-[#20AD96]" />
          Foire Aux Questions
        </h1>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher une question..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
              focus:border-[#20AD96] focus:ring-2 focus:ring-[#20AD96]/20 
              hover:border-[#20AD96]/50
              outline-none transition-all duration-200"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
              ${!selectedCategory 
                ? 'bg-[#20AD96] text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Tout
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                ${selectedCategory === category 
                  ? 'bg-[#20AD96] text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      <div className="space-y-4">
        {filteredFAQ.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              {openItems.includes(index) ? (
                <Minus className="w-5 h-5 text-[#20AD96]" />
              ) : (
                <Plus className="w-5 h-5 text-[#20AD96]" />
              )}
            </button>
            
            {openItems.includes(index) && (
              <div className="px-4 pb-4 text-gray-600">
                <div className="pt-2 border-t">
                  {item.answer}
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredFAQ.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucune question trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
}