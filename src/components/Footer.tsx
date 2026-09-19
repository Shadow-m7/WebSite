import React from 'react';
import { 
  GraduationCap, 
  PhoneCall, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Heart, 
  ArrowRight,
  Building2,
  FileText,
  Calculator
} from 'lucide-react';
import { ContactInfo } from '../types';

interface FooterProps {
  contactInfo: ContactInfo;
  onNavigateTab: (tab: string) => void;
  onOpenNewPost: () => void;
  onOpenInquiry: () => void;
  onOpenDrccApply: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  contactInfo,
  onNavigateTab,
  onOpenNewPost,
  onOpenInquiry,
  onOpenDrccApply,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: About Portal */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
                <GraduationCap className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base block font-['Outfit',sans-serif]">
                  All India Counselling
                </span>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                  DRCC Bihar Education Portal
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              अखिल भारतीय स्तर पर उच्च शिक्षा (B.Tech, MBBS, Pharmacy, Nursing, Management) के लिए अधिकृत करियर काउंसलिंग एवं बिहार स्टूडेंट क्रेडिट कार्ड (MNSSBY) मार्गदर्शन केंद्र।
            </p>
            <div className="pt-2 flex flex-col gap-1.5 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                100% Free Transparent Counselling
              </span>
              <span className="text-[11px] text-slate-400">
                Authorized Liaison & College Bonafide Support
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-['Outfit',sans-serif]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateTab('colleges')}
                  className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-blue-400" />
                  Top Approved Colleges 2026-27
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('drcc')}
                  className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Bihar Student Credit Card (DRCC ₹4L)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('calculator')}
                  className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Calculator className="w-3.5 h-3.5 text-sky-400" />
                  DRCC Loan & EMI Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('posts')}
                  className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  Client & Community Notice Board
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenNewPost}
                  className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5 text-amber-400 font-semibold"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  Post Admission Seat Vacancy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDrccApply}
                  className="hover:text-emerald-300 transition-colors cursor-pointer flex items-center gap-1.5 text-emerald-400 font-semibold"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  DRCC Online Pre-Registration
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Helplines & Numbers */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-['Outfit',sans-serif]">
              Helpline & Contacts
            </h4>
            <div className="space-y-2 text-xs">
              <a 
                href={`tel:${contactInfo.helplineTollFree}`}
                className="flex items-start gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Toll-Free National Helpline:</span>
                  <strong className="text-white text-sm">{contactInfo.helplineTollFree}</strong>
                </div>
              </a>

              <a 
                href={`https://wa.me/${contactInfo.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 block">WhatsApp Support:</span>
                  <strong className="text-emerald-400">{contactInfo.whatsappNumber}</strong>
                </div>
              </a>

              <div className="flex items-start gap-2 text-slate-300">
                <PhoneCall className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Direct Counsellor Lines:</span>
                  <span>{contactInfo.counsellingHotline1}</span>
                  <br />
                  <span>{contactInfo.counsellingHotline2}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-slate-300 pt-1">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Email Desk:</span>
                  <span className="text-white">{contactInfo.officialEmail}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Regional Liaison Offices */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-['Outfit',sans-serif]">
              Regional Support Offices
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Patna DRCC Liaison Office:</strong>
                  <span>{contactInfo.addressPatna}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">New Delhi Head Office:</strong>
                  <span>{contactInfo.addressDelhi}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Bengaluru Technical Desk:</strong>
                  <span>{contactInfo.addressBangalore}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{contactInfo.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center md:text-left leading-relaxed max-w-2xl">
            <strong>Disclaimer:</strong> All India Counselling & DRCC Bihar portal is an educational advisory and admission facilitation service. Loan sanctions under the Bihar Student Credit Card (MNSSBY) scheme are governed by Bihar State Education Finance Corporation (BSEFC) & Department of Education, Govt of Bihar.
          </p>
          <div className="text-center md:text-right shrink-0">
            <span>© {new Date().getFullYear()} All India Counselling & DRCC Portal. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
