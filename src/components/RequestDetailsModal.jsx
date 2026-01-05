"use client";

export default function RequestDetailsModal({ open, onClose, request }) {
	if (!open || !request) return null;

	return (
		<div className="fixed inset-0 bg-blue-100/70 flex items-start justify-center p-6 z-50 overflow-y-auto mb-0">
			<div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full">
				{/* Header */}
				<div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
					<h3 className="text-xl font-semibold text-gray-900">Request Details</h3>
					<span
						className={`px-4 py-1 rounded-full text-sm font-medium ${
							request.status.includes("Pending")
								? "bg-orange-100 text-orange-800"
								: request.status === "Approved"
								? "bg-green-100 text-green-800"
								: request.status === "Submitted"
								? "bg-blue-100 text-blue-800"
								: "bg-red-100 text-red-800"
						}`}>
						{request.status}
					</span>
				</div>

				{/* Body */}
				<div className="p-6 space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<p className="text-sm font-medium text-gray-700">Request ID</p>
							<p className="text-gray-900">{request.id}</p>
						</div>
						<div>
							<p className="text-sm font-medium text-gray-700">Type</p>
							<p className="text-gray-900">{request.type}</p>
						</div>
						<div>
							<p className="text-sm font-medium text-gray-700">Employee</p>
							<p className="text-gray-900">John Doe</p>
						</div>
						<div>
							<p className="text-sm font-medium text-gray-700">Created</p>
							<p className="text-gray-900">{request.created}</p>
						</div>
					</div>

					{/* Duration / Details */}
					{request.duration && (
						<div className="bg-gray-50 p-4 rounded-lg">
							<h4 className="text-sm font-medium text-gray-700 mb-2">Details</h4>
							<p className="text-sm text-gray-700">Duration: {request.duration}</p>
							<p className="text-sm text-gray-700 mt-1">Reason: {request.reason || "N/A"}</p>
						</div>
					)}

					{/* Pending / Approval Info */}
					{request.pendingWith && (
						<div>
							<h4 className="text-sm font-medium text-gray-700 mb-2">Current Status</h4>
							<p className="text-sm text-gray-700">
								Pending with {request.pendingWith} • {request.pendingSince}
							</p>
						</div>
					)}

					{/* Approval History */}
					<div>
						<h4 className="text-sm font-medium text-gray-700 mb-3">Approval History</h4>
						{request.history && Array.isArray(request.history) ? (
							<div className="space-y-3">
								{request.history.map((entry, idx) => (
									<div key={idx} className="flex items-start gap-3">
										<div
											className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
												entry.status === "approved" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
											}`}>
											{entry.status === "approved" ? "✓" : "•"}
										</div>
										<div>
											<p className="text-sm text-gray-900">{entry.action}</p>
											<p className="text-xs text-gray-500">{entry.date}</p>
										</div>
									</div>
								))}
							</div>
						) : (
							<p className="text-sm text-gray-500">No history available</p>
						)}
					</div>

					{/* HR Comment (for approved) */}
					{request.hrComment && (
						<div>
							<h4 className="text-sm font-medium text-gray-700 mb-2">HR Response</h4>
							<p className="text-sm text-gray-700 italic">{request.hrComment}</p>
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="px-6 py-5 border-t border-gray-200 flex justify-end">
					<button
						onClick={onClose}
						className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors">
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
