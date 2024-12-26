import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Invoices } from './pages/Invoices';
import { Quotations } from './pages/Quotations';
import { Receipts } from './pages/Receipts';
import { DocumentForm } from './features/documents/components/DocumentForm';
import { ReceiptForm } from './features/documents/components/ReceiptForm';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#2B372A] pb-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/invoices/new" element={<DocumentForm type="invoice" />} />
          <Route path="/invoices/:id" element={<DocumentForm type="invoice" />} />
          <Route path="/quotations" element={<Quotations />} />
          <Route path="/quotations/new" element={<DocumentForm type="quotation" />} />
          <Route path="/quotations/:id" element={<DocumentForm type="quotation" />} />
          <Route path="/receipts" element={<Receipts />} />
          <Route path="/receipts/new" element={<ReceiptForm />} />
          <Route path="/receipts/:id" element={<DocumentForm type="receipt" />} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
}