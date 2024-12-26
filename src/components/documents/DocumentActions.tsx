import { Mail, FileText, Receipt, Eye, Trash2, Download } from 'lucide-react';
import type { Document } from '../../types';

interface DocumentActionsProps {
  document: Document;
  onEdit: () => void;
  onDelete: () => void;
  onEmail: () => void;
  onPreview: (id: string) => void;
  onDownload: (id: string) => void;
  onGenerateReceipt?: () => void;
  onGenerateInvoice?: () => void;
}

export function DocumentActions({
  document,
  onEdit,
  onDelete,
  onEmail,
  onPreview,
  onDownload,
  onGenerateReceipt,
  onGenerateInvoice
}: DocumentActionsProps) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPreview(document.id);
        }}
        className="p-2 text-gray-600 hover:text-[#FF771F]"
        title="Preview"
      >
        <Eye size={18} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDownload(document.id);
        }}
        className="p-2 text-gray-600 hover:text-[#FF771F]"
        title="Download"
      >
        <Download size={18} />
      </button>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEmail();
        }}
        className="p-2 text-gray-600 hover:text-[#FF771F]"
        title="Send Email"
      >
        <Mail size={18} />
      </button>

      {document.type === 'invoice' && onGenerateReceipt && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onGenerateReceipt();
          }}
          className="p-2 text-gray-600 hover:text-[#FF771F]"
          title="Generate Receipt"
        >
          <Receipt size={18} />
        </button>
      )}

      {document.type === 'quotation' && onGenerateInvoice && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onGenerateInvoice();
          }}
          className="p-2 text-gray-600 hover:text-[#FF771F]"
          title="Generate Invoice"
        >
          <FileText size={18} />
        </button>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="p-2 text-gray-600 hover:text-red-500"
        title="Delete"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}