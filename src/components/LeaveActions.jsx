"use client";

import { useState } from "react";
import ApplyLeaveModal from "@/components/ApplyLeaveModal";

export default function LeaveActions({ leaveTypes }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-opacity"
          style={{ background: "linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)" }}
        >
          <i className="fas fa-plus text-lg"></i>
          Apply Leave
        </button>

        <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors">
          <i className="fas fa-clock text-lg"></i>
          Short Leave
        </button>
      </div>

      <ApplyLeaveModal open={isModalOpen} onClose={() => setIsModalOpen(false)} leaveTypes={leaveTypes} />
    </>
  );
}
