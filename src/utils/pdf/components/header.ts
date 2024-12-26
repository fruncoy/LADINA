import { jsPDF } from 'jspdf';
import { loadImage } from '../../images';

export async function addHeader(pdf: jsPDF, yPos: number) {
  const pageWidth = pdf.internal.pageSize.width;
  
  // Add logo
  try {
    const logo = await loadImage('/Logo.png');
    const logoSize = 40;
    const logoX = (pageWidth - logoSize) / 2;
    pdf.addImage(logo, 'PNG', logoX, yPos, logoSize, logoSize);
  } catch (error) {
    console.error('Failed to load logo:', error);
  }

  // Contact info
  pdf.setFontSize(10);
  pdf.setTextColor(100);
  pdf.text('Kefan Building, Woodavenue Road', 20, yPos + 10);
  pdf.text('(254) 728 309 380', 20, yPos + 16);
  pdf.text('info@ladinatravelsafaris.com', pageWidth - 20, yPos + 10, { align: 'right' });
  pdf.text('ladinatravelsafaris.com', pageWidth - 20, yPos + 16, { align: 'right' });

  return yPos + 70; // Return next Y position
}