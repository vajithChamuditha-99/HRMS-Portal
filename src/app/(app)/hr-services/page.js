"use client";

import { useState, useEffect } from "react";
import HrInquiryModal from "@/components/HrInquiryModal";
import TicketDetailsModal from "@/components/TicketDetailsModal";

export default function HrServicesPage() {
  useEffect(() => {
    document.title = "HR Services | HRMS Portal";
  }, []);

  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // New state for viewing ticket details
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const services = [
    {
      icon: "heart",
      color: "bg-pink-100 text-pink-600",
      title: "Benefits & Insurance",
      desc: "Health, dental, life insurance queries",
    },
    {
      icon: "money-bill-wave",
      color: "bg-green-100 text-green-600",
      title: "Payroll & Compensation",
      desc: "Salary, tax, reimbursement queries",
    },
    {
      icon: "file-alt",
      color: "bg-purple-100 text-purple-600",
      title: "Documents & Letters",
      desc: "Employment letters, certificates",
    },
    {
      icon: "book",
      color: "bg-yellow-100 text-yellow-600",
      title: "Policies & Guidelines",
      desc: "Company policy clarifications",
    },
    {
      icon: "shield-alt",
      color: "bg-red-100 text-red-600",
      title: "Workplace Concerns",
      desc: "Report concerns or issues",
    },
    {
      icon: "question-circle",
      color: "bg-blue-100 text-blue-600",
      title: "General Inquiry",
      desc: "Other HR-related questions",
    },
  ];

  // Sample ticket data – added one resolved ticket
  const tickets = [
    {
      id: "REQ0004",
      type: "HR Inquiry",
      category: "Benefits & Insurance",
      subject: "Health Insurance Query",
      created: "Feb 12, 2024 at 10:00 AM",
      status: "Submitted",
      details: "Inquiry about family coverage under current plan.",
      hrResponse: null,
      attachment: null,
    },
    {
      id: "REQ0005",
      type: "HR Inquiry",
      category: "Payroll & Compensation",
      subject: "Tax Deduction Clarification",
      created: "Jan 15, 2024",
      status: "In Progress",
      details: "Question regarding TDS deduction for last quarter.",
      hrResponse: null,
      attachment: null,
    },
    {
      id: "REQ0003",
      type: "HR Inquiry",
      category: "Workplace Concerns",
      subject: "Workplace Harassment Report",
      created: "Dec 20, 2023",
      status: "Resolved",
      details: "Reported an incident with a colleague.",
      hrResponse: "Your concern has been reviewed. Appropriate action has been taken as per company policy. Confidential counseling sessions are available if needed. Thank you for bringing this to our attention.",
      attachment: "Investigation Summary.pdf",
    },
  ];

  const openInquiryModal = (service) => {
    setSelectedService(service.title);
    setIsInquiryModalOpen(true);
  };

  const openTicketDetails = (ticket) => {
    setSelectedTicket(ticket);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="space-y-8">

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => openInquiryModal(service)}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${service.color} text-2xl`}
              >
                <i className={`fas fa-${service.icon}`}></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600">{service.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* My HR Tickets */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">My HR Tickets</h2>
        </div>

        <div className="p-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => openTicketDetails(ticket)}
              className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <i className="fas fa-heart text-xl"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {ticket.subject}
                  </p>
                  <p className="text-xs text-gray-500">
                    {ticket.category} • Created {ticket.created}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    ticket.status === "Submitted"
                      ? "bg-blue-100 text-blue-800"
                      : ticket.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {ticket.status}
                </span>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Raise Inquiry Modal */}
      <HrInquiryModal
        open={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        serviceTitle={selectedService}
      />

      {/* Request Details Modal */}
      <TicketDetailsModal
        open={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        ticket={selectedTicket}
      />
    </div>
  );
}