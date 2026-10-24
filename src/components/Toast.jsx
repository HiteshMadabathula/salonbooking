import React, { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-[#23362a] text-[#f9f8f4] text-sm font-medium rounded-lg shadow-xl border border-[#7f9182]/30 transition-all duration-300 animate-slide-up">
      <span className="w-2 h-2 rounded-full bg-[#b5c79e] animate-pulse"></span>
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-3 text-[#b5c79e] hover:text-white text-xs font-semibold uppercase tracking-wider"
      >
        Dismiss
      </button>
    </div>
  );
}
