"use client";

export default function TicketDetailsModal({ open, onClose, ticket }) {
  if (!open || !ticket) return null;

  return (
    <div className="fixed inset-0 bg-blue-100/70 flex items-start justify-center p-6 z-50 overflow-y-auto mb-0">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Ticket Details</h3>
          <span className="px-4 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {ticket.status}
          </span>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Grid Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-700">Request ID</p>
              <p className="text-sm text-gray-900">{ticket.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Type</p>
              <p className="text-sm text-gray-900">{ticket.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Employee</p>
              <p className="text-sm text-gray-900">John Doe</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Created</p>
              <p className="text-sm text-gray-900">{ticket.created}</p>
            </div>
          </div>

          {/* Leave Details */}
          {ticket.duration && (
            <div className="bg-gray-50 p-5 rounded-xl">
              <h4 className="text-base font-medium text-gray-900 mb-3">Leave Details</h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  Type: {ticket.type.replace(" Request", "")}
                </p>
                <p className="text-sm text-gray-700">
                  Duration: {ticket.duration} ({ticket.days} days)
                </p>
                <p className="text-sm text-gray-700">
                  Reason: {ticket.reason || "Personal errands"}
                </p>
              </div>
            </div>
          )}

          {/* Approval History */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Approval History</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">
                  •
                </div>
                <div>
                  <p className="text-sm text-gray-900">Created by John Doe</p>
                  <p className="text-xs text-gray-500">{ticket.created}</p>
                </div>
              </div>

              {ticket.status === "Approved" && (
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Approved by {ticket.approvedBy || "HR Team"}</p>
                    <p className="text-xs text-gray-500">{ticket.approvedOn || "N/A"}</p>
                    {ticket.hrComment && (
                      <p className="text-sm text-gray-600 italic mt-1">
                        {ticket.hrComment}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}