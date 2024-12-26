import { jsPDF } from 'jspdf';

export function addPaymentDetails(pdf: jsPDF, startY: number) {
  let yPos = startY + 20;
  
  pdf.setFontSize(12);
  pdf.setTextColor(0, 166, 81); // #00A651
  pdf.text('Payment Details', 20, yPos);
  yPos += 15;

  const leftX = 20;
  const rightX = pdf.internal.pageSize.width / 2 + 20;

  // Bank Transfer
  pdf.setTextColor(255, 107, 0); // #FF6B00
  pdf.setFontSize(11);
  pdf.text('Bank Transfer', leftX, yPos);
  
  pdf.setTextColor(100);
  pdf.setFontSize(10);
  yPos += 10;
  [
    'Bank Name: NCBA, Kenya, Code-07000',
    'Bank Branch: Kilimani, Code-129',
    'Account Name: Ladina Travel Safaris',
    'Bank Account: 1007205933',
    'Swift Code: CBAFKENX'
  ].forEach(line => {
    pdf.text(line, leftX, yPos);
    yPos += 6;
  });

  // M-PESA
  const mpesaY = startY + 35;
  pdf.setTextColor(255, 107, 0);
  pdf.setFontSize(11);
  pdf.text('M-PESA', rightX, mpesaY);
  
  pdf.setTextColor(100);
  pdf.setFontSize(10);
  [
    'MPESA Paybill: 880100',
    'Account Number: 1007205933'
  ].forEach((line, index) => {
    pdf.text(line, rightX, mpesaY + 10 + (index * 6));
  });

  return yPos;
}