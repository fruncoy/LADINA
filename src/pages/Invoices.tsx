import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { DocumentList } from '../components/documents/DocumentList';
import { PreviewModal } from '../components/previews/PreviewModal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDocumentPreview } from '../hooks/useDocumentPreview';
import { useDocumentDownload } from '../hooks/useDocumentDownload';
import { Button } from '../components/ui/Button';

export function Invoices() {
  const navigate = useNavigate();
  const { documents, deleteDocument } = useLocalStorage();
  const { downloadDocument } = useDocumentDownload();
  const { 
    isPreviewOpen, 
    currentDocument, 
    currentItems, 
    openPreview, 
    closePreview 
  } = useDocumentPreview();

  const invoices = documents
    .filter(doc => doc.type === 'invoice')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const handleEdit = (id: string) => {
    navigate(`/invoices/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      deleteDocument(id);
    }
  };

  const handleEmail = (id: string) => {
    const email = window.prompt('Enter recipient email address:');
    if (email) {
      alert(`Email sent to ${email}`);
    }
  };

  const handleGenerateReceipt = (id: string) => {
    navigate(`/receipts/new?invoiceId=${id}`);
  };

  return (
    <div className="min-h-screen bg-[#2B372A] pb-20">
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Invoices</h1>
          <Button
            onClick={() => navigate('/invoices/new')}
            className="flex items-center gap-2"
          >
            <Plus size={20} />
            Create New Invoice
          </Button>
        </div>
        
        <DocumentList
          title="All Invoices"
          documents={invoices}
          emptyMessage="No invoices found"
          onEdit={handleEdit}
          onDelete={handleDelete}
          onEmail={handleEmail}
          onPreview={openPreview}
          onDownload={downloadDocument}
          onGenerateReceipt={handleGenerateReceipt}
        />
      </div>

      {isPreviewOpen && currentDocument && (
        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={closePreview}
          document={currentDocument}
          items={currentItems}
        />
      )}
    </div>
  );
}