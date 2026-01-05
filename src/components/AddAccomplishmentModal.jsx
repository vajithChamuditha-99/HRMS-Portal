"use client";

import { useState, useRef } from "react";
import DatePicker from "react-datepicker";

export default function AddAccomplishmentModal({ open, onClose, onSave }) {
	const [type, setType] = useState("");
	const [title, setTitle] = useState("");
	const [issuer, setIssuer] = useState("");
	const [issueDate, setIssueDate] = useState(null);
	const [expiryDate, setExpiryDate] = useState(null);
	const [credentialId, setCredentialId] = useState("");
	const [credentialUrl, setCredentialUrl] = useState("");
	const [description, setDescription] = useState("");
	const [errors, setErrors] = useState({});

	const [attachments, setAttachments] = useState([]);
	const fileInputRef = useRef(null);

	const extractFilesFromDataTransfer = (dataTransfer) => {
		try {
			if (dataTransfer?.items && dataTransfer.items.length > 0) {
				const files = Array.from(dataTransfer.items)
					.map((item) => (item.kind === "file" ? item.getAsFile() : null))
					.filter(Boolean);
				if (files.length > 0) return files;
			}
			return Array.from(dataTransfer?.files || []);
		} catch {
			return Array.from(dataTransfer?.files || []);
		}
	};

	const clearError = (name) => {
		setErrors((prev) => {
			if (!prev[name]) return prev;
			const next = { ...prev };
			delete next[name];
			return next;
		});
	};

	const isValidUrl = (val) => {
		if (!val) return true;
		try {
			new URL(val);
			return true;
		} catch {
			return false;
		}
	};

	const validate = () => {
		const errs = {};
		if (!type) errs.type = "Type is required";
		if (!title.trim()) errs.title = "Title is required";
		if (!issueDate) errs.issueDate = "Issue date is required";
		if (expiryDate && issueDate && expiryDate < issueDate) errs.expiryDate = "Expiry cannot be before issue date";
		if (credentialUrl && !isValidUrl(credentialUrl)) errs.credentialUrl = "Enter a valid URL";
		return errs;
	};

	const formatDate = (d) => {
		try {
			return d ? d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" }) : "";
		} catch {
			return "";
		}
	};

	const handleSubmit = () => {
		const errs = validate();
		setErrors(errs);
		if (Object.keys(errs).length > 0) return;

		const accomplishment = {
			type,
			title: title.trim(),
			issuer: issuer.trim(),
			issuedDate: formatDate(issueDate) || "",
			expiresDate: formatDate(expiryDate) || "",
			credentialId: credentialId.trim(),
			credentialUrl: credentialUrl.trim(),
			description: description.trim(),
			status: "Pending Verification",
			attachments: attachments.map((f) => ({ name: f.name, size: f.size })),
		};

		onSave && onSave(accomplishment);
		handleCancel();
	};

	const handleCancel = () => {
		setType("");
		setTitle("");
		setIssuer("");
		setIssueDate(null);
		setExpiryDate(null);
		setCredentialId("");
		setCredentialUrl("");
		setDescription("");
		setErrors({});
		setAttachments([]);
		if (fileInputRef.current) fileInputRef.current.value = "";
		onClose && onClose();
	};

	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-blue-100/70 flex items-start justify-center p-6 z-50 overflow-y-auto mb-0">
			<div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full">
				{/* Header */}
				<div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
					<h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
						<i className="fas fa-trophy text-blue-600"></i>
						Add Accomplishment
					</h3>
					<button onClick={onClose} aria-label="Close" className="cursor-pointer">
						<i className="fas fa-times text-gray-500 hover:text-gray-700"></i>
					</button>
				</div>

				{/* Body */}
				<div className="p-6 space-y-6">
					<div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 flex items-start gap-2">
						<i className="fas fa-info-circle mt-0.5"></i>
						<p>New accomplishments require HR verification.</p>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">Type *</label>
						<select
							value={type}
							onChange={(e) => {
								const v = e.target.value;
								setType(v);
								if (v) clearError("type");
							}}
							aria-invalid={!!errors.type}
							className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none ${
								errors.type
									? "border-red-500 focus:ring-red-500 focus:border-red-500"
									: "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
							}`}>
							<option value="">Select Type</option>
							<option>Award</option>
							<option>Certification</option>
							<option>Recognition</option>
						</select>
						{errors.type && <p className="mt-1 text-xs text-red-600">{errors.type}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
						<input
							type="text"
							value={title}
							onChange={(e) => {
								const v = e.target.value;
								setTitle(v);
								if (v.trim()) clearError("title");
							}}
							placeholder="e.g., AWS Certified Developer"
							aria-invalid={!!errors.title}
							className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none ${
								errors.title
									? "border-red-500 focus:ring-red-500 focus:border-red-500"
									: "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
							}`}
						/>
						{errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">Issuing Organization</label>
						<input
							type="text"
							value={issuer}
							onChange={(e) => setIssuer(e.target.value)}
							placeholder="e.g., Amazon Web Services"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">Issue Date *</label>
							<div className="relative w-full">
								<DatePicker
									selected={issueDate}
									onChange={(d) => {
										setIssueDate(d);
										if (d) clearError("issueDate");
									}}
									onKeyDown={(e) => e.preventDefault()}
									onChangeRaw={(e) => e.preventDefault()}
									placeholderText="Select issue date"
									dateFormat="MMM d, yyyy"
									wrapperClassName="w-full"
									className={`w-full pr-10 px-4 py-3 border rounded-lg focus:ring-2 outline-none bg-white text-gray-900 ${
										errors.issueDate
											? "border-red-500 focus:ring-red-500 focus:border-red-500"
											: "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
									}`}
									popperClassName="z-60"
								/>
								<i className="fas fa-calendar absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
							</div>
							{errors.issueDate && <p className="mt-1 text-xs text-red-600">{errors.issueDate}</p>}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry Date</label>
							<div className="relative w-full">
								<DatePicker
									selected={expiryDate}
									onChange={(d) => {
										setExpiryDate(d);
										if (d) clearError("expiryDate");
									}}
									onKeyDown={(e) => e.preventDefault()}
									onChangeRaw={(e) => e.preventDefault()}
									placeholderText={"Select expiry date"}
									dateFormat="MMM d, yyyy"
									wrapperClassName="w-full"
									className={`w-full pr-10 px-4 py-3 border rounded-lg focus:ring-2 outline-none bg-white text-gray-900 ${
										errors.expiryDate
											? "border-red-500 focus:ring-red-500 focus:border-red-500"
											: "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
									}`}
									popperClassName="z-60"
								/>
								<i className="fas fa-calendar absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
							</div>
							{errors.expiryDate && <p className="mt-1 text-xs text-red-600">{errors.expiryDate}</p>}
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">Credential ID</label>
						<input
							type="text"
							value={credentialId}
							onChange={(e) => setCredentialId(e.target.value)}
							placeholder="e.g., ABC123XYZ"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">Credential URL</label>
						<input
							type="url"
							value={credentialUrl}
							onChange={(e) => {
								const v = e.target.value;
								setCredentialUrl(v);
								if (isValidUrl(v)) clearError("credentialUrl");
							}}
							placeholder="https://..."
							aria-invalid={!!errors.credentialUrl}
							className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none ${
								errors.credentialUrl
									? "border-red-500 focus:ring-red-500 focus:border-red-500"
									: "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
							}`}
						/>
						{errors.credentialUrl && <p className="mt-1 text-xs text-red-600">{errors.credentialUrl}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
						<textarea
							rows={4}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Brief description..."
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"></textarea>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">Upload Certificate (Optional)</label>
						{/* Hidden file input */}
						<input
							ref={fileInputRef}
							type="file"
							multiple
							accept="image/*,.pdf"
							onChange={(e) => {
								const selected = Array.from(e.target.files || []);
								if (selected.length === 0) return;
								setAttachments((prev) => [...prev, ...selected]);
								e.target.value = "";
							}}
							className="hidden"
						/>

						{attachments.length === 0 && (
							<div
								className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer bg-gray-50"
								onClick={() => fileInputRef.current?.click()}
								onDragOver={(e) => {
									e.preventDefault();
									e.stopPropagation();
									try {
										e.dataTransfer.dropEffect = "copy";
									} catch {}
								}}
								onDrop={(e) => {
									e.preventDefault();
									e.stopPropagation();
									const dropped = extractFilesFromDataTransfer(e.dataTransfer);
									if (dropped && dropped.length > 0) {
										setAttachments((prev) => [...prev, ...dropped]);
									}
								}}>
								<i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
								<p className="text-sm text-gray-600">Click to upload or drag and drop</p>
								<p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
							</div>
						)}

						{attachments.length > 0 && (
							<div>
								<ul className="mt-2 space-y-1">
									{attachments.map((f, idx) => (
										<li key={idx} className="text-xs text-gray-700 flex items-center justify-between">
											<span className="truncate">
												{f.name} ({Math.round(f.size / 1024)} KB)
											</span>
											<button
												type="button"
												aria-label={`Remove ${f.name}`}
												onClick={() => setAttachments((prev) => prev.filter((_, i) => i !== idx))}
												className="ml-3 text-red-600 hover:text-red-700">
												<i className="fas fa-trash"></i>
											</button>
										</li>
									))}
								</ul>
								<button
									type="button"
									onClick={() => fileInputRef.current?.click()}
									className="mt-2 inline-flex items-center gap-2 text-sm px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:border-blue-500">
									<i className="fas fa-plus"></i>
									Add more
								</button>
							</div>
						)}
					</div>
				</div>

				{/* Footer */}
				<div className="px-6 py-5 border-t border-gray-200 flex justify-end gap-4">
					<button
						onClick={handleCancel}
						className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors cursor-pointer">
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-colors shadow-md cursor-pointer">
						Submit for Review
					</button>
				</div>
			</div>
		</div>
	);
}
