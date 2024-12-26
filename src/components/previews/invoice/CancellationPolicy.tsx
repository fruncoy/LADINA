export function CancellationPolicy() {
  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-8">
      <h3 className="text-[#00A651] font-medium mb-4">
        Booking Cancellation Policy & Deposits
      </h3>
      <ul className="space-y-2">
        <li className="text-sm text-gray-600">
          <span className="text-[#FF6B00]">Full Refund:</span> If cancellation
          occurs 30 days or more before the travel date.
        </li>
        <li className="text-sm text-gray-600">
          <span className="text-[#FF6B00]">50% Refund:</span> For
          cancellations made less than 7 days before the travel date.
        </li>
        <li className="text-sm text-gray-600">
          <span className="text-[#FF6B00]">Deposit:</span> A 50% deposit of
          the total safari cost is required upon booking, with the balance due
          on the day of the trip/safari.
        </li>
      </ul>
    </div>
  );
}