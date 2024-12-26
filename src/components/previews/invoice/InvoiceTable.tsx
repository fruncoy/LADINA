import { formatDate } from '../../../utils/date';
import { formatCurrency } from '../../../utils/currency';
import type { Document, VehicleItem } from '../../../types';

interface InvoiceTableProps {
  document: Document;
  items: VehicleItem[];
}

export function InvoiceTable({ document, items }: InvoiceTableProps) {
  return (
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
                  <em className="text-sm text-gray-1000">{item.additional_info}</em>
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
            {formatCurrency(
              items.reduce((sum, item) => sum + (item.quantity * item.price), 0),
              document.currency
            )}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}