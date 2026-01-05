"use client";

import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";

export default function ApplyLeaveModal({ open, onClose, leaveTypes = [] }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [durationType, setDurationType] = useState("full"); // 'full' | 'half'
  const [halfDayPart, setHalfDayPart] = useState("first"); // 'first' | 'second'
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);
  const [leaveCode, setLeaveCode] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous || "";
    };
  }, [open]);

  const isSameDay = (a, b) => {
    if (!a || !b) return false;
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  };

  const halfEnabled = isSameDay(startDate, endDate);

  if (durationType === "half" && !halfEnabled) {
    setDurationType("full");
  }
  
  const handleCancel = () => {
    setStartDate(null);
    setEndDate(null);
    setDurationType("full");
    setHalfDayPart("first");
    setAttachments([]);
    setLeaveCode("");
    setReason("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClose && onClose();
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-blue-100/70 flex items-start justify-center p-6 z-50 overflow-y-auto mb-0">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full">
				
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Apply for Leave</h3>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Leave Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Leave Type</label>
            <div className="relative">
              <select value={leaveCode} onChange={(e) => setLeaveCode(e.target.value)} className="w-full pr-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white text-gray-900">
                <option value="" disabled>
                  Select a leave type
                </option>
                {leaveTypes.map((type) => (
                  <option key={type.code} value={type.code}>
                    {type.name} ({type.available} days available)
                  </option>
                ))}
              </select>
              <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
              <div className="relative">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    if (endDate && date && endDate < date) setEndDate(null);
                  }}
                  onKeyDown={(e) => e.preventDefault()}
                  onChangeRaw={(e) => e.preventDefault()}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select start date"
                  dateFormat="MMM d, yyyy"
                  className="w-full pr-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-900"
                  popperClassName="z-60"
                />
                <i className="fas fa-calendar absolute right-11 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
              <div className="relative">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  onKeyDown={(e) => e.preventDefault()}
                  onChangeRaw={(e) => e.preventDefault()}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="Select end date"
                  dateFormat="MMM d, yyyy"
                  className="w-full pr-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-900"
                  popperClassName="z-60"
                />
                <i className="fas fa-calendar absolute right-11 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
              </div>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration</label>
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center gap-2 text-gray-800">
                <input
                  type="radio"
                  name="duration"
                  value="full"
                  checked={durationType === "full"}
                  onChange={() => setDurationType("full")}
                  className="h-4 w-4 text-blue-600 border-gray-300"
                />
                Full Day
              </label>
              <label className="inline-flex items-center gap-2 text-gray-800">
                <input
                  type="radio"
                  name="duration"
                  value="half"
                  checked={durationType === "half"}
                  onChange={() => halfEnabled && setDurationType("half")}
                  disabled={!halfEnabled}
                  className="h-4 w-4 text-blue-600 border-gray-300 disabled:opacity-50"
                />
                Half Day
              </label>
            </div>
            {!halfEnabled && (
              <p className="mt-2 text-xs text-gray-600">Half day is available only when Start and End dates are the same.</p>
            )}
            {durationType === "half" && halfEnabled && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Half</label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-900"
                  value={halfDayPart}
                  onChange={(e) => setHalfDayPart(e.target.value)}
                >
                  <option value="first">First Half</option>
                  <option value="second">Second Half</option>
                </select>
              </div>
            )}
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Attachments (optional)</label>
            {/* Hidden file input always present; triggered by Browse link when empty */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={(e) => {
                const selected = Array.from(e.target.files || []);
                if (selected.length === 0) return;
                setAttachments((prev) => [...prev, ...selected]);
                // Reset input so the same file can be selected again if needed
                e.target.value = "";
              }}
              className="hidden"
            />

            {/* Show Browse as an input-styled button when no attachments */}
            {(!attachments || attachments.length === 0) && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:border-blue-500"
              >
                <span>Browse</span>
                <i className="fas fa-upload text-gray-500"></i>
              </button>
            )}

            {/* Show file names + delete when attachments exist; hide Browse */}
            {attachments?.length > 0 && (
              <ul className="mt-2 space-y-1">
                {attachments.map((f, idx) => (
                  <li key={idx} className="text-xs text-gray-700 flex items-center justify-between">
                    <span className="truncate">{f.name} ({Math.round(f.size / 1024)} KB)</span>
                    <button
                      type="button"
                      aria-label={`Remove ${f.name}`}
                      onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
                      className="ml-3 text-red-600 hover:text-red-700"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Allow adding more files when attachments exist */}
            {attachments?.length > 0 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 inline-flex items-center gap-2 text-sm px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:border-blue-500"
              >
                <i className="fas fa-plus"></i>
                Add more
              </button>
            )}
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Reason</label>
            <textarea
              rows={4}
              placeholder="Provide a reason for your leave request"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none bg-white text-gray-900 placeholder:text-gray-500"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
          >
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
