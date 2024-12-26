import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { DocumentList } from '../components/documents/DocumentList';
import { PreviewModal } from '../components/previews/PreviewModal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDocumentPreview } from '../hooks/useDocumentPreview';
import { useDocumentDownload } from '../hooks/useDocumentDownload';
import { Button } from '../components/ui/Button';

export function Quotations() {
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

  const quotations = documents
    .filter(doc => doc.type === 'quotation')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const handleEdit = (id: string) => {
    navigate(`/quotations/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this quotation?')) {
      deleteDocument(id);
    }
  };

  const handleEmail = (id: string) => {
    const email = window.prompt('Enter recipient email address:');
    if (email) {
      alert(`Email sent to ${email}`);
    }
  };

  const handleGenerateInvoice = (id: string) => {
    navigate(`/invoices/new?quotationId=${id}`);
  };

  return (
    <div className="min-h-screen bg-[#2B372A] pb-20">
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Quotations</h1>
          <Button
            onClick={() => navigate('/quotations/new')}
            className="flex items-center gap-2"
          >
            <Plus size={20} />
            Create New Quotation
          </Button>
        </div>
        
        <DocumentList
          title="All Quotations"
          documents={quotations}
          emptyMessage="No quotations found"
          onEdit={handleEdit}
          onDelete={handleDelete}
          onEmail={handleEmail}
          onPreview={openPreview}
          onDownload={downloadDocument}
          onGenerateInvoice={handleGenerateInvoice}
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