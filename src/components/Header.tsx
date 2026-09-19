import React, { useState } from 'react';
import { 
  PhoneCall, 
  MessageCircle, 
  Mail, 
  MapPin, 
  GraduationCap, 
  FileText, 
  PlusCircle, 
  Search, 
  Clock, 
  CheckCircle2,
  Menu,
  X,
  Building2,
  HelpCircle,
  Calculator,
  Settings
} from 'lucide-react';
import { ContactInfo } from '../types';

interface HeaderProps {
  contactInfo: ContactInfo;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenNewPost: () => void;
  onOpenInquiry: () => void;
  onOpenDrccApply: () => void;
  onOpenTrackModal: () => void;
  onOpenManageModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  contactInfo,
  activeTab,
  setActiveTab,
  onOpenNewPost,
  onOpenInquiry,
  onOpenDrccApply,
  onOpenTrackModal,
  onOpenManageModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Helpline Banner with Official Look */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-slate-100 text-xs py-2 px-4 border-b border-blue-900/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 font-medium text-amber-300">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              2026-27 All India Counselling & DRCC Helpdesk Active
            </span>
            <a 
              href={`tel:${contactInfo.helplineTollFree}`} 
              className="flex items-center gap-1 hover:text-white transition-colors"
              title="Toll-Free Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300">Toll Free:</span>
              <strong className="text-white tracking-wide">{contactInfo.helplineTollFree}</strong>
            </a>
            <a 
              href={`https://wa.me/${contactInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Counselling%20Team,%20I%20need%20admission%20and%20DRCC%20Bihar%20guidance.`}
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: {contactInfo.whatsappNumber}</span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Patna • Delhi • Bangalore</span>
            </div>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenTrackModal}
              className="flex items-center gap-1 text-sky-300 hover:text-sky-200 transition-colors font-medium cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track Application</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-tight">
                All India Counselling
              </h1>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                DRCC BIHAR
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              National Admission & Bihar Student Credit Card Portal
            </p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-700">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'home' ? 'text-blue-700 bg-blue-50 font-semibold' : 'hover:text-blue-700 hover:bg-slate-100'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('colleges')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'colleges' ? 'text-blue-700 bg-blue-50 font-semibold' : 'hover:text-blue-700 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4 text-blue-600" />
            Colleges & Courses
          </button>
          <button
            onClick={() => setActiveTab('drcc')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'drcc' ? 'text-blue-700 bg-blue-50 font-semibold' : 'hover:text-blue-700 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            DRCC Bihar (₹4 Lakhs)
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'calculator' ? 'text-blue-700 bg-blue-50 font-semibold' : 'hover:text-blue-700 hover:bg-slate-100'
            }`}
          >
            <Calculator className="w-4 h-4 text-indigo-600" />
            Loan Calculator
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'posts' ? 'text-blue-700 bg-blue-50 font-semibold' : 'hover:text-blue-700 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-600" />
            Client Post Board
          </button>
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-2">
          {onOpenManageModal && (
            <button
              onClick={onOpenManageModal}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg border border-blue-300 text-blue-800 bg-blue-50 hover:bg-blue-100 transition-colors shadow-2xs cursor-pointer"
              title="Edit Colleges, Helplines, and Notice Board"
            >
              <Settings className="w-3.5 h-3.5 text-blue-700" />
              <span>Edit / Manage (एडिट)</span>
            </button>
          )}
          <button
            onClick={onOpenNewPost}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-amber-300 text-amber-900 bg-amber-50 hover:bg-amber-100 transition-colors shadow-2xs cursor-pointer"
            title="Post Admission Notice / College Seat / Client Inquiry"
          >
            <PlusCircle className="w-4 h-4 text-amber-600" />
            <span>Post Update</span>
          </button>
          <button
            onClick={onOpenInquiry}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-700 to-indigo-700 text-white hover:from-blue-800 hover:to-indigo-800 shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
            <span>Free Counselling Call</span>
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left ${activeTab === 'home' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'}`}
            >
              Home
            </button>
            <button
              onClick={() => { setActiveTab('colleges'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left ${activeTab === 'colleges' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'}`}
            >
              Colleges & Courses
            </button>
            <button
              onClick={() => { setActiveTab('drcc'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left ${activeTab === 'drcc' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'}`}
            >
              DRCC Bihar Loan
            </button>
            <button
              onClick={() => { setActiveTab('calculator'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left ${activeTab === 'calculator' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'}`}
            >
              Loan Calculator
            </button>
            <button
              onClick={() => { setActiveTab('posts'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left col-span-2 ${activeTab === 'posts' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'}`}
            >
              Client Post Board (Notice & Updates)
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {onOpenManageModal && (
              <button
                onClick={() => { onOpenManageModal(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200"
              >
                <Settings className="w-4 h-4 text-blue-700" />
                <span>Edit / Manage Portal (एडिट व प्रबंधन सेंटर)</span>
              </button>
            )}
            <button
              onClick={() => { onOpenNewPost(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300"
            >
              <PlusCircle className="w-4 h-4 text-amber-600" />
              Post Admission Notice / Client Post
            </button>
            <button
              onClick={() => { onOpenInquiry(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold bg-blue-700 text-white"
            >
              <PhoneCall className="w-4 h-4 text-amber-300" />
              Book Free Counselling Call
            </button>
            <button
              onClick={() => { onOpenTrackModal(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100"
            >
              <Search className="w-4 h-4 text-slate-500" />
              Track Application / Inquiry Status
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
