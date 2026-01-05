// components/PayslipDetailsModal.js
"use client";

export default function PayslipDetailsModal({ open, onClose, payslip }) {
	if (!open || !payslip) return null;

	return (
		<div className="fixed inset-0 bg-blue-100/70 flex items-start justify-center p-6 z-50 overflow-y-auto mb-0 text-black">
			<div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full">
				{/* Header */}
				<div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-5 flex items-center justify-between rounded-t-2xl">
					<div>
						<h3 className="text-xl font-semibold">Salary Slip</h3>
						<p className="text-sm opacity-90">{payslip.month}</p>
					</div>
					<div className="text-right">
						<p className="text-sm opacity-90">Employee</p>
						<p className="font-medium">John Doe</p>
					</div>
				</div>

				{/* Body */}
				<div className="p-6 space-y-8">
					{/* Earnings & Deductions */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Earnings */}
						<div>
							<div className="flex items-center gap-2 mb-4">
								<div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
									<i className="fas fa-plus text-lg"></i>
								</div>
								<h4 className="text-lg font-semibold text-gray-900">Earnings</h4>
							</div>

							<div className="space-y-3">
								<div className="flex justify-between text-sm">
									<span className="text-gray-700">Basic</span>
									<span className="font-medium">$5,000</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-gray-700">HRA</span>
									<span className="font-medium">$1,500</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-gray-700">Transport</span>
									<span className="font-medium">$300</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-gray-700">Bonus</span>
									<span className="font-medium">$500</span>
								</div>
								<div className="border-t border-gray-200 pt-3 flex justify-between font-medium">
									<span>Total Earnings</span>
									<span>$7,300</span>
								</div>
							</div>
						</div>

						{/* Deductions */}
						<div>
							<div className="flex items-center gap-2 mb-4">
								<div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
									<i className="fas fa-minus text-lg"></i>
								</div>
								<h4 className="text-lg font-semibold text-gray-900">Deductions</h4>
							</div>

							<div className="space-y-3">
								<div className="flex justify-between text-sm">
									<span className="text-gray-700">Tax</span>
									<span className="font-medium">$850</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-gray-700">Insurance</span>
									<span className="font-medium">$200</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-gray-700">PF</span>
									<span className="font-medium">$600</span>
								</div>
								<div className="border-t border-gray-200 pt-3 flex justify-between font-medium text-red-700">
									<span>Total Deductions</span>
									<span>$1,650</span>
								</div>
							</div>
						</div>
					</div>

					{/* Net Pay */}
					<div className="bg-green-50 p-5 rounded-xl text-center">
						<p className="text-sm font-medium text-gray-700">Net Pay</p>
						<p className="text-3xl font-bold text-green-700 mt-1">$5,650</p>
					</div>

					{/* Footer note */}
					<div className="text-center text-xs text-gray-500">
						<i className="fas fa-lock mr-1"></i>
						This payslip is immutable and generated on Jan 31, 2024
					</div>
				</div>

				{/* Footer Buttons */}
				<div className="px-6 py-5 border-t border-gray-200 flex justify-end gap-4">
					<button
						onClick={onClose}
						className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors">
						Close
					</button>

					<button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-md">
						<i className="fas fa-download"></i>
						Download PDF
					</button>
				</div>
			</div>
		</div>
	);
}
