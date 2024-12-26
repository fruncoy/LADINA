import { useNavigate } from 'react-router-dom';
import { FileText, FileSpreadsheet, Receipt, Plus } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  const quickLinks = [
    {
      title: 'Invoices',
      icon: FileText,
      description: 'Create and manage invoices for your services',
      path: '/invoices',
      createPath: '/invoices/new',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Quotations',
      icon: FileSpreadsheet,
      description: 'Generate price quotes for potential clients',
      path: '/quotations',
      createPath: '/quotations/new',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Receipts',
      icon: Receipt,
      description: 'Issue receipts for payments received',
      path: '/receipts',
      createPath: '/receipts/new',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-[#2B372A] pb-20">
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-white mb-8">Quick Links</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <div
                key={link.title}
                className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer"
                onClick={() => navigate(link.path)}
              >
                <div className="p-6">
                  <div className={`inline-flex p-3 rounded-lg ${link.color} mb-4`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{link.title}</h3>
                  <p className="text-gray-600 mb-4">{link.description}</p>
                  <button 
                    className="flex items-center text-[#FF771F] hover:text-[#FF6B00] transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(link.createPath);
                    }}
                  >
                    <Plus size={20} className="mr-1" />
                    Create New
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}