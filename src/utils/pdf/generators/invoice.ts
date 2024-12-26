import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { formatCurrency } from '../../currency';
import { formatDate } from '../../date';
import type { Document, VehicleItem } from '../../../types';

export async function generateInvoicePDF(document: Document, items: VehicleItem[]) {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  let yPos = 20;

  // Company Header
  pdf.setFontSize(10);
  pdf.setTextColor(100);
  pdf.text('Kefan Building, Woodavenue Road', 20, yPos);
  pdf.text('(254) 728 309 380', 20, yPos + 6);
  pdf.text('info@ladinatravelsafaris.com', pageWidth - 20, yPos, { align: 'right' });
  pdf.text('ladinatravelsafaris.com', pageWidth - 20, yPos + 6, { align: 'right' });

  // Add Logo
  try {
    const logoSize = 24;
    const logoX = (pageWidth - logoSize) / 2;
    pdf.addImage('/Logo.png', 'PNG', logoX, yPos - 10, logoSize, logoSize);
  } catch (error) {
    console.error('Failed to load logo:', error);
  }

  yPos += 40;

  // Document Box
  pdf.setFillColor(255, 244, 238); // #FFF4EE
  pdf.setDrawColor(254, 223, 202); // #FEDFCA
  pdf.roundedRect(20, yPos, pageWidth - 40, 50, 3, 3, 'FD');

  pdf.setTextColor(0, 166, 81); // #00A651
  pdf.setFontSize(12);
  pdf.text('Bill To:', 30, yPos + 15);

  pdf.setTextColor(0);
  pdf.setFontSize(12);
  pdf.text(document.client_name, 30, yPos + 25);
  
  pdf.setFontSize(10);
  pdf.setTextColor(100);
  pdf.text(`Date: ${formatDate(document.created_at)}`, 30, yPos + 35);
  if (document.due_date) {
    pdf.text(`Due Date: ${formatDate(document.due_date)}`, 30, yPos + 42);
  }

  yPos += 70;

  // Items Table
  const tableData = items.map((item, index) => [
    index + 1,
    {
      content: item.vehicle_type,
      styles: { textColor: [0, 166, 81], fontStyle: 'bold' }
    },
    item.quantity,
    formatCurrency(item.price, document.currency),
    formatCurrency(item.quantity * item.price, document.currency),
    `${formatDate(item.from_date)} - ${formatDate(item.to_date)}`
  ]);

  const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  (pdf as any).autoTable({
    startY: yPos,
    head: [['#', 'Service Details', 'Qty', 'Rate', 'Amount', 'Period']],
    body: tableData,
    foot: [[
      '',
      { content: 'Total:', styles: { halign: 'right', fontStyle: 'bold' } },
      '',
      '',
      { content: formatCurrency(totalAmount, document.currency), styles: { fontStyle: 'bold' } },
      ''
    ]],
    theme: 'grid',
    styles: { fontSize: 10, cellPadding: 6 },
    headStyles: {
      fillColor: [245, 245, 245],
      textColor: [0, 0, 0],
      fontStyle: 'bold'
    },
    footStyles: {
      fillColor: [245, 245, 245],
      textColor: [0, 0, 0]
    }
  });

  yPos = (pdf as any).lastAutoTable.finalY + 20;

  // Payment Details
  pdf.setDrawColor(229, 231, 235);
  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(20, yPos, pageWidth - 40, 80, 3, 3, 'FD');

  pdf.setTextColor(0, 166, 81);
  pdf.setFontSize(12);
  pdf.text('Payment Details', 30, yPos + 15);

  // Bank Transfer
  const leftX = 30;
  pdf.setTextColor(255, 107, 0);
  pdf.setFontSize(11);
  pdf.text('Bank Transfer', leftX, yPos + 30);
  
  pdf.setTextColor(100);
  pdf.setFontSize(10);
  [
    'Bank Name: NCBA, Kenya, Code-07000',
    'Bank Branch: Kilimani, Code-129',
    'Account Name: Ladina Travel Safaris',
    'Bank Account: 1007205933',
    'Swift Code: CBAFKENX'
  ].forEach((line, index) => {
    pdf.text(line, leftX, yPos + 40 + (index * 6));
  });

  // M-PESA
  const rightX = pageWidth / 2 + 10;
  pdf.setTextColor(255, 107, 0);
  pdf.setFontSize(11);
  pdf.text('M-PESA', rightX, yPos + 30);
  
  pdf.setTextColor(100);
  pdf.setFontSize(10);
  [
    'MPESA Paybill: 880100',
    'Account Number: 1007205933'
  ].forEach((line, index) => {
    pdf.text(line, rightX, yPos + 40 + (index * 6));
  });

  yPos += 100;

  // Footer
  pdf.setDrawColor(229, 231, 235);
  pdf.roundedRect(20, yPos, pageWidth - 40, 40, 3, 3, 'FD');

  pdf.setTextColor(0);
  pdf.setFontSize(14);
  pdf.text('Thank You for Your Business!', pageWidth/2, yPos + 15, { align: 'center' });
  
  pdf.setTextColor(100);
  pdf.setFontSize(10);
  pdf.text(
    'If you have any questions, please contact us at info@ladinatravelsafaris.com',
    pageWidth/2,
    yPos + 25,
    { align: 'center' }
  );

  return pdf;
}