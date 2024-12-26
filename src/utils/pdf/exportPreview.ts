import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import type { Document, VehicleItem } from '../../types';

export async function exportPreviewToPDF(previewElement: HTMLElement, document: Document) {
  // Capture the preview content exactly as rendered
  const canvas = await html2canvas(previewElement, {
    scale: 2, // Higher resolution
    useCORS: true, // Allow loading cross-origin images
    logging: false,
    backgroundColor: '#ffffff'
  });

  // Create PDF with the same dimensions as preview
  const imgWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  const pdf = new jsPDF({
    orientation: imgHeight > pageHeight ? 'p' : 'l',
    unit: 'mm'
  });

  // Add the captured image to PDF
  pdf.addImage(
    canvas.toDataURL('image/png'),
    'PNG',
    0,
    0,
    imgWidth,
    imgHeight,
    '',
    'FAST'
  );

  // Generate filename
  const timestamp = new Date().toISOString().split('T')[0];
  const sanitizedClientName = document.client_name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const filename = `${document.type}_${sanitizedClientName}_${timestamp}.pdf`;

  return {
    pdf,
    filename
  };
}