"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();
	useEffect(() => {
		document.title = "Login | HRMS Portal";
	}, []);
	const [empId, setEmpId] = useState("EMP001");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("Employee");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (role === "Employee") {
			router.push("/dashboard");
			return;
		}
		alert("Demo only supports Employee role right now.");
	};

	return (
		<div className="min-h-screen w-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
			<main className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
				<div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-600 text-white">
					<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="12" cy="8" r="4" fill="currentColor" />
						<path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20V21H4V20Z" fill="currentColor" />
					</svg>
				</div>

				<div className="text-center">
					<h1 className="text-2xl font-semibold text-gray-900">Welcome to HRMS Portal</h1>
					<p className="mt-2 text-sm text-gray-500">Please sign in to your account to continue</p>
				</div>

				<form onSubmit={handleSubmit} className="mt-6 w-full space-y-6">
					<div className="space-y-1.5">
						<label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">Employee ID</label>
						<input
							type="text"
							value={empId}
							onChange={(e) => setEmpId(e.target.value)}
							placeholder="EMP001"
							className="w-full rounded-lg border border-gray-300 bg-gray-50/70 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
						/>
					</div>

					<div className="space-y-1.5">
						<label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••"
							className="w-full rounded-lg border border-gray-300 bg-gray-50/70 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
						/>
					</div>

					<div className="space-y-1.5">
						<label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">Login As (Demo)</label>
						<select
							value={role}
							onChange={(e) => setRole(e.target.value)}
							className="w-full appearance-none rounded-lg border border-gray-300 bg-gray-50/70 px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition">
							<option>Employee</option>
							<option>Manager</option>
							<option>HR Admin</option>
						</select>
					</div>

					<button
						type="submit"
						className="mt-2 w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3.5 text-sm font-medium text-white shadow-md transition hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300">
						Sign In
					</button>
				</form>

				<div className="mt-6 w-full rounded-md border border-amber-200 bg-amber-50/90 px-6 py-4 text-center text-sm text-amber-800">
					<span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[11px] font-bold text-white ring-1 ring-amber-400/50 mr-2">
						!
					</span>
					<strong>Demo Mode:</strong> Select any role to explore the system
				</div>
			</main>
		</div>
	);
}
