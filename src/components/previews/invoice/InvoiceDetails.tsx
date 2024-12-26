import { formatDate } from '../../../utils/date';
import type { Document } from '../../../types';

interface InvoiceDetailsProps {
  document: Document;
}

export function InvoiceDetails({ document }: InvoiceDetailsProps) {
  return (
    <div className="border border-[#FEDFCA] bg-[#FFF4EE] rounded-lg p-6 mb-8">
      <h2 className="text-[#FF6B00] text-2xl font-medium mb-4">INVOICE</h2>
      <p className="font-medium mb-1">{document.client_name}</p>
      <div className="text-sm text-gray-600">
        <p>Invoice Date: {formatDate(document.created_at)}</p>
        {document.due_date && <p>Due Date: {formatDate(document.due_date)}</p>}
      </div>
    </div>
  );
}