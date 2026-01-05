"use client";

import { useState, useEffect } from "react";
import RequestDetailsModal from "@/components/RequestDetailsModal";

export default function MyRequestsPage() {
	useEffect(() => {
		document.title = "My Requests | HRMS Portal";
	}, []);

	const [activeTab, setActiveTab] = useState("All");
	const [selectedRequest, setSelectedRequest] = useState(null);

	const requests = [
		{
			id: "REQ0001",
			type: "Leave Request",
			icon: "calendar",
			created: "Created Feb 10, 09:00 AM",
			duration: "Feb 15, 2024 - Feb 17, 2024",
			days: "3",
			status: "Pending Approval",
			statusColor: "text-orange-800 bg-orange-100",
			pendingWith: "Sarah Manager",
			pendingSince: "6d pending",
			reason: "Personal errands",
			history: [{ action: "Created by John Doe", date: "Feb 10, 09:00 AM", status: "pending" }],
		},
		{
			id: "REQ0002",
			type: "Leave Request",
			icon: "calendar",
			created: "Created Jan 18, 02:00 PM",
			duration: "Jan 20, 2024",
			days: "1",
			status: "Approved",
			statusColor: "text-green-800 bg-green-100",
			approvedBy: "Sarah Manager",
			approvedOn: "Jan 20, 04:30 PM",
			hrComment: "Approved. Enjoy!",
			reason: "Personal errands",
			history: [
				{ action: "Created by John Doe", date: "Jan 18, 02:00 PM", status: "pending" },
				{ action: "Approved by Sarah Manager", date: "Jan 20, 04:30 PM", status: "approved" },
			],
		},
		{
			id: "REQ0003",
			type: "Profile Change",
			icon: "user-edit",
			created: "Created Feb 8, 11:00 AM",
			phone: "+1-555-0101 → +1-555-0199",
			status: "Pending Approval",
			statusColor: "text-orange-800 bg-orange-100",
			pendingWith: "Mike HR",
			pendingSince: "6d pending",
			reason: "Update contact numbers",
			history: [{ action: "Created by John Doe", date: "Feb 8, 11:00 AM", status: "pending" }],
		},
		{
			id: "REQ0004",
			type: "HR Inquiry",
			icon: "headset",
			created: "Created Feb 12, 10:00 AM",
			status: "Pending Approval",
			statusColor: "text-orange-800 bg-orange-100",
			pendingWith: "Mike HR",
			pendingSince: "6d pending",
			reason: "Inquiry about benefits",
			history: [{ action: "Created by John Doe", date: "Feb 12, 10:00 AM", status: "submitted" }],
		},
	];

	const filteredRequests = activeTab === "All" ? requests : requests.filter((r) => r.status.includes(activeTab));

	const openDetails = (req) => {
		setSelectedRequest(req);
	};

	const closeDetails = () => {
		setSelectedRequest(null);
	};

	return (
		<div className="space-y-6">
			<div className="flex border-b border-gray-200 overflow-x-auto">
				{["All", "Pending", "Approved", "Rejected"].map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`px-5 pb-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
							activeTab === tab
								? "border-blue-600 text-blue-600"
								: "border-transparent text-gray-500 hover:text-gray-700"
						}`}>
						{tab}
					</button>
				))}
			</div>

			<div className="space-y-4">
				{filteredRequests.map((req) => (
					<div
						key={req.id}
						className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
						<div className="flex items-start justify-between gap-4">
							<div className="flex items-start gap-3 flex-1">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
									<i className={`fas fa-${req.icon} text-xl`}></i>
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium text-gray-900">{req.type}</p>
									<p className="text-xs text-gray-500 mt-1 truncate">
										ID: {req.id} • {req.created}
									</p>
									{req.duration && (
										<p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
											<i className="fas fa-calendar text-gray-400"></i>
											<span>{req.duration}</span>
											<span className="mx-1">•</span>
											<span>{req.days}</span>
										</p>
									)}
									{req.phone && (
										<p className="text-xs text-gray-500 mt-1">
											<i className="fas fa-phone text-gray-400 mr-1"></i>
											{req.phone}
										</p>
									)}
								</div>
							</div>

							<span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${req.statusColor}`}>
								{req.status}
							</span>
						</div>

						{req.pendingWith && (
							<p className="mt-3 text-xs text-gray-600">
								Pending with {req.pendingWith} • {req.pendingSince}
							</p>
						)}

						<div className="mt-4 border-t border-gray-200 pt-4">
							<div className="flex items-center gap-6">
								<button
									onClick={() => openDetails(req)}
									className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1.5">
									<i className="fas fa-eye"></i>
									View Details
								</button>

								{(req.status === "Pending Approval" || req.status === "Pending") && (
									<button className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1.5">
										<i className="fas fa-times"></i>
										Cancel
									</button>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			<RequestDetailsModal open={!!selectedRequest} onClose={closeDetails} request={selectedRequest} />
		</div>
	);
}
