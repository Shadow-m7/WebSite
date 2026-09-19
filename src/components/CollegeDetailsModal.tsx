import React from 'react';
import { 
  X, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Briefcase, 
  IndianRupee, 
  PhoneCall, 
  Mail, 
  Globe, 
  CheckCircle2, 
  GraduationCap, 
  Building2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { College } from '../types';

interface CollegeDetailsModalProps {
  college: College | null;
  onClose: () => void;
  onOpenInquiry: (college: College) => void;
}

export const CollegeDetailsModal: React.FC<CollegeDetailsModalProps> = ({
  college,
  onClose,
  onOpenInquiry,
}) => {
  if (!college) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Image */}
        <div className="relative h-56 sm:h-64 shrink-0 bg-slate-900">
          <img
            src={college.image}
            alt={college.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {college.drccApproved && (
                <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  100% DRCC Bihar Eligible
                </span>
              )}
              <span className="bg-amber-500 text-slate-950 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                NAAC Grade {college.naacGrade}
              </span>
              <span className="bg-blue-600 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                {college.type} Institute
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit',sans-serif] leading-snug">
              {college.name}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1">
              <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>{college.location}</span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-300 font-semibold">{college.ranking}</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-sm">
          {/* About description */}
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-1">About the Institution</h3>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              {college.description}
            </p>
          </div>

          {/* DRCC Special Notice Box */}
          {college.drccApproved && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-emerald-950">
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm mb-1">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>Bihar Student Credit Card (MNSSBY - DRCC) Coverage</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                This college provides direct Bonafide Certificates and authorized Fee Structure approved for Bihar DRCC. Bihar domicile students can claim up to <strong>₹4,00,000 education loan</strong> with zero collateral at 1% interest for girls/divyang and 4% for boys.
              </p>
            </div>
          )}

          {/* Courses & Fee Structure Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                Available Courses & Fee Breakdown
              </h3>
              <span className="text-[11px] text-slate-500">Academic Session 2026-27</span>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <div className="divide-y divide-slate-200">
                {college.courses.map((course) => (
                  <div key={course.code} className="p-3.5 sm:p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <span>{course.name}</span>
                          {course.drccEligible && (
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                              DRCC Covered
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            Duration: {course.duration}
                          </span>
                          <span>•</span>
                          <span>Eligibility: {course.eligibility}</span>
                          <span>•</span>
                          <span>Seats: {course.totalSeats}</span>
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <span className="text-xs text-slate-500 block">Annual Tuition</span>
                        <span className="text-base font-extrabold text-blue-900">
                          ₹{course.annualFee.toLocaleString('en-IN')}/yr
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Placement Statistics & Top Recruiters */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5 text-blue-900">
              <Briefcase className="w-4 h-4 text-blue-600" />
              Placement Track Record
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-3">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Average CTC</span>
                <span className="font-bold text-slate-800 text-sm">{college.avgPackage}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Highest CTC</span>
                <span className="font-bold text-emerald-700 text-sm">{college.highestPackage}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-500 block">Accreditations</span>
                <span className="font-bold text-slate-800 text-xs truncate block">{college.approvals.join(', ')}</span>
              </div>
            </div>

            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-700">Top Recruiters: </span>
              <span>{college.topRecruiters.join(' • ')}</span>
            </div>
          </div>

          {/* Official Contact & Admission Helpline */}
          <div className="border-t border-slate-200 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-blue-600" />
              <span>Campus Helpline: <strong>{college.phone}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-500" />
              <span>{college.email}</span>
            </div>
            {college.website && (
              <a 
                href={college.website} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1 text-blue-700 hover:underline font-semibold"
              >
                <Globe className="w-4 h-4" />
                <span>Visit Official Website</span>
              </a>
            )}
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenInquiry(college);
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Apply / Request Bonafide Letter</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
