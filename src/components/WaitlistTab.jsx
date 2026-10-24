import React, { useState } from 'react';
import { Users, UserPlus, Phone, CheckCircle, Clock, Send, Sparkles } from 'lucide-react';

export default function WaitlistTab({ waitlist, onAddToWaitlist, onNotifyWaitlist, onOpenBookingModal }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Haircut & Styling');
  const [preferredStylist, setPreferredStylist] = useState('Bhargav');
  const [preferredTime, setPreferredTime] = useState('Anytime today');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !phone) return;
    onAddToWaitlist({
      id: 'wt-' + Date.now(),
      customerName,
      phone,
      service,
      preferredStylist,
      preferredTime,
      addedAt: 'Just now',
      status: 'Waiting',
    });
    setCustomerName('');
    setPhone('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in py-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-serif text-[#222220]">Client Waitlist & Cancellation Fillers</h2>
          <p className="text-xs text-[#66635b]">Queue of clients waiting for open slots or peak time cancellations</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#23362a] hover:bg-[#2c4737] text-white text-xs uppercase tracking-wider font-medium rounded shadow transition-all"
        >
          <UserPlus className="w-4 h-4 text-[#b5c79e]" />
          <span>Add to Waitlist</span>
        </button>
      </div>

      {/* Waitlist Table */}
      <div className="bg-white rounded-xl border border-[#e2dfd5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9f8f4] border-b border-[#e2dfd5] text-[11px] uppercase tracking-wider text-[#66635b]">
                <th className="py-3.5 px-4 font-semibold">Client Name</th>
                <th className="py-3.5 px-4 font-semibold">Phone</th>
                <th className="py-3.5 px-4 font-semibold">Requested Service</th>
                <th className="py-3.5 px-4 font-semibold">Preferred Stylist</th>
                <th className="py-3.5 px-4 font-semibold">Time Preference</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-center">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2dfd5] text-xs">
              {waitlist.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-[#66635b]">
                    Waitlist is currently empty.
                  </td>
                </tr>
              ) : (
                waitlist.map((item) => (
                  <tr key={item.id} className="hover:bg-[#f9f8f4]/60 transition-colors">
                    <td className="py-4 px-4 font-medium text-[#222220]">{item.customerName}</td>
                    <td className="py-4 px-4 font-mono text-[#66635b]">{item.phone}</td>
                    <td className="py-4 px-4 font-medium text-[#23362a]">{item.service}</td>
                    <td className="py-4 px-4 text-[#66635b]">{item.preferredStylist}</td>
                    <td className="py-4 px-4 text-[#66635b]">{item.preferredTime}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Notified' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                        'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => onNotifyWaitlist(item.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#23362a] hover:bg-[#2c4737] text-white text-xs rounded transition-all"
                      >
                        <Send className="w-3 h-3 text-[#b5c79e]" />
                        <span>Offer Open Slot</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add to Waitlist Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-[#e2dfd5] animate-scale-up">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#e2dfd5]">
              <h3 className="text-lg font-serif text-[#222220]">Add Client to Waitlist</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#66635b] hover:text-[#222220] text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#66635b] mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Meera Nambiar"
                  className="w-full px-3 py-2 bg-[#f9f8f4] border border-[#e2dfd5] rounded-md text-xs text-[#222220] focus:outline-none focus:border-[#23362a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#66635b] mb-1">Phone Number (+91)</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98333 44556"
                  className="w-full px-3 py-2 bg-[#f9f8f4] border border-[#e2dfd5] rounded-md text-xs text-[#222220] focus:outline-none focus:border-[#23362a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#66635b] mb-1">Service Needed</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f9f8f4] border border-[#e2dfd5] rounded-md text-xs text-[#222220] focus:outline-none focus:border-[#23362a]"
                  >
                    <option value="Haircut & Styling">Haircut & Styling</option>
                    <option value="Balayage Color">Balayage Color</option>
                    <option value="Keratin Smoothing">Keratin Smoothing</option>
                    <option value="Japanese Head Spa">Japanese Head Spa</option>
                    <option value="Signature Glow Facial">Signature Glow Facial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#66635b] mb-1">Preferred Stylist</label>
                  <select
                    value={preferredStylist}
                    onChange={(e) => setPreferredStylist(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f9f8f4] border border-[#e2dfd5] rounded-md text-xs text-[#222220] focus:outline-none focus:border-[#23362a]"
                  >
                    <option value="Bhargav">Bhargav</option>
                    <option value="Priya Nair">Priya Nair</option>
                    <option value="Rohan Mehta">Rohan Mehta</option>
                    <option value="Ananya Sen">Ananya Sen</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#66635b] mb-1">Time Preference</label>
                <input
                  type="text"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  placeholder="e.g. Today after 2 PM"
                  className="w-full px-3 py-2 bg-[#f9f8f4] border border-[#e2dfd5] rounded-md text-xs text-[#222220] focus:outline-none focus:border-[#23362a]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#e2dfd5]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#e2dfd5] text-[#66635b] hover:text-[#222220] text-xs font-medium rounded transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#23362a] hover:bg-[#2c4737] text-white text-xs uppercase tracking-wider font-semibold rounded shadow transition-all"
                >
                  Save to Waitlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
