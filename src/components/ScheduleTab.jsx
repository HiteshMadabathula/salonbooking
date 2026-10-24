import React, { useState } from 'react';
import { STYLISTS } from '../mockData';
import { Clock, Calendar, CheckCircle2, XCircle, User } from 'lucide-react';

export default function ScheduleTab({ appointments, onOpenBookingModal }) {
  const [selectedDate, setSelectedDate] = useState('2026-10-24');

  const timeSlots = [
    '10:00 AM',
    '11:30 AM',
    '01:00 PM',
    '02:30 PM',
    '03:30 PM',
    '05:00 PM'
  ];

  const currentDayAppointments = appointments.filter(a => a.date === selectedDate);

  return (
    <div className="space-y-6 animate-fade-in py-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-serif text-[#222220]">Daily Salon Schedule</h2>
          <p className="text-xs text-[#66635b]">Stylist matrix and time slot availability</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-[#e2dfd5] rounded-md overflow-hidden p-1">
            <button
              onClick={() => setSelectedDate('2026-10-24')}
              className={`px-3 py-1.5 text-xs font-medium rounded ${
                selectedDate === '2026-10-24' ? 'bg-[#23362a] text-white' : 'text-[#66635b] hover:text-[#222220]'
              }`}
            >
              Today (24 Oct)
            </button>
            <button
              onClick={() => setSelectedDate('2026-10-25')}
              className={`px-3 py-1.5 text-xs font-medium rounded ${
                selectedDate === '2026-10-25' ? 'bg-[#23362a] text-white' : 'text-[#66635b] hover:text-[#222220]'
              }`}
            >
              Tomorrow (25 Oct)
            </button>
          </div>

          <button
            onClick={onOpenBookingModal}
            className="px-4 py-2 bg-[#23362a] hover:bg-[#2c4737] text-white text-xs uppercase tracking-wider font-medium rounded shadow transition-all"
          >
            + Book Slot
          </button>
        </div>
      </div>

      {/* Schedule Matrix Table */}
      <div className="bg-white rounded-xl border border-[#e2dfd5] shadow-sm overflow-x-auto">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#f9f8f4] border-b border-[#e2dfd5]">
              <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-wider font-semibold text-[#66635b] w-28">
                Time Slot
              </th>
              {STYLISTS.map(stylist => (
                <th key={stylist.id} className="py-3.5 px-4 text-left border-l border-[#e2dfd5]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#7f9182]/20 text-[#23362a] text-[11px] font-bold flex items-center justify-center">
                      {stylist.avatar}
                    </div>
                    <div>
                      <div className="text-xs font-serif text-[#222220] font-medium">{stylist.name}</div>
                      <div className="text-[10px] text-[#66635b]">{stylist.role}</div>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2dfd5] text-xs">
            {timeSlots.map(time => (
              <tr key={time} className="hover:bg-[#f9f8f4]/40">
                <td className="py-4 px-4 font-mono font-medium text-[#23362a] bg-[#f9f8f4]/60">
                  {time}
                </td>
                {STYLISTS.map(stylist => {
                  const appointment = currentDayAppointments.find(
                    a => a.stylistId === stylist.id && a.time === time
                  );

                  return (
                    <td key={stylist.id} className="py-3 px-4 border-l border-[#e2dfd5] align-top">
                      {appointment ? (
                        <div
                          className={`p-3 rounded-lg border text-xs shadow-xs transition-all ${
                            appointment.status === 'Completed'
                              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                              : appointment.status === 'Cancelled'
                              ? 'bg-rose-50/60 border-rose-200 text-rose-900 line-through'
                              : 'bg-white border-[#23362a]/30 text-[#222220]'
                          }`}
                        >
                          <div className="font-semibold flex items-center justify-between">
                            <span>{appointment.customerName}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#f9f8f4] rounded border border-[#e2dfd5]">
                              ₹{appointment.price}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#66635b] mt-1 font-medium">
                            {appointment.service}
                          </div>
                          <div className="mt-2 pt-2 border-t border-[#e2dfd5]/60 flex items-center justify-between">
                            <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                              appointment.status === 'Completed' ? 'bg-emerald-200 text-emerald-800' :
                              appointment.status === 'Cancelled' ? 'bg-rose-200 text-rose-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {appointment.status}
                            </span>
                            <span className="text-[10px] text-[#66635b] font-mono">{appointment.phone}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="h-20 border border-dashed border-[#e2dfd5] rounded-lg flex items-center justify-center text-[#66635b]/60 text-[11px] bg-[#f9f8f4]/20 hover:bg-[#f9f8f4]/80 transition-colors cursor-pointer"
                             onClick={onOpenBookingModal}>
                          + Available Slot
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
