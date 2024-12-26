import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { CurrencySelector } from './form/CurrencySelector';
import { VehicleItemsTable } from './form/VehicleItemsTable';
import { PreviewModal } from '../../../components/previews/PreviewModal';
import { useDocumentForm } from '../hooks/useDocumentForm';
import { useDocumentItems } from '../hooks/useDocumentItems';
import { useDocumentStorage } from '../hooks/useDocumentStorage';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import type { Document, DocumentType } from '../../../types';

interface DocumentFormProps {
  type: DocumentType;
}

export function DocumentForm({ type }: DocumentFormProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { documents, items: storedItems } = useLocalStorage();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Find existing document if editing
  const existingDocument = id ? documents.find(doc => doc.id === id) : undefined;
  const existingItems = id ? storedItems[id] || [] : [];

  const {
    clientName,
    setClientName,
    currency,
    setCurrency,
    documentDate,
    setDocumentDate,
    dueDate,
    setDueDate,
    documentData,
    error,
    validateForm
  } = useDocumentForm({ type, initialData: existingDocument });

  const {
    items,
    setItems,
    addItem,
    deleteItem,
    calculateTotal,
  } = useDocumentItems(existingItems);

  const { saveDocumentWithItems } = useDocumentStorage();

  useEffect(() => {
    if (id && !existingDocument) {
      // If ID provided but document not found, redirect to list
      navigate(`/${type}s`);
    }
  }, [id, existingDocument, type, navigate]);

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    const savedDocument = saveDocumentWithItems(
      { ...documentData, total_amount: calculateTotal() },
      items
    );
    navigate(`/${type}s`);
  };

  const handlePreview = () => {
    if (!validateForm()) {
      return;
    }
    setIsPreviewOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-white mb-6">
        {id ? 'Edit' : 'Create New'} {type.charAt(0).toUpperCase() + type.slice(1)}
      </h1>

      <div className="space-y-6 bg-white rounded-lg p-6">
        <CurrencySelector value={currency} onChange={setCurrency} />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Client Details</h2>
          <div className="space-y-4">
            <Input 
              label="Client Name" 
              value={clientName}
              onChange={e => setClientName(e.target.value)}
              error={error}
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                type="date" 
                label={`${type.charAt(0).toUpperCase() + type.slice(1)} Date`}
                value={documentDate.split('T')[0]}
                onChange={e => setDocumentDate(e.target.value)}
                required
              />
              <Input 
                type="date" 
                label={type === 'invoice' ? 'Due Date' : 'Valid Until'}
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <VehicleItemsTable
          items={items}
          currency={currency}
          onAddItem={addItem}
          onDeleteItem={deleteItem}
          onPreview={handlePreview}
        />

        <div className="flex justify-end space-x-4">
          <Button 
            variant="secondary" 
            onClick={() => navigate(`/${type}s`)}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        </div>
      </div>

      {isPreviewOpen && (
        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          document={{
            ...documentData,
            total_amount: calculateTotal()
          }}
          items={items}
          allowEdit={false}
        />
      )}
    </div>
  );
}