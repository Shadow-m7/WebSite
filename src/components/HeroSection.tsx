import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  FileCheck, 
  HelpCircle, 
  ShieldCheck, 
  PhoneCall, 
  Sparkles,
  Users,
  Award,
  Wallet
} from 'lucide-react';
import { motion } from 'motion/react';
import { ContactInfo } from '../types';

interface HeroSectionProps {
  stats: any;
  contactInfo: ContactInfo;
  onSearch: (query: string) => void;
  onSelectStream: (stream: string) => void;
  onOpenInquiry: () => void;
  onOpenDrccApply: () => void;
  onNavigateTab: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  stats,
  contactInfo,
  onSearch,
  onSelectStream,
  onOpenInquiry,
  onOpenDrccApply,
  onNavigateTab,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      onNavigateTab('colleges');
    }
  };

  const quickStreams = [
    { label: 'B.Tech / Engineering', value: 'Engineering (B.Tech)' },
    { label: 'MBBS / Medical', value: 'Medical (MBBS/BAMS)' },
    { label: 'Pharmacy (B.Pharm)', value: 'Pharmacy (B.Pharma/D.Pharma)' },
    { label: 'Nursing (B.Sc/GNM)', value: 'Nursing & Paramedical' },
    { label: 'MBA / Management', value: 'Management (MBA/BBA)' },
    { label: 'Polytechnic Diploma', value: 'Polytechnic Diploma' },
  ];

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden py-14 sm:py-20">
      {/* Decorative Grid Pattern Background */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      {/* Soft Glow Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Trust Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/60 border border-blue-500/30 text-xs sm:text-sm text-blue-200 shadow-inner">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-white">Government Approved Colleges</span>
            <span className="text-blue-400">•</span>
            <span className="text-amber-300 font-medium">Bihar Student Credit Card (DRCC) ₹4,00,000 Support</span>
          </div>
        </motion.div>

        {/* Hero Title & Bilingual Description */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mt-6 max-w-4xl mx-auto space-y-4"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-['Outfit',sans-serif]">
            All India Admission Counselling &{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
              DRCC Bihar Support
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            भारत के शीर्ष इंजीनियरिंग, मेडिकल, फार्मेसी एवं मैनेजमेंट कॉलेजों में प्रवेश मार्गदर्शन। 
            बिहार के छात्रों के लिए ₹4 लाख तक का शिक्षा ऋण (DRCC MNSSBY) व 100% नि:शुल्क एडमिशन गाइडेंस।
          </p>
        </motion.div>

        {/* Live Search Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 max-w-3xl mx-auto"
        >
          <form 
            onSubmit={handleSearchSubmit}
            className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl flex flex-col sm:flex-row gap-2"
          >
            <div className="flex-1 flex items-center px-3 gap-3 bg-white rounded-xl text-slate-900">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input 
                type="text"
                placeholder="Search college name, course (B.Tech, MBBS, B.Pharma), or city..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full py-3.5 text-sm sm:text-base outline-none bg-transparent placeholder-slate-400 font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer shrink-0"
            >
              <span>Search Colleges</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Stream Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
            <span className="text-slate-400 font-medium">Quick Explore:</span>
            {quickStreams.map((s) => (
              <button
                key={s.value}
                onClick={() => {
                  onSelectStream(s.value);
                  onNavigateTab('colleges');
                }}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition-colors cursor-pointer"
              >
                {s.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Primary Action Cards / Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
        >
          {/* Card 1: DRCC Loan Scheme */}
          <div 
            onClick={() => onNavigateTab('drcc')}
            className="group p-5 rounded-2xl bg-gradient-to-br from-blue-900/60 to-slate-900/80 border border-blue-500/30 hover:border-amber-400/60 transition-all cursor-pointer shadow-lg hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Wallet className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
              DRCC Bihar Student Card
            </h2>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              Get up to ₹4 Lakhs loan for higher studies at 1% interest for girls & 4% for boys.
            </p>
            <div className="mt-3 flex items-center text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>View DRCC Rules & Colleges</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Card 2: 100% Free Counselling Call */}
          <div 
            onClick={onOpenInquiry}
            className="group p-5 rounded-2xl bg-gradient-to-br from-blue-900/60 to-slate-900/80 border border-blue-500/30 hover:border-blue-400/60 transition-all cursor-pointer shadow-lg hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
              Free Expert Guidance
            </h2>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              Talk directly with certified career counsellors for choice filling, fees & college selection.
            </p>
            <div className="mt-3 flex items-center text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
              <span>Book Call Back</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Card 3: Post Admission Update */}
          <div 
            onClick={() => onNavigateTab('posts')}
            className="group p-5 rounded-2xl bg-gradient-to-br from-blue-900/60 to-slate-900/80 border border-blue-500/30 hover:border-emerald-400/60 transition-all cursor-pointer shadow-lg hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <FileCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
              Client & Student Post Board
            </h2>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              Post your college admission notice, seat vacancy, or student query with phone & email.
            </p>
            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>View & Post Notices</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Card 4: Verified Affiliations */}
          <div 
            onClick={() => onNavigateTab('colleges')}
            className="group p-5 rounded-2xl bg-gradient-to-br from-blue-900/60 to-slate-900/80 border border-blue-500/30 hover:border-purple-400/60 transition-all cursor-pointer shadow-lg hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
              AICTE / UGC / NMC Approved
            </h2>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              All listed colleges feature authentic accreditation, fee transparency & bonafide assistance.
            </p>
            <div className="mt-3 flex items-center text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
              <span>Explore All Institutes</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </motion.div>

        {/* Live Portal Statistics Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-5xl mx-auto">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-['Outfit',sans-serif]">
              {stats?.studentsAssisted ? stats.studentsAssisted.toLocaleString('en-IN') : '14,850+'}
            </div>
            <div className="text-xs text-slate-400 mt-1">Students Guided & Admitted</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-['Outfit',sans-serif]">
              {stats?.sanctionedLoansCr || '₹42.8+ Cr'}
            </div>
            <div className="text-xs text-slate-400 mt-1">DRCC Loan Amount Sanctioned</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-['Outfit',sans-serif]">
              {stats?.totalColleges || 150}+
            </div>
            <div className="text-xs text-slate-400 mt-1">Recognized Partner Campuses</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-['Outfit',sans-serif]">
              38 / 38
            </div>
            <div className="text-xs text-slate-400 mt-1">Bihar Districts Covered</div>
          </div>
        </div>
      </div>
    </div>
  );
};
