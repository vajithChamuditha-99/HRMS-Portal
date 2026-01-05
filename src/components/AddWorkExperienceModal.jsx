"use client";

import { useState, useRef } from "react";
import DatePicker from "react-datepicker";

export default function AddWorkExperienceModal({ open, onClose, onSave }) {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [type, setType] = useState("Full-time");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const [serviceLetter, setServiceLetter] = useState([]);
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
    if (!jobTitle.trim()) errs.jobTitle = "Job title is required";
    if (!company.trim()) errs.company = "Company name is required";
    if (!startDate) errs.startDate = "Start date is required";
    if (!currentlyWorking && !endDate) errs.endDate = "End date is required";
    if (startDate && endDate && endDate < startDate) errs.endDate = "End date cannot be before start date";
    if (!type) errs.type = "Employment type is required";
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

    const exp = {
      jobTitle: jobTitle.trim(),
      company: company.trim(),
      location: location.trim() || "",
      startDate: formatDate(startDate) || "",
      endDate: currentlyWorking ? "" : formatDate(endDate) || "",
      currentlyWorking,
      type,
      description: description.trim(),
      status: "Pending Verification",
      serviceLetter: serviceLetter.map((f) => ({ name: f.name, size: f.size })),
    };

    onSave && onSave(exp);
    onClose && onClose();
  };

  const handleCancel = () => {
    setJobTitle("");
    setCompany("");
    setLocation("");
    setStartDate(null);
    setEndDate(null);
    setCurrentlyWorking(false);
    setType("Full-time");
    setDescription("");
    setErrors({});
    setServiceLetter([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClose && onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-blue-100/70 flex items-start justify-center p-6 z-50 overflow-y-auto mb-0">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full">
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <i className="fas fa-briefcase text-blue-600"></i>
            Add Work Experience
          </h3>
          <button onClick={onClose} aria-label="Close" className="cursor-pointer">
            <i className="fas fa-times text-gray-500 hover:text-gray-700"></i>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 flex items-start gap-2">
            <i className="fas fa-info-circle mt-0.5"></i>
            <p>Work experience entries require HR verification.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Title *</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => { const v = e.target.value; setJobTitle(v); if (v.trim()) clearError("jobTitle"); }}
              placeholder="e.g., Software Developer"
              aria-invalid={!!errors.jobTitle}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none ${errors.jobTitle ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
            />
            {errors.jobTitle && <p className="mt-1 text-xs text-red-600">{errors.jobTitle}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name *</label>
            <input
              type="text"
              value={company}
              onChange={(e) => { const v = e.target.value; setCompany(v); if (v.trim()) clearError("company"); }}
              placeholder="e.g., ABC Technologies"
              aria-invalid={!!errors.company}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none ${errors.company ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
            />
            {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Colombo, Sri Lanka"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date *</label>
              <div className="relative w-full">
                <DatePicker
                  selected={startDate}
                  onChange={(d) => { setStartDate(d); if (d) clearError("startDate"); }}
                  onKeyDown={(e) => e.preventDefault()}
                  onChangeRaw={(e) => e.preventDefault()}
                  placeholderText="Select start date"
                  dateFormat="MMM d, yyyy"
                  wrapperClassName="w-full"
                  className={`w-full pr-10 px-4 py-3 border rounded-lg focus:ring-2 outline-none bg-white text-gray-900 ${errors.startDate ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                  popperClassName="z-60"
                />
                <i className="fas fa-calendar absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
              </div>
              {errors.startDate && <p className="mt-1 text-xs text-red-600">{errors.startDate}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date{currentlyWorking ? "" : " *"}</label>
              <div className="relative w-full">
                <DatePicker
                  selected={endDate}
                  onChange={(d) => { setEndDate(d); if (d) clearError("endDate"); }}
                  onKeyDown={(e) => e.preventDefault()}
                  onChangeRaw={(e) => e.preventDefault()}
                  placeholderText={currentlyWorking ? "Present" : "Select end date"}
                  dateFormat="MMM d, yyyy"
                  wrapperClassName="w-full"
                  disabled={currentlyWorking}
                  className={`w-full pr-10 px-4 py-3 border rounded-lg focus:ring-2 outline-none bg-white text-gray-900 ${errors.endDate ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                  popperClassName="z-60"
                />
                <i className="fas fa-calendar absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
              </div>
              {errors.endDate && <p className="mt-1 text-xs text-red-600">{errors.endDate}</p>}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="currently-working"
              checked={currentlyWorking}
              onChange={(e) => { setCurrentlyWorking(e.target.checked); if (e.target.checked) clearError("endDate"); }}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="currently-working" className="ml-2 text-sm text-gray-700">I currently work here</label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Employment Type *</label>
            <select
              value={type}
              onChange={(e) => { const v = e.target.value; setType(v); if (v) clearError("type"); }}
              aria-invalid={!!errors.type}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none ${errors.type ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
            {errors.type && <p className="mt-1 text-xs text-red-600">{errors.type}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe responsibilities and achievements..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Letter (Optional)</label>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx"
              onChange={(e) => {
                const selected = Array.from(e.target.files || []);
                if (selected.length === 0) return;
                setServiceLetter((prev) => [...prev, ...selected]);
                e.target.value = "";
              }}
              className="hidden"
            />
            {serviceLetter.length === 0 && (
              <div
                className="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer bg-gray-50 border-gray-300 hover:border-blue-400"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); try { e.dataTransfer.dropEffect = "copy"; } catch {} }}
                onDrop={(e) => { e.preventDefault(); e.stopPropagation(); const dropped = extractFilesFromDataTransfer(e.dataTransfer); if (dropped && dropped.length > 0) { setServiceLetter((prev) => [...prev, ...dropped]); } }}
              >
                <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 mt-1">PDF, DOC, JPG, PNG (Max 10MB)</p>
              </div>
            )}
            {serviceLetter.length > 0 && (
              <div>
                <ul className="mt-2 space-y-1">
                  {serviceLetter.map((f, idx) => (
                    <li key={idx} className="text-xs text-gray-700 flex items-center justify-between">
                      <span className="truncate">{f.name} ({Math.round(f.size / 1024)} KB)</span>
                      <button type="button" aria-label={`Remove ${f.name}`} onClick={() => setServiceLetter((prev) => prev.filter((_, i) => i !== idx))} className="ml-3 text-red-600 hover:text-red-700">
                        <i className="fas fa-trash"></i>
                      </button>
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={() => fileInputRef.current?.click()} className="mt-2 inline-flex items-center gap-2 text-sm px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:border-blue-500">
                  <i className="fas fa-plus"></i>
                  Add more
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-5 border-t border-gray-200 flex justify-end gap-4">
          <button onClick={handleCancel} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors cursor-pointer">Cancel</button>
          <button onClick={handleSubmit} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-colors shadow-md cursor-pointer">Submit for Review</button>
        </div>
      </div>
    </div>
  );
}
