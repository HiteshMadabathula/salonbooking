import React, { useState } from 'react';
import { INITIAL_APPOINTMENTS, INITIAL_WAITLIST, INITIAL_REMINDERS } from './mockData';
import Navbar from './components/Navbar';
import OverviewTab from './components/OverviewTab';
import AppointmentsTab from './components/AppointmentsTab';
import ScheduleTab from './components/ScheduleTab';
import WaitlistTab from './components/WaitlistTab';
import RemindersTab from './components/RemindersTab';
import BookingModal from './components/BookingModal';
import Toast from './components/Toast';

export default function App() {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [waitlist, setWaitlist] = useState(INITIAL_WAITLIST);
  const [reminders, setReminders] = useState(INITIAL_REMINDERS);
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Handlers
  const handleAddAppointment = (newApt) => {
    setAppointments([newApt, ...appointments]);
    // Also add to reminders queue
    const newRem = {
      id: 'rem-' + Date.now(),
      customerName: newApt.customerName,
      phone: newApt.phone,
      service: newApt.service,
      stylistName: newApt.stylistName,
      dateTime: `${newApt.date === '2026-10-24' ? 'Today' : 'Tomorrow'}, ${newApt.time}`,
      channel: 'WhatsApp (Simulated)',
      status: 'Pending Dispatch',
      template: `Hi ${newApt.customerName}, looking forward to your ${newApt.service} with ${newApt.stylistName} at ${newApt.time}. Please reply C to confirm your slot at Hair by Bhargav.`,
    };
    setReminders([newRem, ...reminders]);
    setToastMessage(`Successfully booked appointment for ${newApt.customerName} (₹${newApt.price})`);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setAppointments(appointments.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status: newStatus,
          cancellationReason: newStatus === 'Cancelled' ? 'Cancelled by reception desk' : a.cancellationReason
        };
      }
      return a;
    }));
    setToastMessage(`Appointment status updated to ${newStatus}`);
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter(a => a.id !== id));
    setToastMessage('Appointment removed from system');
  };

  const handleAddToWaitlist = (newItem) => {
    setWaitlist([newItem, ...waitlist]);
    setToastMessage(`Added ${newItem.customerName} to waitlist queue`);
  };

  const handleNotifyWaitlist = (id) => {
    setWaitlist(waitlist.map(w => w.id === id ? { ...w, status: 'Notified' } : w));
    setToastMessage('Simulated WhatsApp slot offer dispatched to client!');
  };

  const handleSimulateReminder = (rem) => {
    setToastMessage(`Simulated WhatsApp message sent successfully to ${rem.customerName} (${rem.phone})`);
  };

  return (
    <div className="min-h-screen bg-[#f9f8f4] text-[#222220] flex flex-col font-sans selection:bg-[#b5c79e] selection:text-[#23362a]">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBookingModal={() => setIsBookingModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {activeTab === 'overview' && (
          <OverviewTab
            appointments={appointments}
            waitlist={waitlist}
            reminders={reminders}
            setActiveTab={setActiveTab}
            onOpenBookingModal={() => setIsBookingModalOpen(true)}
          />
        )}

        {activeTab === 'appointments' && (
          <AppointmentsTab
            appointments={appointments}
            onUpdateStatus={handleUpdateStatus}
            onDeleteAppointment={handleDeleteAppointment}
            onOpenBookingModal={() => setIsBookingModalOpen(true)}
          />
        )}

        {activeTab === 'schedule' && (
          <ScheduleTab
            appointments={appointments}
            onOpenBookingModal={() => setIsBookingModalOpen(true)}
          />
        )}

        {activeTab === 'waitlist' && (
          <WaitlistTab
            waitlist={waitlist}
            onAddToWaitlist={handleAddToWaitlist}
            onNotifyWaitlist={handleNotifyWaitlist}
            onOpenBookingModal={() => setIsBookingModalOpen(true)}
          />
        )}

        {activeTab === 'reminders' && (
          <RemindersTab
            reminders={reminders}
            appointments={appointments}
            onSimulateReminder={handleSimulateReminder}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e2dfd5] bg-white py-6 text-center text-xs text-[#66635b]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif font-medium text-[#222220]">Hair by Bhargav</span>
            <span>— Advanced No-Show Reduction & Booking Desk Demo</span>
          </div>
          <div>All currency in INR (₹). Mock Data Demo.</div>
        </div>
      </footer>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <BookingModal
          onClose={() => setIsBookingModalOpen(false)}
          onAddAppointment={handleAddAppointment}
        />
      )}

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
