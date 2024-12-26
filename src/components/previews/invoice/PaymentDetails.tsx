export function PaymentDetails() {
  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-8">
      <h3 className="text-[#00A651] font-medium mb-4">Payment Details</h3>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h4 className="text-[#FF6B00] font-medium mb-2">Bank Transfer</h4>
          <p className="text-sm text-gray-600">Bank Name: NCBA, Kenya, Code-07000</p>
          <p className="text-sm text-gray-600">Bank Branch: Kilimani, Code-129</p>
          <p className="text-sm text-gray-600">Account Name: Ladina Travel Safaris</p>
          <p className="text-sm text-gray-600">Bank Account: 1007205933</p>
          <p className="text-sm text-gray-600">Swift Code: CBAFKENX</p>
        </div>

        <div>
          <h4 className="text-[#FF6B00] font-medium mb-2">M-PESA</h4>
          <p className="text-sm text-gray-600">MPESA Paybill: 880100</p>
          <p className="text-sm text-gray-600">Account Number: 1007205933</p>
        </div>
      </div>
    </div>
  );
}