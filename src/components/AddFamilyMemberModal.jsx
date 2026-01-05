"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";

export default function AddFamilyMemberModal({ open, onClose }) {
  const [relationship, setRelationship] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});

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
    if (!relationship) errs.relationship = "Relationship is required";
    if (!fullName.trim()) errs.fullName = "Full name is required";
    if (!dob) errs.dob = "Date of birth is required";
    if (!gender) errs.gender = "Gender is required";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onClose && onClose();
  };

  const handleCancel = () => {
    setRelationship("");
    setFullName("");
    setDob(null);
    setGender("");
    setErrors({});
    onClose && onClose();
  };
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-blue-100/70 flex items-start justify-center p-6 z-50 overflow-y-auto mb-0">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Add Family Member</h3>
          <p className="text-sm text-gray-500 mt-1">Family member details require HR verification.</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Relationship *</label>
            <select
              value={relationship}
              onChange={(e) => {
                const val = e.target.value;
                setRelationship(val);
                if (val) clearError("relationship");
              }}
              aria-invalid={!!errors.relationship}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none appearance-none bg-white text-gray-900 ${
                errors.relationship ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
            >
              <option value="">Select Relationship</option>
              <option>Spouse</option>
              <option>Child</option>
              <option>Father</option>
              <option>Mother</option>
            </select>
            {errors.relationship && (
              <p className="mt-1 text-xs text-red-600">{errors.relationship}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                const val = e.target.value;
                setFullName(val);
                if (val.trim()) clearError("fullName");
              }}
              placeholder="Full name"
              aria-invalid={!!errors.fullName}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none bg-white text-gray-900 ${
                errors.fullName ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth *</label>
              <div className="relative w-full">
                <DatePicker
                  selected={dob}
                  onChange={(d) => {
                    setDob(d);
                    if (d) clearError("dob");
                  }}
                  onKeyDown={(e) => e.preventDefault()}
                  onChangeRaw={(e) => e.preventDefault()}
                  placeholderText="Select date of birth"
                  dateFormat="MMM d, yyyy"
                  wrapperClassName="w-full"
                  className={`w-full pr-10 px-4 py-3 border rounded-lg focus:ring-2 outline-none bg-white text-gray-900 ${
                    errors.dob ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  popperClassName="z-60"
                />
                <i className="fas fa-calendar absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
              </div>
              {errors.dob && (
                <p className="mt-1 text-xs text-red-600">{errors.dob}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender *</label>
              <select
                value={gender}
                onChange={(e) => {
                  const val = e.target.value;
                  setGender(val);
                  if (val) clearError("gender");
                }}
                aria-invalid={!!errors.gender}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none appearance-none bg-white text-gray-900 ${
                  errors.gender ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-xs text-red-600">{errors.gender}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">NIC / Birth Certificate No.</label>
            <input
              type="text"
              placeholder="NIC / Birth Certificate No."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-900"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="medical"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="medical" className="ml-2 text-sm text-gray-700">Entitled for medical</label>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-200 flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-colors shadow-md cursor-pointer"
          >
            Submit for Review
          </button>
        </div>
      </div>
    </div>
  );
}
