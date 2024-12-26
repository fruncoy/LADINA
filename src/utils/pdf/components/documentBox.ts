import { jsPDF } from 'jspdf';
import { formatDate } from '../../date';
import type { Document } from '../../../types';

export function addDocumentBox(pdf: jsPDF, document: Document, yPos: number) {
  const pageWidth = pdf.internal.pageSize.width;

  // Box background
  pdf.setFillColor(255, 244, 238); // #FFF4EE
  pdf.setDrawColor(254, 223, 202); // #FEDFCA
  pdf.roundedRect(20, yPos, pageWidth - 40, 50, 3, 3, 'FD');

  // Title
  pdf.setTextColor(255, 119, 31); // #FF771F
  pdf.setFontSize(24);
  pdf.text('INVOICE', 30, yPos + 20);

  // Client details
  pdf.setTextColor(0);
  pdf.setFontSize(12);
  pdf.text('Bill To:', 30, yPos + 35);
  pdf.text(document.client_name, 30, yPos + 42);
  pdf.setFontSize(10);
  pdf.text(`Date: ${formatDate(document.created_at)}`, 30, yPos + 48);
  
  if (document.due_date) {
    pdf.text(`Due Date: ${formatDate(document.due_date)}`, pageWidth - 30, yPos + 48, { align: 'right' });
  }

  return yPos + 70; // Return next Y position
}