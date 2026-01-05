// app/dashboard/page.js

export const metadata = {
	title: "Dashboard | HRMS Portal",
};

export default function DashboardPage() {
	return (
		<div className="space-y-8">
			{/* Overview cards with hover effect */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{/* Annual Leave */}
				<div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200">
					<div className="flex items-start gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
							<i className="fas fa-calendar-days text-xl"></i>
						</div>
						<div>
							<p className="text-2xl font-bold text-gray-900">15</p>
							<p className="text-sm font-medium text-gray-600">Annual Leave</p>
							<p className="text-xs text-gray-500 mt-0.5">days remaining</p>
						</div>
					</div>
				</div>

				{/* Pending Requests */}
				<div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-200">
					<div className="flex items-start gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
							<i className="fas fa-clock text-xl"></i>
						</div>
						<div>
							<p className="text-2xl font-bold text-gray-900">3</p>
							<p className="text-sm font-medium text-gray-600">Pending</p>
							<p className="text-xs text-gray-500 mt-0.5">requests pending</p>
						</div>
					</div>
				</div>

				{/* Casual Leave */}
				<div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-200">
					<div className="flex items-start gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
							<i className="fas fa-coffee text-xl"></i>
						</div>
						<div>
							<p className="text-2xl font-bold text-gray-900">7</p>
							<p className="text-sm font-medium text-gray-600">Casual Leave</p>
							<p className="text-xs text-gray-500 mt-0.5">days remaining</p>
						</div>
					</div>
				</div>

				{/* Short Leave */}
				<div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-200">
					<div className="flex items-start gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
							<i className="fas fa-hourglass-half text-xl"></i>
						</div>
						<div>
							<p className="text-2xl font-bold text-gray-900">12</p>
							<p className="text-sm font-medium text-gray-600">Short Leave</p>
							<p className="text-xs text-gray-500 mt-0.5">hrs remaining</p>
						</div>
					</div>
				</div>
			</div>

			{/* Main sections grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Leave Balance */}
				<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
					<div className="flex items-center gap-3 mb-6">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
							<i className="fas fa-calendar-check text-lg"></i>
						</div>
						<h3 className="text-lg font-semibold text-gray-900">Leave Balance</h3>
					</div>

					<div className="space-y-5">
						{[
							{ label: "Annual Leave", used: 6, total: 21, color: "bg-blue-500" },
							{ label: "Casual Leave", used: 3, total: 10, color: "bg-blue-500" },
							{ label: "Short Leave", used: 4, total: 16, unit: "hrs", color: "bg-blue-500" },
							{ label: "No Pay Leave", used: 0, total: 30, color: "bg-blue-500" },
							{ label: "Special Leave", used: 0, total: 15, color: "bg-blue-500" },
						].map((item) => (
							<div key={item.label} className="space-y-1.5">
								<div className="flex justify-between text-sm">
									<span className="text-gray-700 font-medium">{item.label}</span>
									<span className="text-gray-500">
										{item.used} / {item.total} {item.unit || "days"}
									</span>
								</div>
								<div className="h-2 bg-gray-100 rounded-full overflow-hidden">
									<div className="h-full progress-gradient" style={{ width: `${(item.used / item.total) * 100}%` }} />
								</div>
							</div>
						))}
					</div>

					<a href="/leave" className="mt-6 inline-block text-blue-600 text-sm font-medium hover:underline">
						Apply for Leave →
					</a>
				</div>

				{/* Recent Requests */}
				<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
					<div className="flex items-center gap-3 mb-6">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
							<i className="fas fa-history text-lg"></i>
						</div>
						<h3 className="text-lg font-semibold text-gray-900">Recent Requests</h3>
					</div>

					<div className="space-y-5">
						{[
							{
								icon: "calendar",
								type: "Leave Request",
								date: "Feb 10, 2024",
								status: "Pending Approval",
								statusColor: "bg-orange-100 text-orange-800 border-orange-300",
							},
							{
								icon: "calendar",
								type: "Leave Request",
								date: "Jan 18, 2024",
								status: "Approved",
								statusColor: "bg-green-100 text-green-800 border-green-300",
							},
							{
								icon: "user-edit",
								type: "Profile Change",
								date: "Feb 8, 2024",
								status: "Pending Approval",
								statusColor: "bg-orange-100 text-orange-800 border-orange-300",
							},
							{
								icon: "headset",
								type: "HR Inquiry",
								date: "Feb 12, 2024",
								status: "Submitted",
								statusColor: "bg-blue-100 text-blue-800 border-blue-300",
							},
						].map((req, index) => (
							<div
								key={index}
								className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
								<div className="flex items-center gap-3">
									<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-600">
										<i className={`fas fa-${req.icon} text-base`}></i>
									</div>
									<div>
										<p className="text-sm font-medium text-gray-900">{req.type}</p>
										<p className="text-xs text-gray-500">{req.date}</p>
									</div>
								</div>
								<span className={`px-3 py-1 rounded-full text-xs font-medium border text-center ${req.statusColor}`}>
									{req.status}
								</span>
							</div>
						))}
					</div>

					<a href="/requests" className="mt-6 inline-block text-blue-600 text-sm font-medium hover:underline">
						View All Requests →
					</a>
				</div>

				{/* Quick Actions */}
				<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
					<div className="flex items-center gap-3 mb-6">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
							<i className="fas fa-bolt text-lg"></i>
						</div>
						<h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
					</div>

					<div className="grid grid-cols-2 gap-4">
						{[
							{ label: "Apply Leave", icon: "calendar-plus", bg: "bg-blue-50", text: "text-blue-600" },
							{ label: "Short Leave", icon: "clock", bg: "bg-amber-50", text: "text-amber-600" },
							{ label: "View Payslip", icon: "file-invoice", bg: "bg-green-50", text: "text-green-600" },
							{ label: "Contact HR", icon: "headset", bg: "bg-purple-50", text: "text-purple-600" },
						].map((action, index) => (
							<button
								key={index}
								className={`flex flex-col items-center gap-3 p-5 rounded-xl border ${action.bg} hover:shadow-md hover:border-blue-200 transition-all duration-200`}>
								<div className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.bg}`}>
									<i className={`fas fa-${action.icon} text-2xl ${action.text}`}></i>
								</div>
								<span className="text-sm font-medium text-gray-700">{action.label}</span>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
