// app/payslips/page.js
"use client";

import { useEffect, useState } from "react";
import PayslipDetailsModal from "@/components/PayslipDetailsModal";

export default function SalarySlipsPage() {
	const [selectedPayslip, setSelectedPayslip] = useState(null);
	useEffect(() => {
		document.title = "Salary Slips | HRMS Portal";
	}, []);

	// Sample payslip data – latest first
	const payslips = [
		{
			month: "January 2024",
			released: "Released Jan 31, 2024",
			netPay: "$5,650",
			grossEarnings: "$7,300",
			totalDeductions: "$1,650",
			isLatest: true,
		},
		{
			month: "December 2023",
			released: "Released Dec 31, 2023",
			netPay: "$5,200",
			grossEarnings: null, // Only show for latest
			totalDeductions: null,
			isLatest: false,
		},
	];

	const latest = payslips.find((p) => p.isLatest);

	const openPayslip = (slip) => {
		setSelectedPayslip(slip);
	};

	const closePayslip = () => {
		setSelectedPayslip(null);
	};

	const handleDownload = (slip) => {
		console.log("Downloading payslip:", slip.month);
	};

	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Left: History List */}
				<div className="lg:col-span-2 space-y-4">
					{payslips.map((slip) => (
						<div
							key={slip.month}
							className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
							<div className="flex items-center justify-between gap-4">
								<div className="flex items-center gap-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
										<i className="fas fa-file-invoice-dollar text-xl"></i>
									</div>
									<div>
										<p className="text-sm font-medium text-gray-900">{slip.month}</p>
										<p className="text-xs text-gray-500 mt-1">{slip.released}</p>
									</div>
								</div>

								<div className="text-right">
									<p className="text-lg font-bold text-gray-900 flex items-center justify-end gap-2">
										<i className="fas fa-eye-slash text-gray-500"></i>
										<span>$••••</span>
									</p>
									<p className="text-xs text-gray-500">Net Pay</p>
								</div>
							</div>

								{/* Actions row: View + Download for all items in left list */}
								<div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-4">
									<button
										type="button"
										onClick={() => openPayslip(slip)}
										className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-2 cursor-pointer"
									>
										<i className="fas fa-eye"></i>
										View Payslip
									</button>
									<button
										type="button"
										onClick={() => handleDownload(slip)}
										className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-2 cursor-pointer"
									>
										<i className="fas fa-download"></i>
										Download PDF
									</button>
								</div>
						</div>
					))}
				</div>

				{/* Right: Latest Payslip Card */}
				{latest && (
					<div
						className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-xl flex flex-col hover:shadow-2xl transition-shadow">
						<h3 className="text-lg font-semibold mb-4">Latest Payslip</h3>
						<p className="text-3xl font-bold mb-1 flex items-center gap-3">
							<i className="fas fa-eye-slash opacity-80"></i>
							<span>$••••</span>
						</p>
						<p className="text-sm opacity-90 mb-6">{latest.month}</p>

						<div className="flex-1 space-y-4">
							<div className="border-t border-white/20 pt-4">
								<div className="flex justify-between text-sm">
									<span>Gross Earnings</span>
									<span className="font-medium flex items-center gap-2">
										<i className="fas fa-eye-slash opacity-70"></i>
										<span>$••••</span>
									</span>
								</div>
								<div className="flex justify-between text-sm mt-2">
									<span>Total Deductions</span>
									<span className="font-medium flex items-center gap-2">
										<i className="fas fa-eye-slash opacity-70"></i>
										<span>$••••</span>
									</span>
								</div>
							</div>
						</div>

						{/* View Payslip button */}
						<button
							type="button"
							onClick={() => openPayslip(latest)}
							className="mt-6 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
						>
							<i className="fas fa-eye"></i>
							View Payslip
						</button>

						{/* Download Button */}
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								handleDownload(latest);
							}}
							className="mt-3 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
						>
							<i className="fas fa-download"></i>
							Download PDF
						</button>
					</div>
				)}
			</div>
			<PayslipDetailsModal open={!!selectedPayslip} onClose={closePayslip} payslip={selectedPayslip} />
		</div>
	);
}
