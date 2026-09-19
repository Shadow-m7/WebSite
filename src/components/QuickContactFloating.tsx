import React from 'react';
import { PhoneCall, MessageCircle, Sparkles } from 'lucide-react';
import { ContactInfo } from '../types';

interface QuickContactFloatingProps {
  contactInfo: ContactInfo;
  onOpenInquiry: () => void;
}

export const QuickContactFloating: React.FC<QuickContactFloatingProps> = ({
  contactInfo,
  onOpenInquiry,
}) => {
  return (
    <aside aria-label="Quick helpline and messaging options" className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5">
      {/* Floating Free Counselling Pill */}
      <button
        onClick={onOpenInquiry}
        className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-xl shadow-blue-900/30 border border-blue-500/50 hover:scale-105 transition-all cursor-pointer"
      >
        <Sparkles className="w-4 h-4 text-amber-300" />
        <span>Free Counselling Call</span>
      </button>

      {/* Floating WhatsApp and Call Icons */}
      <div className="flex items-center gap-2">
        <a
          href={`tel:${contactInfo.helplineTollFree}`}
          aria-label={`Call toll-free helpline at ${contactInfo.helplineTollFree}`}
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-xl shadow-blue-900/40 hover:scale-110 transition-transform"
          title={`Call Toll-Free: ${contactInfo.helplineTollFree}`}
        >
          <PhoneCall className="w-5 h-5 text-white" />
        </a>

        <a
          href={`https://wa.me/${contactInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Counselling%20Desk,%20I%20need%20admission%20details%20and%20DRCC%20Bihar%20loan%20help.`}
          target="_blank"
          rel="noreferrer"
          aria-label={`Chat with DRCC helpline on WhatsApp at ${contactInfo.whatsappNumber}`}
          className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xl shadow-emerald-900/40 hover:scale-110 transition-transform"
          title="Chat with DRCC Helpline on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </a>
      </div>
    </aside>
  );
};
