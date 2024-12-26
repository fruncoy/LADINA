import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { generatePDF } from '../utils/pdf';

export function useDocumentDownload() {
  const { documents, items: storedItems } = useLocalStorage();

  const downloadDocument = useCallback((id: string) => {
    const document = documents.find(doc => doc.id === id);
    if (!document) return;

    const items = storedItems[id] || [];
    const pdf = generatePDF(document, items);

    // Generate filename
    const timestamp = new Date().toISOString().split('T')[0];
    const sanitizedClientName = document.client_name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filename = `${document.type}_${sanitizedClientName}_${timestamp}.pdf`;

    // Download the PDF
    pdf.save(filename);
  }, [documents, storedItems]);

  return { downloadDocument };
}