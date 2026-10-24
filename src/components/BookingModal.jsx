import React, { useState } from 'react';
import { SERVICES, STYLISTS } from '../mockData';
import { Calendar, Clock, IndianRupee, X } from 'lucide-react';

export default function BookingModal({ onClose, onAddAppointment }) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES[0].id);
  const [selectedStylistId, setSelectedStylistId] = useState(STYLISTS[0].id);
  const [date, setDate] = useState('2026-10-24');
  const [time, setTime] = useState('10:00 AM');
  const [price, setPrice] = useState(SERVICES[0].price);

  const handleServiceChange = (e) => {
    const sId = e.target.value;
    setSelectedServiceId(sId);
    const sObj = SERVICES.find(s => s.id === sId);
    if (sObj) {
      setPrice(sObj.price);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    const serviceObj = SERVICES.find(s => s.id === selectedServiceId);
    const stylistObj = STYLISTS.find(s => s.id === selectedStylistId);

    const newApt = {
      id: 'apt-' + Date.now(),
      customerName,
      phone,
      email: email || `${customerName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      service: serviceObj ? serviceObj.name : 'Haircut & Styling',
      stylistId: selectedStylistId,
      stylistName: stylistObj ? stylistObj.name : 'Bhargav',
      date,
      time,
      status: 'Confirmed',
      price: Number(price),
      reminderSent: true,
    };

    onAddAppointment(newApt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-xl w-full p-6 shadow-2xl border border-[#e2dfd5] animate-scale-up">

        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#e2dfd5]">
          <div>
            <h3 className="text-lg font-serif text-[#222220]">New Salon Appointment</h3>
            <p className="text-xs text-[#66635b]">Book appointment and queue simulated WhatsApp confirmation</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#66635b] hover:text-[#222220] rounded-full hover:bg-[#f9f8f4] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#66635b] mb-1">Customer Name *</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Natasha Wadia"
                className="w-full px-3 py-2 bg-[#f9f8f4] border border-[#e2dfd5] rounded-md text-xs text-[#222220] focus:outline-none focus:border-[#23362a]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#66635b] mb-1">Phone Number *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98123 44556"
                className="w-full px-3 py-2 bg-[#f9f8f4] border border-[#e2dfd5] rounded-md text-xs text-[#222220] focus:outline-none focus:border-[#23362a]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#66635b] mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="natasha.w@example.com"
              className="w-full px-3 py-2 bg-[#f9f8f4] border border-[#e2dfd5] rounded-md text-xs text-[#222220] focus:outline-none focus:border-[#23362a]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#66635b] mb-1">Service</label>
              <select
                value={selectedServiceId}
                onChange={handleServiceChange}
                className="w-full px-3 py-2 bg-[#f9f8f4] border border-[#e2dfd5] rounded-md text-xs text-[#222220] focus:outline-none focus:border-[#23362a]"
              >
                {SERVICES.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} (₹{s.price})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#66635b] mb-1">Assigned Stylist</label>
              <select
                value={selectedStylistId}
                onChange={(e) => setSelectedStylistId(e.target.value)}
                className="w-full px-3 py-2 bg-[#f9f8f4] border border-[#e2dfd5] rounded-md text-xs text-[#222220] focus:outline-none focus:border-[#23362a]"
              >
                {STYLISTS.map(st => (
                  <option key={st.id} value={st.id}>
                    {st.name} — {st.role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#66635b] mb-1">Date</label>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#f9f8f4] border border-[#e2dfd5] rounded-md text-xs text-[#222220] focus:outline-none focus:border-[#23362a]"
              >
                <option value="2026-10-24">Today (24 Oct 2026)</option>
                <option value="2026-10-25">Tomorrow (25 Oct 2026)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#66635b] mb-1">Time Slot</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-[#f9f8f4] border border-[#e2dfd5] rounded-md text-xs text-[#222220] focus:outline-none focus:border-[#23362a]"
              >
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="02:30 PM">02:30 PM</option>
                <option value="03:30 PM">03:30 PM</option>
                <option value="05:00 PM">05:00 PM</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#66635b] mb-1">Price (INR)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 bg-[#f9f8f4] border border-[#e2dfd5] rounded-md text-xs text-[#222220] font-mono focus:outline-none focus:border-[#23362a]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#e2dfd5]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#e2dfd5] text-[#66635b] hover:text-[#222220] text-xs font-medium rounded transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#23362a] hover:bg-[#2c4737] text-white text-xs uppercase tracking-wider font-semibold rounded shadow transition-all"
            >
              Confirm Booking & Queue WhatsApp
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
