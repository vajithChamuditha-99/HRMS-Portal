"use client";

import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

const titleMap = {
	"/dashboard": "Dashboard",
	"/leave": "Leave Management",
	"/profile": "My Profile",
	"/requests": "My Requests",
	"/payslips": "Salary Slips",
	"/hr-services": "HR Services",
};

const statusMessages = {
	"/dashboard": "Welcome back, John! Here's your overview.",
	"/leave": "Apply for leave and view your leave history.",
	"/hr-services": "Get help from HR or raise a service request.",
	"/payslips": "View and download your monthly payslips.",
};

export default function AppLayout({ children }) {
	const pathname = usePathname();
	const base = Object.keys(titleMap).find((p) => pathname === p || pathname?.startsWith(p + "/"));
	const title = base ? titleMap[base] : "HRMS Portal";

	const today = new Date();
	const dateStr = today.toLocaleDateString("en-US", {
		weekday: "long",
		month: "short",
		day: "numeric",
	});

	return (
		<div className="h-screen bg-gray-50 flex overflow-hidden">
			<Sidebar />
			<div className="flex-1 flex flex-col overflow-hidden">
				<header className="bg-white border-b px-6 py-4 flex items-center justify-between">
					<div>
						<h1 className="text-xl font-semibold text-gray-900">{title}</h1>
						<p className="mt-0.5 text-sm text-gray-500">{statusMessages[base] || "Default welcome message"}</p>
					</div>
					<div className="flex items-center gap-6">
						<div className="relative">
							<button className="text-gray-500 hover:text-gray-700">
								<span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
									1
								</span>
								🔔
							</button>
						</div>
						<span className="text-sm text-gray-600">{dateStr}</span>
					</div>
				</header>

				{/* Main content */}
				<main className="flex-1 p-6 overflow-y-auto min-h-0">{children}</main>
			</div>
		</div>
	);
}
