"use client";

import { useRef, useState } from "react";

export default function HrInquiryModal({ open, onClose, serviceTitle }) {
	const [subject, setSubject] = useState("");
	const [priority, setPriority] = useState("");
	const [message, setMessage] = useState("");
	const [attachments, setAttachments] = useState([]);
	const fileInputRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);
	const dragCounterRef = useRef(0);

	const addFiles = (fileList) => {
		const incoming = Array.from(fileList || []);
		if (incoming.length === 0) return;
		setAttachments((prev) => [...prev, ...incoming]);
	};

	if (!open) return null;

	const handleCancel = () => {
		setSubject("");
		setPriority("");
		setMessage("");
		setAttachments([]);
		if (fileInputRef.current) fileInputRef.current.value = "";
		onClose && onClose();
	};

	return (
		<div className="fixed inset-0 bg-blue-100/70 flex items-start justify-center p-6 z-50 overflow-y-auto mb-0">
			<div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full">
				{/* Header */}
				<div className="p-6 border-b border-gray-200">
					<h3 className="text-xl font-semibold text-gray-900">Raise HR Inquiry - {serviceTitle || "General"}</h3>
				</div>

				{/* Body */}
				<div className="p-6 space-y-6">
					{/* Subject */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
						<input
							type="text"
							placeholder="Brief subject line"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-900 placeholder:text-gray-500"
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
						/>
					</div>

					{/* Priority */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">Priority</label>
						<div className="relative">
							<select
								value={priority}
								onChange={(e) => setPriority(e.target.value)}
								className="w-full pr-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white text-gray-900"
							>
								<option value="" disabled>
									Select priority
								</option>
								<option value="high">High</option>
								<option value="medium">Medium</option>
								<option value="low">Low</option>
							</select>
							<i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
						</div>
					</div>

					{/* Message */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
						<textarea
							rows={4}
							placeholder="Describe your inquiry in detail"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none bg-white text-gray-900 placeholder:text-gray-500"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						></textarea>
					</div>

					{/* Upload Document */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">Upload Documents (optional)</label>
						<div
							className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
								isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:border-blue-400"
							}`}
							onDragEnter={(e) => {
								e.preventDefault();
								e.stopPropagation();
								dragCounterRef.current += 1;
								setIsDragging(true);
							}}
							onDragOver={(e) => {
								e.preventDefault();
								e.stopPropagation();
							}}
							onDragLeave={(e) => {
								e.preventDefault();
								e.stopPropagation();
								dragCounterRef.current -= 1;
								if (dragCounterRef.current <= 0) setIsDragging(false);
							}}
							onDrop={(e) => {
								e.preventDefault();
								e.stopPropagation();
								dragCounterRef.current = 0;
								setIsDragging(false);
								addFiles(e.dataTransfer?.files);
							}}
						>
							<input
								ref={fileInputRef}
								type="file"
								id="hr-file-upload"
								className="hidden"
								multiple
								accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
								onChange={(e) => {
									addFiles(e.target.files);
									// Allow selecting the same file again
									e.target.value = "";
								}}
							/>
							<label htmlFor="hr-file-upload" className="cursor-pointer">
								<i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
								<p className="text-sm text-gray-600">
									Drag & drop or <span className="text-blue-600 font-medium">browse</span>
								</p>
								<p className="text-xs text-gray-500 mt-1">PDF, DOCX, JPG up to 5MB</p>
							</label>
						</div>
						{attachments.length > 0 && (
							<ul className="mt-2 space-y-1">
								{attachments.map((f, idx) => (
									<li key={idx} className="text-xs text-gray-700 flex items-center justify-between">
										<span className="truncate">{f.name} ({Math.round(f.size / 1024)} KB)</span>
										<button
											type="button"
											aria-label={`Remove ${f.name}`}
											onClick={() => setAttachments((prev) => prev.filter((_, i) => i !== idx))}
											className="ml-3 text-red-600 hover:text-red-700"
										>
											<i className="fas fa-trash"></i>
										</button>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>

				{/* Footer */}
				<div className="p-6 border-t border-gray-200 flex justify-end gap-4">
					<button
						onClick={handleCancel}
						className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
					>
						Cancel
					</button>

					<button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-colors shadow-md">
						Submit Inquiry
					</button>
				</div>
			</div>
		</div>
	);
}
