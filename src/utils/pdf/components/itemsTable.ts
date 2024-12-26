import { jsPDF } from 'jspdf';
import { formatCurrency } from '../../currency';
import { formatDate } from '../../date';
import type { Document, VehicleItem } from '../../../types';

export function addItemsTable(pdf: jsPDF, document: Document, items: VehicleItem[], yPos: number) {
  const tableData = items.map((item, index) => [
    index + 1,
    {
      content: [
        { text: item.vehicle_type, styles: { textColor: [0, 166, 81], fontStyle: 'bold' } },
        item.additional_info ? { text: item.additional_info, fontSize: 9, textColor: [100, 100, 100] } : '',
        { text: `${formatDate(item.from_date)} - ${formatDate(item.to_date)}`, fontSize: 8 }
      ]
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
      textColor: [0, 0, 0],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 30, halign: 'center' },
      3: { cellWidth: 40, halign: 'right' },
      4: { cellWidth: 40, halign: 'right' },
      5: { cellWidth: 60, halign: 'center' }
    }
  });

  return (pdf as any).lastAutoTable.finalY + 20; // Return next Y position
}