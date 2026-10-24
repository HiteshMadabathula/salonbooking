import React from 'react';
import {
  Calendar,
  LayoutDashboard,
  Users,
  Clock,
  MessageSquare,
  Plus,
  Scissors,
  ShieldCheck
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenBookingModal }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'schedule', label: 'Daily Schedule', icon: Clock },
    { id: 'waitlist', label: 'Waitlist', icon: Users },
    { id: 'reminders', label: 'Reminders & Recovery', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#f9f8f4]/90 backdrop-blur-md border-b border-[#e2dfd5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Brand / Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#23362a] text-[#f9f8f4] flex items-center justify-center font-serif text-xl tracking-wider shadow-sm">
              HB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-serif tracking-wide text-[#222220] m-0 font-medium">Hair by Bhargav</h1>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-[#b5c79e]/30 text-[#23362a] rounded font-semibold">
                  Desk
                </span>
              </div>
              <p className="text-xs text-[#66635b] tracking-tight">Appointment Management & No-Show Reduction</p>
            </div>
          </div>

          {/* Center Simulation Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#e2dfd5]/40 rounded-full border border-[#e2dfd5] text-xs text-[#66635b]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#23362a]" />
            <span>Simulated WhatsApp Mode active (INR Pricing)</span>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenBookingModal}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#23362a] hover:bg-[#2c4737] text-[#f9f8f4] text-xs font-medium uppercase tracking-wider rounded-md shadow-sm transition-all"
            >
              <Plus className="w-4 h-4 text-[#b5c79e]" />
              <span>New Appointment</span>
            </button>
          </div>

        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto pb-px border-t border-[#e2dfd5]/60 pt-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs uppercase tracking-wider font-medium border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-[#23362a] text-[#23362a] bg-[#e2dfd5]/30 rounded-t-md'
                    : 'border-transparent text-[#66635b] hover:text-[#222220] hover:bg-[#e2dfd5]/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#23362a]' : 'text-[#66635b]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
