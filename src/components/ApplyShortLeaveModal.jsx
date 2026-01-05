"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";

export default function ApplyShortLeaveModal({ open, onClose }) {
	const [date, setDate] = useState(null);
	const [inOut, setInOut] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [reason, setReason] = useState("");

	if (!open) return null;

	const handleCancel = () => {
		setDate(null);
		setInOut("");
		setStartTime("");
		setEndTime("");
		setReason("");
		onClose && onClose();
	};

	return (
		<div className="fixed inset-0 bg-blue-100/70 flex items-start justify-center p-6 z-50 overflow-y-auto mb-0">
			<div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full">
				{/* Header */}
				<div className="px-6 py-5 border-b border-gray-200">
					<h3 className="text-xl font-semibold text-gray-900">Apply for Short Leave</h3>
				</div>

				{/* Body */}
				<div className="p-6 space-y-6">
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col">
							<label className="text-sm font-medium text-gray-700 mb-1">Date</label>
							<div className="relative w-full">
								<DatePicker
									selected={date}
									onChange={(d) => setDate(d)}
									onKeyDown={(e) => e.preventDefault()}
									onChangeRaw={(e) => e.preventDefault()}
									placeholderText="Select date"
									dateFormat="MMM d, yyyy"
									wrapperClassName="w-full"
									className="w-full pr-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-900"
									popperClassName="z-60"
								/>
								<i className="fas fa-calendar absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
							</div>
						</div>
						<div className="flex flex-col">
							<label className="text-sm font-medium text-gray-700 mb-1 invisible">In/Out</label>
							<div className="relative">
								<select
									value={inOut}
									onChange={(e) => setInOut(e.target.value)}
									className="w-full pr-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white text-gray-900">
									<option value="" disabled>
										Select In/ Out
									</option>
									<option value="in">In</option>
									<option value="out">Out</option>
								</select>
								<i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
							</div>
						</div>
					</div>

					{/* Start & End Time */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">Start Time</label>
							<input
								type="time"
								step="900"
								placeholder="--:-- --"
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-900 placeholder:text-gray-400"
								value={startTime}
								onChange={(e) => setStartTime(e.target.value)}
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">End Time</label>
							<input
								type="time"
								step="900"
								placeholder="--:-- --"
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-900 placeholder:text-gray-400"
								value={endTime}
								onChange={(e) => setEndTime(e.target.value)}
							/>
						</div>
					</div>

					{/* Reason */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">Reason</label>
						<textarea
							rows={4}
							placeholder="Reason for short leave"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none bg-white text-gray-900 placeholder:text-gray-400"
							value={reason}
							onChange={(e) => setReason(e.target.value)}
						></textarea>
					</div>
				</div>

				{/* Footer */}
				<div className="px-6 py-5 border-t border-gray-200 flex justify-end gap-4">
					<button
						onClick={handleCancel}
						className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors">
						Cancel
					</button>
					<button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-colors shadow-md">
						Submit Request
					</button>
				</div>
			</div>
		</div>
	);
}
