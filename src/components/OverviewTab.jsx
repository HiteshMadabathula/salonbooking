import React from 'react';
import {
  Calendar,
  CheckCircle2,
  XCircle,
  IndianRupee,
  TrendingDown,
  Users,
  Clock,
  ArrowUpRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function OverviewTab({ appointments, waitlist, reminders, setActiveTab, onOpenBookingModal }) {
  // Compute stats for today (2026-10-24)
  const todayAppointments = appointments.filter(a => a.date === '2026-10-24');
  const completedToday = todayAppointments.filter(a => a.status === 'Completed').length;
  const cancelledToday = todayAppointments.filter(a => a.status === 'Cancelled').length;
  const confirmedToday = todayAppointments.filter(a => a.status === 'Confirmed' || a.status === 'Pending').length;

  // Calculate estimated revenue for today
  const todayRevenue = todayAppointments
    .filter(a => a.status !== 'Cancelled')
    .reduce((sum, a) => sum + a.price, 0);

  // No-show rate calculation (mocked/computed)
  const totalBookings = appointments.length;
  const totalCancelled = appointments.filter(a => a.status === 'Cancelled').length;
  const noShowRate = totalBookings > 0 ? ((totalCancelled / totalBookings) * 100).toFixed(1) : '0.0';

  const cancelledSlots = appointments.filter(a => a.status === 'Cancelled');

  return (
    <div className="space-y-8 animate-fade-in py-6">

      {/* Hero Editorial Banner */}
      <div className="bg-[#23362a] text-[#f9f8f4] p-8 rounded-xl shadow-md relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#7f9182]/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="max-w-2xl relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#b5c79e]"></span>
            <span className="text-xs uppercase tracking-widest text-[#b5c79e] font-semibold">Salon Operations • Friday, Oct 24, 2026</span>
          </div>
          <h2 className="text-3xl font-serif font-light text-white mb-2">Welcome back, Reception Desk</h2>
          <p className="text-sm text-[#e2dfd5]/80 leading-relaxed">
            Automated WhatsApp reminders have reduced today’s no-show risk by 28%.
            You have <strong className="text-white font-medium">{confirmedToday} active bookings</strong> and <strong className="text-white font-medium">{waitlist.length} clients</strong> on the waitlist ready for cancellation recovery.
          </p>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => setActiveTab('schedule')}
            className="px-4 py-2.5 bg-[#7f9182]/30 hover:bg-[#7f9182]/50 text-white text-xs uppercase tracking-wider font-medium rounded border border-[#b5c79e]/30 transition-all"
          >
            View Daily Schedule
          </button>
          <button
            onClick={onOpenBookingModal}
            className="px-4 py-2.5 bg-[#b5c79e] hover:bg-[#c4d4af] text-[#23362a] text-xs uppercase tracking-wider font-semibold rounded shadow transition-all"
          >
            + Quick Booking
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

        {/* Today's Appointments */}
        <div className="bg-white p-5 rounded-xl border border-[#e2dfd5] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#66635b] mb-3">
            <span className="text-xs uppercase tracking-wider font-medium">Today’s Bookings</span>
            <Calendar className="w-4 h-4 text-[#7f9182]" />
          </div>
          <div>
            <div className="text-3xl font-serif text-[#222220]">{todayAppointments.length}</div>
            <div className="text-xs text-[#66635b] mt-1 flex items-center gap-1">
              <span className="text-[#23362a] font-medium">{confirmedToday}</span> pending/confirmed
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white p-5 rounded-xl border border-[#e2dfd5] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#66635b] mb-3">
            <span className="text-xs uppercase tracking-wider font-medium">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-3xl font-serif text-[#222220]">{completedToday}</div>
            <div className="text-xs text-emerald-700 mt-1">Successfully serviced</div>
          </div>
        </div>

        {/* Cancellations */}
        <div className="bg-white p-5 rounded-xl border border-[#e2dfd5] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#66635b] mb-3">
            <span className="text-xs uppercase tracking-wider font-medium">Cancellations</span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div>
            <div className="text-3xl font-serif text-[#222220]">{cancelledToday}</div>
            <div className="text-xs text-rose-700 mt-1">Slots open for recovery</div>
          </div>
        </div>

        {/* Estimated Revenue */}
        <div className="bg-white p-5 rounded-xl border border-[#e2dfd5] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#66635b] mb-3">
            <span className="text-xs uppercase tracking-wider font-medium">Est. Revenue</span>
            <IndianRupee className="w-4 h-4 text-[#23362a]" />
          </div>
          <div>
            <div className="text-3xl font-serif text-[#222220]">₹{todayRevenue.toLocaleString('en-IN')}</div>
            <div className="text-xs text-[#66635b] mt-1">Today’s projected gross</div>
          </div>
        </div>

        {/* No-Show Rate */}
        <div className="bg-white p-5 rounded-xl border border-[#e2dfd5] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#66635b] mb-3">
            <span className="text-xs uppercase tracking-wider font-medium">No-Show Rate</span>
            <TrendingDown className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-3xl font-serif text-[#222220]">{noShowRate}%</div>
            <div className="text-xs text-emerald-700 mt-1 font-medium">-1.4% from last week</div>
          </div>
        </div>

      </div>

      {/* Two-Column Section: Cancellation Recovery & Waitlist Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Cancellation Recovery Quick Box */}
        <div className="bg-white p-6 rounded-xl border border-[#e2dfd5] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <h3 className="text-base font-serif text-[#222220]">Cancellation Recovery Queue</h3>
              </div>
              <span className="text-xs px-2.5 py-1 bg-amber-50 text-amber-800 rounded-full font-medium">
                {cancelledSlots.length} Slots Open
              </span>
            </div>
            <p className="text-xs text-[#66635b] mb-4">
              Recently cancelled slots with instant AI-suggested waitlist matches to recover revenue.
            </p>

            <div className="space-y-3">
              {cancelledSlots.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#66635b]">No recent cancellations. All slots filled!</div>
              ) : (
                cancelledSlots.map(slot => (
                  <div key={slot.id} className="p-4 bg-[#f9f8f4] rounded-lg border border-[#e2dfd5] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#222220]">{slot.customerName}</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-rose-100 text-rose-800 rounded">Cancelled</span>
                      </div>
                      <div className="text-xs text-[#66635b] mt-1">
                        {slot.service} with <span className="text-[#23362a] font-medium">{slot.stylistName}</span> • {slot.date} at {slot.time}
                      </div>
                      <div className="text-[11px] text-emerald-700 mt-1 font-medium">
                        Suggested Waitlist Match: <span className="underline">Meera Nambiar</span> (Wanting {slot.service})
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('reminders')}
                      className="px-3 py-1.5 bg-[#23362a] hover:bg-[#2c4737] text-white text-xs rounded transition-all"
                    >
                      Offer Slot
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#e2dfd5] flex justify-between items-center text-xs">
            <span className="text-[#66635b]">Automated WhatsApp Dispatch ready</span>
            <button
              onClick={() => setActiveTab('reminders')}
              className="text-[#23362a] font-medium hover:underline flex items-center gap-1"
            >
              <span>View Reminders & Recovery</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Waitlist Quick Snapshot */}
        <div className="bg-white p-6 rounded-xl border border-[#e2dfd5] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#7f9182]" />
                <h3 className="text-base font-serif text-[#222220]">Waitlist Priority Queue</h3>
              </div>
              <span className="text-xs px-2.5 py-1 bg-[#b5c79e]/30 text-[#23362a] rounded-full font-medium">
                {waitlist.length} Waiting
              </span>
            </div>
            <p className="text-xs text-[#66635b] mb-4">
              Clients queued for fully booked stylists or last-minute openings.
            </p>

            <div className="space-y-3">
              {waitlist.slice(0, 3).map(item => (
                <div key={item.id} className="p-3.5 bg-[#f9f8f4] rounded-lg border border-[#e2dfd5] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[#222220]">{item.customerName}</div>
                    <div className="text-xs text-[#66635b] mt-0.5">
                      {item.service} with <span className="text-[#23362a] font-medium">{item.preferredStylist}</span>
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 bg-[#e2dfd5] text-[#222220] rounded font-medium">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#e2dfd5] flex justify-between items-center text-xs">
            <span className="text-[#66635b]">All client preferences tracked</span>
            <button
              onClick={() => setActiveTab('waitlist')}
              className="text-[#23362a] font-medium hover:underline flex items-center gap-1"
            >
              <span>Manage Full Waitlist</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
