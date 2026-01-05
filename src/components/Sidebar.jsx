// components/Sidebar.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
	{ id: "dashboard", icon: "home", label: "Dashboard" },
	{ id: "leave", icon: "calendar-alt", label: "Leave Management" },
	{ id: "profile", icon: "user", label: "My Profile" },
	{ id: "requests", icon: "clipboard-list", label: "My Requests" },
	{ id: "payslips", icon: "file-invoice-dollar", label: "Salary Slips" },
];

export default function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
			{/* Logo */}
			<div className="px-6 pt-6 pb-5 shrink-0">
				<div className="flex items-center gap-3">
					<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xl shadow-sm">
						H
					</div>
					<div>
						<h2 className="text-xl font-bold text-gray-900">HRMS</h2>
						<p className="text-xs text-gray-500 mt-0.5">v1.0 MVP</p>
					</div>
				</div>
			</div>

			{/* Navigation */}
			<nav className="flex-1 px-3 py-4 overflow-y-auto min-h-0">
				<ul className="space-y-0.5">
					{navItems.map((item) => {
						const isActive = pathname === `/${item.id}` || pathname.startsWith(`/${item.id}/`);

						return (
							<li key={item.id}>
								<Link
									href={`/${item.id}`}
									className={`sidebar-link flex items-center gap-3 px-5 py-3 rounded-lg text-[15px] font-medium transition-colors mb-2 ${
										isActive ? "active" : "text-gray-700 hover:bg-gray-50"
									}`}>
									<i className={`fas fa-${item.icon} w-5 text-center text-base opacity-90`}></i>
									{item.label}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>

			<div className="p-4 border-t border-gray-100 shrink-0">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
							JD
						</div>
						<div>
							<p className="text-sm font-semibold text-gray-900">John Doe</p>
							<p className="text-xs text-gray-500">Software Engineer</p>
						</div>
					</div>

					<div className="flex items-center gap-4">
						<button title="Logout" className="text-gray-500 hover:text-red-600 transition-colors">
							<i className="fas fa-sign-out-alt text-lg"></i>
						</button>
					</div>
				</div>
			</div>
		</aside>
	);
}
