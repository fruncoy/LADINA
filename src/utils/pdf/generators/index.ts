import type { Document, VehicleItem } from '../../../types';
import { generateInvoicePDF } from './invoice';
import { generateQuotationPDF } from './quotation';
import { generateReceiptPDF } from './receipt';

export async function generatePDF({ document, items }: { 
  document: Document; 
  items: VehicleItem[]; 
}) {
  // Generate filename based on client name and document type
  const sanitizedClientName = document.client_name
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase();
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `${document.type}_${sanitizedClientName}_${timestamp}.pdf`;

  let pdf;
  switch (document.type) {
    case 'invoice':
      pdf = await generateInvoicePDF({ document, items });
      break;
    case 'quotation':
      pdf = await generateQuotationPDF({ document, items });
      break;
    case 'receipt':
      pdf = await generateReceiptPDF({ document, items });
      break;
    default:
      throw new Error(`Unsupported document type: ${document.type}`);
  }

  return {
    pdf,
    filename
  };
}

// Make sure to export the function
export type { PDFGeneratorOptions } from '../types';