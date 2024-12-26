import { jsPDF } from 'jspdf';
import type { Document } from '../../../types';

export function addDocumentFooter(pdf: jsPDF, document: Document, yPos: number) {
  pdf.setDrawColor(229, 231, 235); // gray-200
  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(20, yPos, pdf.internal.pageSize.width - 40, 40, 3, 3, 'FD');

  pdf.setTextColor(0);
  pdf.setFontSize(14);
  pdf.text(
    document.type === 'invoice' 
      ? 'Thank You for Your Business!'
      : 'Thank You for Considering Our Services!',
    pdf.internal.pageSize.width / 2,
    yPos + 15,
    { align: 'center' }
  );
  
  pdf.setTextColor(100);
  pdf.setFontSize(10);
  pdf.text(
    'If you have any questions, please contact us at info@ladinatravelsafaris.com',
    pdf.internal.pageSize.width / 2,
    yPos + 30,
    { align: 'center' }
  );
}