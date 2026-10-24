import React, { useState } from 'react';
import { MessageSquare, ShieldCheck, Send, CheckCircle2, Clock, Smartphone, RefreshCw, AlertCircle } from 'lucide-react';

export default function RemindersTab({ reminders, onSimulateReminder, appointments }) {
  const [selectedReminder, setSelectedReminder] = useState(reminders[0] || null);

  const cancelledSlots = appointments.filter(a => a.status === 'Cancelled');

  return (
    <div className="space-y-8 animate-fade-in py-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-serif text-[#222220]">WhatsApp Reminders & Cancellation Recovery</h2>
        <p className="text-xs text-[#66635b]">Simulated messaging queue to prevent client no-shows and automatically recover open slots</p>
      </div>

      {/* Notice Banner */}
      <div className="p-4 bg-[#23362a]/5 border border-[#23362a]/20 rounded-xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#23362a] shrink-0 mt-0.5" />
        <div className="text-xs text-[#222220] leading-relaxed">
          <strong className="font-semibold">Simulated WhatsApp API Mode:</strong> All reminder messages and instant slot-recovery pings below are simulated locally in the browser. No real external API calls or SMS charges are incurred. You can test sending reminder pings and client reply simulations below.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Reminders List & Queue (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-[#e2dfd5] shadow-sm p-5">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#e2dfd5]">
              <h3 className="text-base font-serif text-[#222220]">Active Reminder Queue</h3>
              <span className="text-xs px-2.5 py-1 bg-[#b5c79e]/30 text-[#23362a] rounded-full font-medium">
                {reminders.length} Scheduled
              </span>
            </div>

            <div className="space-y-3">
              {reminders.map((rem) => (
                <div
                  key={rem.id}
                  onClick={() => setSelectedReminder(rem)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedReminder?.id === rem.id
                      ? 'border-[#23362a] bg-[#23362a]/5 shadow-xs'
                      : 'border-[#e2dfd5] bg-white hover:bg-[#f9f8f4]'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#222220]">{rem.customerName}</span>
                        <span className="text-[10px] font-mono text-[#66635b]">{rem.phone}</span>
                      </div>
                      <div className="text-xs text-[#66635b] mt-1">
                        {rem.service} with <span className="text-[#23362a] font-medium">{rem.stylistName}</span> • {rem.dateTime}
                      </div>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                      {rem.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cancellation Recovery Section */}
          <div className="bg-white rounded-xl border border-[#e2dfd5] shadow-sm p-5">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#e2dfd5]">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <h3 className="text-base font-serif text-[#222220]">Recent Cancellations & Recovery Matches</h3>
              </div>
              <span className="text-xs px-2.5 py-1 bg-rose-50 text-rose-800 rounded-full font-medium">
                {cancelledSlots.length} Open Slots
              </span>
            </div>

            <div className="space-y-3">
              {cancelledSlots.length === 0 ? (
                <div className="text-center py-6 text-xs text-[#66635b]">No cancelled slots requiring recovery.</div>
              ) : (
                cancelledSlots.map(slot => (
                  <div key={slot.id} className="p-4 bg-[#f9f8f4] rounded-lg border border-[#e2dfd5] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="text-xs font-semibold text-[#222220]">
                        {slot.service} ({slot.date} at {slot.time})
                      </div>
                      <div className="text-[11px] text-[#66635b] mt-0.5">
                        Originally booked by {slot.customerName} with {slot.stylistName}. Reason: {slot.cancellationReason || 'Cancelled'}
                      </div>
                      <div className="text-[11px] text-emerald-700 font-medium mt-1">
                        Suggested Waitlist Match: Meera Nambiar (WhatsApp Ready)
                      </div>
                    </div>
                    <button
                      onClick={() => onSimulateReminder({
                        customerName: 'Meera Nambiar',
                        service: slot.service,
                        time: `${slot.date} at ${slot.time}`
                      })}
                      className="px-3.5 py-2 bg-[#23362a] hover:bg-[#2c4737] text-white text-xs rounded shadow transition-all whitespace-nowrap"
                    >
                      Dispatch Recovery Offer via WhatsApp
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* WhatsApp Phone Mockup Preview (1 Col) */}
        <div className="bg-[#1f2c34] p-5 rounded-xl border border-[#2e303a] shadow-md text-white flex flex-col justify-between">
          <div>
            {/* Phone header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#2e303a]/60 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center font-bold text-xs">
                  WA
                </div>
                <div>
                  <div className="text-xs font-semibold">WhatsApp Business API</div>
                  <div className="text-[10px] text-emerald-400">● Simulated Live Preview</div>
                </div>
              </div>
              <Smartphone className="w-4 h-4 text-[#8696a0]" />
            </div>

            {selectedReminder ? (
              <div className="space-y-3">
                <div className="text-[10px] text-center text-[#8696a0] my-2">TODAY</div>

                {/* Incoming Message Bubble */}
                <div className="bg-[#005c4b] p-3.5 rounded-lg rounded-tr-none text-xs text-[#e9edef] space-y-2 shadow-sm max-w-[90%] ml-auto">
                  <div className="font-semibold text-[11px] text-emerald-200">
                    To: {selectedReminder.customerName} ({selectedReminder.phone})
                  </div>
                  <p className="leading-relaxed">{selectedReminder.template}</p>
                  <div className="text-[9px] text-[#8696a0] text-right">08:30 AM ✓✓</div>
                </div>

                {/* Simulated Reply Bubble */}
                <div className="bg-[#202c33] p-3.5 rounded-lg rounded-tl-none text-xs text-[#e9edef] space-y-1 shadow-sm max-w-[90%]">
                  <div className="font-semibold text-[11px] text-[#8696a0]">Client Reply:</div>
                  <p className="text-emerald-300 font-medium">"C - Confirmed. See you at Hair by Bhargav!"</p>
                  <div className="text-[9px] text-[#8696a0] text-right">08:32 AM</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-xs text-[#8696a0]">
                Select a reminder from the queue to preview WhatsApp message.
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#2e303a] flex flex-col gap-2">
            <button
              onClick={() => selectedReminder && onSimulateReminder(selectedReminder)}
              className="w-full py-2.5 bg-[#00a884] hover:bg-[#029374] text-white text-xs font-semibold uppercase tracking-wider rounded transition-all shadow"
            >
              Simulate Dispatch Now
            </button>
            <span className="text-[10px] text-center text-[#8696a0]">
              Simulated WhatsApp Notification Only
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
