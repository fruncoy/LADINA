import { Dialog } from '@headlessui/react';
import { X, Edit, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { Button } from '../ui/Button';
import { InvoicePreview } from './invoice/InvoicePreview';
import { QuotationPreview } from './quotation/QuotationPreview';
import { ReceiptPreview } from './receipt/ReceiptPreview';
import { exportPreviewToPDF } from '../../utils/pdf/exportPreview';
import type { Document, VehicleItem } from '../../types';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: Document;
  items: VehicleItem[];
  allowEdit?: boolean;
}

export function PreviewModal({ 
  isOpen, 
  onClose, 
  document, 
  items,
  allowEdit = true
}: PreviewModalProps) {
  const navigate = useNavigate();
  const previewRef = useRef<HTMLDivElement>(null);

  const handleEdit = () => {
    navigate(`/${document.type}s/${document.id}`);
    onClose();
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;

    try {
      const { pdf, filename } = await exportPreviewToPDF(previewRef.current, document);
      pdf.save(filename);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    }
  };

  const PreviewComponent = {
    invoice: InvoicePreview,
    quotation: QuotationPreview,
    receipt: ReceiptPreview
  }[document.type];

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center p-4 border-b">
            <Dialog.Title className="text-lg font-semibold capitalize">
              {document.type} Preview
            </Dialog.Title>
            <div className="flex items-center gap-4">
              <Button 
                onClick={handleDownload}
                className="flex items-center gap-2"
              >
                <Download size={18} />
                Download
              </Button>
              {allowEdit && (
                <Button 
                  onClick={handleEdit}
                  className="flex items-center gap-2"
                >
                  <Edit size={18} />
                  Edit
                </Button>
              )}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="max-h-[80vh] overflow-y-auto">
            <div ref={previewRef}>
              <PreviewComponent document={document} items={items} />
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}