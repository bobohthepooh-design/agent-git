// Approval workflow dashboard page
"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, User, Calendar, FileText, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { BackButton } from "@/components/BackButton";

export default function ApprovalsPage() {
  const [selectedFilter, setSelectedFilter] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");

  const handleApproval = async (approvalId: string, action: 'approve' | 'reject') => {
    try {
      // Call API to process approval
      const response = await fetch('/api/approvals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || 'mock-token'}`,
        },
        body: JSON.stringify({
          approvalId,
          action,
          comments: `${action}d by user`
        })
      });

      if (response.ok) {
        alert(`Document ${action}d successfully!`);
        // Refresh the page or update state
        window.location.reload();
      } else {
        alert('Failed to process approval');
      }
    } catch (error) {
      console.error('Approval error:', error);
      alert('Error processing approval');
    }
  };

  const mockApprovals = [
    {
      id: "1",
      documentTitle: "Q3 Financial Report",
      documentType: "PDF",
      department: "Finance",
      submittedBy: "John Doe",
      submittedDate: "2024-03-15",
      currentStep: "Manager Review",
      approver: "Jane Smith",
      dueDate: "2024-03-18",
      status: "pending",
      priority: "high"
    },
    {
      id: "2",
      documentTitle: "Employee Handbook Update",
      documentType: "DOCX",
      department: "HR",
      submittedBy: "Alice Johnson",
      submittedDate: "2024-03-14",
      currentStep: "Director Approval",
      approver: "Bob Wilson",
      dueDate: "2024-03-19",
      status: "pending",
      priority: "medium"
    },
    {
      id: "3",
      documentTitle: "Security Policy v2.0",
      documentType: "PDF",
      department: "IT",
      submittedBy: "Mike Brown",
      submittedDate: "2024-03-13",
      currentStep: "Completed",
      approver: "Sarah Davis",
      dueDate: "2024-03-16",
      status: "approved",
      priority: "high"
    },
    {
      id: "4",
      documentTitle: "Marketing Budget 2024",
      documentType: "XLSX",
      department: "Marketing",
      submittedBy: "Emma Wilson",
      submittedDate: "2024-03-12",
      currentStep: "Manager Review",
      approver: "Tom Harris",
      dueDate: "2024-03-15",
      status: "rejected",
      priority: "low"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredApprovals = mockApprovals.filter(approval => {
    const matchesFilter = selectedFilter === "all" || approval.status === selectedFilter;
    const matchesSearch = approval.documentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         approval.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <BackButton />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Approval Workflows</h1>
          <p className="text-gray-400">Review and approve documents pending your action</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: "Pending", value: "12", color: "bg-yellow-500", icon: Clock },
            { label: "Approved Today", value: "8", color: "bg-green-500", icon: CheckCircle },
            { label: "Rejected", value: "3", color: "bg-red-500", icon: XCircle },
            { label: "Overdue", value: "2", color: "bg-orange-500", icon: AlertTriangle }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search approvals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </motion.div>

        {/* Approvals Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Document
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Submitted By
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Current Step
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredApprovals.map((approval, index) => (
                  <motion.tr
                    key={approval.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(approval.priority)}`} />
                        <div>
                          <div className="text-sm font-medium text-white">{approval.documentTitle}</div>
                          <div className="text-xs text-gray-400">{approval.documentType} • {approval.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-300">{approval.submittedBy}</div>
                          <div className="text-xs text-gray-500">{approval.submittedDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300">{approval.currentStep}</div>
                      <div className="text-xs text-gray-500">{approval.approver}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{approval.dueDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(approval.status)}
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(approval.status)}`}>
                          {approval.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {approval.status === 'pending' && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleApproval(approval.id, 'approve')}
                              className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                            >
                              Approve
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleApproval(approval.id, 'reject')}
                              className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                            >
                              Reject
                            </motion.button>
                          </>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                        >
                          View
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
