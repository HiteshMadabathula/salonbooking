import React, { useState } from 'react';
import {
  Search,
  Filter,
  Calendar as CalendarIcon,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Edit3,
  IndianRupee,
  MoreVertical,
  User
} from 'lucide-react';

export default function AppointmentsTab({ appointments, onUpdateStatus, onDeleteAppointment, onOpenBookingModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [stylistFilter, setStylistFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  // Filter logic
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch =
      apt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.phone.includes(searchTerm) ||
      apt.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    const matchesStylist = stylistFilter === 'All' || apt.stylistName === stylistFilter;
    const matchesDate = dateFilter === 'All' || apt.date === dateFilter;

    return matchesSearch && matchesStatus && matchesStylist && matchesDate;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Completed</span>;
      case 'Confirmed':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200"><span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>Confirmed</span>;
      case 'Pending':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Pending</span>;
      case 'Cancelled':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-800 border border-rose-200"><span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>Cancelled</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in py-6">

      {/* Header & Quick Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-serif text-[#222220]">Appointments Management</h2>
          <p className="text-xs text-[#66635b]">Showing {filteredAppointments.length} of {appointments.length} total salon bookings</p>
        </div>
        <button
          onClick={onOpenBookingModal}
          className="px-4 py-2 bg-[#23362a] hover:bg-[#2c4737] text-white text-xs uppercase tracking-wider font-medium rounded shadow transition-all"
        >
          + New Appointment
        </button>
      </div>

      {/* Search & Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-[#e2dfd5] shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#66635b]" />
          <input
            type="text"
            placeholder="Search client, phone, service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#f9f8f4] border border-[#e2dfd5] rounded-md text-xs text-[#222220] focus:outline-none focus:border-[#23362a]"
          />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#f9f8f4] border border-[#e2dfd5] rounded-md text-xs text-[#222220] focus:outline-none focus:border-[#23362a]"
          >
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Stylist Filter */}
        <div>
          <select
            value={stylistFilter}
            onChange={(e) => setStylistFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#f9f8f4] border border-[#e2dfd5] rounded-md text-xs text-[#222220] focus:outline-none focus:border-[#23362a]"
          >
            <option value="All">All Stylists</option>
            <option value="Bhargav">Bhargav</option>
            <option value="Priya Nair">Priya Nair</option>
            <option value="Rohan Mehta">Rohan Mehta</option>
            <option value="Ananya Sen">Ananya Sen</option>
          </select>
        </div>

        {/* Date Filter */}
        <div>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#f9f8f4] border border-[#e2dfd5] rounded-md text-xs text-[#222220] focus:outline-none focus:border-[#23362a]"
          >
            <option value="All">All Dates</option>
            <option value="2026-10-24">Today (24 Oct 2026)</option>
            <option value="2026-10-25">Tomorrow (25 Oct 2026)</option>
          </select>
        </div>

      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl border border-[#e2dfd5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9f8f4] border-b border-[#e2dfd5] text-[11px] uppercase tracking-wider text-[#66635b]">
                <th className="py-3.5 px-4 font-semibold">Customer</th>
                <th className="py-3.5 px-4 font-semibold">Service</th>
                <th className="py-3.5 px-4 font-semibold">Stylist</th>
                <th className="py-3.5 px-4 font-semibold">Date & Time</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Price</th>
                <th className="py-3.5 px-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2dfd5] text-xs">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-[#66635b]">
                    No appointments found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-[#f9f8f4]/60 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-medium text-[#222220]">{apt.customerName}</div>
                      <div className="text-[11px] text-[#66635b]">{apt.phone}</div>
                    </td>
                    <td className="py-4 px-4 font-medium text-[#222220]">{apt.service}</td>
                    <td className="py-4 px-4 text-[#66635b]">{apt.stylistName}</td>
                    <td className="py-4 px-4 text-[#66635b]">
                      <div>{apt.date}</div>
                      <div className="text-[11px] font-mono text-[#23362a]">{apt.time}</div>
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(apt.status)}</td>
                    <td className="py-4 px-4 text-right font-mono font-medium text-[#222220]">
                      ₹{apt.price.toLocaleString('en-IN')}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {apt.status !== 'Completed' && (
                          <button
                            onClick={() => onUpdateStatus(apt.id, 'Completed')}
                            title="Mark Completed"
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded transition-all"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {apt.status !== 'Cancelled' && (
                          <button
                            onClick={() => onUpdateStatus(apt.id, 'Cancelled')}
                            title="Cancel Appointment"
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded transition-all"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => onDeleteAppointment(apt.id)}
                          title="Delete"
                          className="p-1.5 bg-gray-50 hover:bg-gray-200 text-gray-600 rounded transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
