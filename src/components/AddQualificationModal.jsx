"use client";

import { useState, useRef } from "react";

export default function AddQualificationModal({ open, onClose }) {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [institution, setInstitution] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [status, setStatus] = useState("");
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

  const validate = () => {
    const errs = {};
    const currentYear = new Date().getFullYear();
    const sy = parseInt(startYear, 10);
    const ey = endYear ? parseInt(endYear, 10) : null;

    if (!type) errs.type = "Qualification type is required";
    if (!title.trim()) errs.title = "Title is required";
    if (!institution.trim()) errs.institution = "Institution is required";
    if (!startYear) errs.startYear = "Start year is required";
    else if (isNaN(sy) || sy < 1900 || sy > currentYear) errs.startYear = `Enter a valid year (1900-${currentYear})`;
    if (!status) errs.status = "Status is required";
    if (endYear) {
      if (isNaN(ey) || ey < sy || ey > currentYear + 5) errs.endYear = `End year must be ≥ ${sy}`;
    }
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onClose && onClose();
  };

  const handleCancel = () => {
    setType("");
    setTitle("");
    setInstitution("");
    setStartYear("");
    setEndYear("");
    setStatus("");
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
            <i className="fas fa-graduation-cap text-blue-600"></i>
            Add Qualification
          </h3>
          <button onClick={onClose} aria-label="Close" className="cursor-pointer">
            <i className="fas fa-times text-gray-500 hover:text-gray-700"></i>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 flex items-start gap-2">
            <i className="fas fa-info-circle mt-0.5"></i>
            <p>New qualifications require HR verification before being displayed.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Qualification Type *</label>
            <select
              value={type}
              onChange={(e) => {
                const val = e.target.value;
                setType(val);
                if (val) clearError("type");
              }}
              aria-invalid={!!errors.type}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none ${
                errors.type ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
            >
              <option value="">Select Type</option>
              <option>Academic</option>
              <option>Professional Certification</option>
              <option>Other</option>
            </select>
            {errors.type && <p className="mt-1 text-xs text-red-600">{errors.type}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Title / Degree Name *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                const val = e.target.value;
                setTitle(val);
                if (val.trim()) clearError("title");
              }}
              placeholder="e.g., BSc Computer Science"
              aria-invalid={!!errors.title}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none ${
                errors.title ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Institution *</label>
            <input
              type="text"
              value={institution}
              onChange={(e) => {
                const val = e.target.value;
                setInstitution(val);
                if (val.trim()) clearError("institution");
              }}
              placeholder="e.g., University of Colombo"
              aria-invalid={!!errors.institution}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none ${
                errors.institution ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
            {errors.institution && <p className="mt-1 text-xs text-red-600">{errors.institution}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Year *</label>
              <input
                type="number"
                value={startYear}
                onChange={(e) => {
                  const val = e.target.value;
                  setStartYear(val);
                  if (val) clearError("startYear");
                }}
                placeholder="2020"
                aria-invalid={!!errors.startYear}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none ${
                  errors.startYear ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.startYear && <p className="mt-1 text-xs text-red-600">{errors.startYear}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">End Year</label>
              <input
                type="number"
                value={endYear}
                onChange={(e) => {
                  const val = e.target.value;
                  setEndYear(val);
                  if (val) clearError("endYear");
                }}
                placeholder="2024"
                aria-invalid={!!errors.endYear}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none ${
                  errors.endYear ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.endYear && <p className="mt-1 text-xs text-red-600">{errors.endYear}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Status *</label>
            <select
              value={status}
              onChange={(e) => {
                const val = e.target.value;
                setStatus(val);
                if (val) clearError("status");
              }}
              aria-invalid={!!errors.status}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none ${
                errors.status ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
            >
              <option value="">Select Status</option>
              <option>Completed</option>
              <option>Ongoing</option>
              <option>Pending</option>
            </select>
            {errors.status && <p className="mt-1 text-xs text-red-600">{errors.status}</p>}
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
                e.target.value = ""; // allow re-selecting same file
              }}
              className="hidden"
            />

            {/* Drop zone / trigger when no attachments */}
            {attachments.length === 0 && (
              <div
                className="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer bg-gray-50 border-gray-300 hover:border-blue-400"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  try { e.dataTransfer.dropEffect = "copy"; } catch {}
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const dropped = extractFilesFromDataTransfer(e.dataTransfer);
                  if (dropped && dropped.length > 0) {
                    setAttachments((prev) => [...prev, ...dropped]);
                  }
                }}
              >
                <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
              </div>
            )}

            {/* File list when attachments exist */}
            {attachments.length > 0 && (
              <div>
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

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 inline-flex items-center gap-2 text-sm px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:border-blue-500"
                >
                  <i className="fas fa-plus"></i>
                  Add more
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-200 flex justify-end gap-4">
          <button onClick={handleCancel} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors cursor-pointer">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-colors shadow-md cursor-pointer">
            Submit for Review
          </button>
        </div>
      </div>
    </div>
  );
}