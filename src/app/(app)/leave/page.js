"use client";

import { useState } from "react";
import ApplyLeaveModal from "@/components/ApplyLeaveModal";
import ApplyShortLeaveModal from "@/components/ApplyShortLeaveModal";

export default function LeavePage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isShortLeaveModalOpen, setIsShortLeaveModalOpen] = useState(false);

	const leaveTypes = [
		{ code: "AL", name: "Annual Leave", available: 15 },
		{ code: "CL", name: "Casual Leave", available: 7 },
		{ code: "SL", name: "Short Leave", available: 12 },
		{ code: "NPL", name: "No Pay Leave", available: 30 },
		{ code: "SPL", name: "Special Leave", available: 0 },
	];
	return (
		<div className="space-y-8">
			{/* Leave Balance Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{[
					{
						type: "Annual Leave",
						code: "AL",
						remaining: 15,
						total: 21,
						color: "bg-blue-500",
					},
					{
						type: "Casual Leave",
						code: "CL",
						remaining: 7,
						total: 10,
						color: "bg-blue-500",
					},
					{
						type: "Short Leave",
						code: "SL",
						remaining: 12,
						total: 16,
						unit: "hrs",
						color: "bg-blue-500",
					},
					{
						type: "No Pay Leave",
						code: "NPL",
						remaining: 30,
						total: 30,
						color: "bg-blue-500",
					},
					{
						type: "Special Leave",
						code: "SPL",
						remaining: 0,
						total: 15,
						color: "bg-blue-500",
					},
				].map((leave) => (
					<div
						key={leave.code}
						className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
						<div className="flex justify-between items-start mb-3">
							<div>
								<p className="text-sm font-medium text-gray-700">{leave.type}</p>
								<p className="text-xl font-bold text-gray-900 mt-1">
									{leave.remaining} / {leave.total} {leave.unit || "days"}
								</p>
							</div>
							<span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 text-xs font-medium">
								{leave.code}
							</span>
						</div>

						<div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-4 mt-auto">
							<div
								className="h-full progress-gradient"
								style={{
									width: `${(leave.remaining / leave.total) * 100}%`,
								}}
							/>
						</div>
					</div>
				))}
			</div>

			{/* Action Buttons */}
			<div className="flex flex-wrap gap-4">
				<button
					onClick={() => setIsModalOpen(true)}
					className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm">
					<i className="fas fa-plus text-lg"></i>
					Apply Leave
				</button>

				<button
					onClick={() => setIsShortLeaveModalOpen(true)}
					className="bg-white border border-blue-600 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors">
					<i className="fas fa-clock text-lg"></i>
					Short Leave
				</button>
			</div>

			{/* Apply Leave Modal */}
			<ApplyLeaveModal open={isModalOpen} onClose={() => setIsModalOpen(false)} leaveTypes={leaveTypes} />

			{/* Apply Short Leave Modal */}
			<ApplyShortLeaveModal open={isShortLeaveModalOpen} onClose={() => setIsShortLeaveModalOpen(false)} />
			{/* Leave History Table */}
			<div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
				<div className="p-6 border-b border-gray-200">
					<h2 className="text-lg font-semibold text-gray-900">Leave History</h2>
				</div>

				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									REQUEST ID
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TYPE</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									DURATION
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DAYS</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									STATUS
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									ACTIONS
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							<tr>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">REQ0001</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Annual Leave</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Feb 15, 2024 - Feb 17, 2024</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">3</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-orange-100 text-orange-800">
										Pending Approval
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<button className="text-gray-600 hover:text-gray-900">
										<i className="fas fa-eye"></i>
									</button>
								</td>
							</tr>

							<tr>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">REQ0002</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Casual Leave</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Jan 20, 2024</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">1</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-green-100 text-green-800">
										Approved
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<button className="text-gray-600 hover:text-gray-900">
										<i className="fas fa-eye"></i>
									</button>
								</td>
							</tr>

							{/* You can add more rows here */}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
