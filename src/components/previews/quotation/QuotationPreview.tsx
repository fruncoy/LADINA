import { formatDate } from '../../../utils/date';
import { formatCurrency } from '../../../utils/currency';
import type { Document, VehicleItem } from '../../../types';

interface QuotationPreviewProps {
  document: Document;
  items: VehicleItem[];
}

export function QuotationPreview({ document, items }: QuotationPreviewProps) {
  const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white">
      {/* Header with Logo */}
      <div className="grid grid-cols-3 gap-8 items-center mb-8">
        <div className="flex flex-col gap-2">
          <span className="text-gray-600">Kefan Building, Woodavenue Road</span>
          <span className="text-gray-600">(254) 728 309 380</span>
        </div>

        <div className="flex justify-center">
          <img
            src="/Logo.png"
            alt="Company Logo"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
          />
        </div>

        <div className="flex flex-col gap-2 text-right">
          <span className="text-gray-600">info@ladinatravelsafaris.com</span>
          <span className="text-gray-600">ladinatravelsafaris.com</span>
        </div>
      </div>

      {/* Quotation Details */}
      <div className="border border-[#FEDFCA] bg-[#FFF4EE] rounded-lg p-6 mb-8">
        <h2 className="text-[#FF6B00] text-2xl font-medium mb-4">QUOTATION</h2>
        <p className="font-medium mb-1">{document.client_name}</p>
        <div className="text-sm text-gray-600">
          <p>Quotation Date: {formatDate(document.created_at)}</p>
          {document.due_date && <p>Valid Until: {formatDate(document.due_date)}</p>}
        </div>
      </div>

      {/* Service Details Table */}
      <table className="w-full mb-8 border-collapse border border-gray-200 rounded-lg">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left py-3 px-6">#</th>
            <th className="text-left py-3 px-6">Service Details</th>
            <th className="text-center py-3 px-6">Qty</th>
            <th className="text-right py-3 px-6">Rate</th>
            <th className="text-right py-3 px-6">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id} className="border-b border-gray-200">
              <td className="py-4 px-6">{index + 1}</td>
              <td className="py-4 px-6">
                <div className="flex justify-between items-center">
                  <span className="text-[#00A651] font-medium">{item.vehicle_type}</span>
                  <span className="text-sm">
                    <sup>
                      {formatDate(item.from_date)} <span className="text-[#FF6B00]">To</span> {formatDate(item.to_date)}
                    </sup>
                  </span>
                </div>
                {item.additional_info && (
                  <div className="mt-1">
                    <em className="text-sm text-gray-600">{item.additional_info}</em>
                  </div>
                )}
              </td>
              <td className="text-center py-4 px-6">{item.quantity}</td>
              <td className="text-right py-4 px-6">
                {formatCurrency(item.price, document.currency)}
              </td>
              <td className="text-right py-4 px-6">
                {formatCurrency(item.quantity * item.price, document.currency)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-50">
            <td colSpan={4} className="text-right py-4 px-6 font-medium">
              Total:
            </td>
            <td className="text-right py-4 px-6 font-medium">
              {formatCurrency(totalAmount, document.currency)}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Footer */}
      <div className="border border-gray-200 rounded-lg p-6 text-center">
        <h2 className="text-lg font-medium mb-2">
          Thank You for Considering Our Services!
        </h2>
        <p className="text-sm text-gray-600">
          If you have any questions, please contact us at info@ladinatravelsafaris.com
        </p>
      </div>
    </div>
  );
}