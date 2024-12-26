import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import { Eye } from 'lucide-react';
import { PreviewModal } from '../../../components/previews/PreviewModal';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useDocumentStorage } from '../hooks/useDocumentStorage';
import type { Document } from '../../../types';

export function ReceiptForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const invoiceId = searchParams.get('invoiceId');
  const { documents, items: storedItems } = useLocalStorage();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    client_name: '',
    currency: 'KSH' as const,
    total_amount: 0,
    payment_mode: 'cash',
    payment_reference: '',
    received_by: '',
    balance: 0,
    notes: ''
  });

  // If invoiceId is provided, load invoice data
  const sourceInvoice = invoiceId ? documents.find(doc => doc.id === invoiceId && doc.type === 'invoice') : null;
  const invoiceItems = invoiceId ? storedItems[invoiceId] || [] : [];

  useEffect(() => {
    if (sourceInvoice) {
      setFormData(prev => ({
        ...prev,
        client_name: sourceInvoice.client_name,
        currency: sourceInvoice.currency,
        total_amount: sourceInvoice.total_amount
      }));
    }
  }, [sourceInvoice]);

  const { saveDocumentWithItems } = useDocumentStorage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const receipt: Document = {
      id: crypto.randomUUID(),
      type: 'receipt',
      client_name: formData.client_name,
      created_at: new Date().toISOString(),
      currency: formData.currency,
      total_amount: formData.total_amount,
      payment_mode: formData.payment_mode as 'cash' | 'cheque' | 'mpesa' | 'bank',
      payment_reference: formData.payment_reference,
      received_by: formData.received_by,
      balance: formData.balance
    };

    saveDocumentWithItems(receipt, invoiceItems);
    navigate('/receipts');
  };

  const previewDocument: Document = {
    ...formData,
    id: 'preview',
    type: 'receipt',
    created_at: new Date().toISOString()
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">
          {sourceInvoice ? `Generate Receipt from Invoice` : 'Create New Receipt'}
        </h1>
        <Button 
          onClick={() => setIsPreviewOpen(true)}
          className="flex items-center gap-2"
        >
          <Eye size={18} />
          Preview
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 space-y-6">
        {sourceInvoice && (
          <div className="bg-[#FFF4EE] border border-[#FEDFCA] rounded-lg p-4">
            <h2 className="font-medium text-[#00A651] mb-2">Invoice Details</h2>
            <p className="mb-1">Client: {sourceInvoice.client_name}</p>
            <p>Amount: {sourceInvoice.total_amount}</p>
          </div>
        )}

        {!sourceInvoice && (
          <>
            <Input
              label="Client Name"
              value={formData.client_name}
              onChange={e => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Currency"
                value={formData.currency}
                onChange={e => setFormData(prev => ({ ...prev, currency: e.target.value as 'KSH' | 'USD' }))}
                options={[
                  { value: 'KSH', label: 'KSH' },
                  { value: 'USD', label: 'USD' }
                ]}
                required
              />

              <Input
                type="number"
                label="Amount"
                value={formData.total_amount}
                onChange={e => setFormData(prev => ({ ...prev, total_amount: parseFloat(e.target.value) }))}
                required
              />
            </div>
          </>
        )}

        <Select
          label="Payment Mode"
          value={formData.payment_mode}
          onChange={e => setFormData(prev => ({ ...prev, payment_mode: e.target.value }))}
          options={[
            { value: 'cash', label: 'Cash' },
            { value: 'cheque', label: 'Cheque' },
            { value: 'mpesa', label: 'M-PESA' },
            { value: 'bank', label: 'Bank Transfer' }
          ]}
          required
        />

        <Input
          label="Payment Reference"
          value={formData.payment_reference}
          onChange={e => setFormData(prev => ({ ...prev, payment_reference: e.target.value }))}
          placeholder="Enter reference number"
        />

        <Input
          label="Received By"
          value={formData.received_by}
          onChange={e => setFormData(prev => ({ ...prev, received_by: e.target.value }))}
          required
        />

        <Input
          type="number"
          label="Balance"
          value={formData.balance}
          onChange={e => setFormData(prev => ({ ...prev, balance: parseFloat(e.target.value) }))}
        />

        <Input
          label="Notes"
          value={formData.notes}
          onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          multiline
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="secondary" onClick={() => navigate('/receipts')}>
            Cancel
          </Button>
          <Button type="submit">Generate Receipt</Button>
        </div>
      </form>

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        document={previewDocument}
        items={invoiceItems}
        allowEdit={false}
      />
    </div>
  );
}