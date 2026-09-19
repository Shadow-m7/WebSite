import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  Award, 
  CheckCircle2, 
  ArrowUpRight, 
  PhoneCall, 
  GraduationCap, 
  ShieldCheck, 
  Briefcase, 
  IndianRupee, 
  Search, 
  Filter, 
  Sparkles,
  ExternalLink,
  Edit3,
  Plus
} from 'lucide-react';
import { College, StreamType } from '../types';

interface CollegesSectionProps {
  colleges: College[];
  selectedStream: string;
  setSelectedStream: (stream: string) => void;
  onSelectCollege: (college: College) => void;
  onOpenInquiryWithCollege: (college: College) => void;
  onEditCollege?: (college: College) => void;
  onAddNewCollege?: () => void;
}

export const CollegesSection: React.FC<CollegesSectionProps> = ({
  colleges,
  selectedStream,
  setSelectedStream,
  onSelectCollege,
  onOpenInquiryWithCollege,
  onEditCollege,
  onAddNewCollege,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [drccOnly, setDrccOnly] = useState(false);

  const streams: StreamType[] = [
    'All',
    'Engineering (B.Tech)',
    'Medical (MBBS/BAMS)',
    'Management (MBA/BBA)',
    'Pharmacy (B.Pharma/D.Pharma)',
    'Nursing & Paramedical',
    'Polytechnic Diploma',
    'Computer Apps (BCA/MCA)',
  ];

  const states = [
    'All', 
    'Bihar', 
    'Uttar Pradesh', 
    'Karnataka', 
    'Maharashtra', 
    'Odisha', 
    'Punjab', 
    'Uttarakhand', 
    'Delhi-NCR',
    'West Bengal',
    'Rajasthan'
  ];

  const filteredColleges = useMemo(() => {
    return colleges.filter((col) => {
      const matchesSearch = 
        col.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        col.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        col.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        col.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        col.courses.some((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStream = selectedStream === 'All' || col.stream === selectedStream;
      const matchesState = selectedState === 'All' || col.state.toLowerCase().includes(selectedState.toLowerCase()) || (selectedState === 'Uttar Pradesh' && col.location.toLowerCase().includes('noida'));
      const matchesDrcc = !drccOnly || col.drccApproved;

      return matchesSearch && matchesStream && matchesState && matchesDrcc;
    });
  }, [colleges, searchTerm, selectedStream, selectedState, drccOnly]);

  return (
    <section id="colleges" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5" />
            All India Top Colleges & Universities 2026-27
          </div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              Verified Colleges Directory ({colleges.length} Institutions)
            </h2>
            {onAddNewCollege && (
              <button
                onClick={onAddNewCollege}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                title="Add new college to database"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add College (कॉलेज जोड़ें)</span>
              </button>
            )}
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Top universities across Bihar, Delhi-NCR, Bengaluru, Pune, Dehradun & Bhubaneswar with direct DRCC Bihar bonafide approval.
          </p>
        </div>

        {/* Action Right: DRCC Toggle & Add College Mobile */}
        <div className="flex flex-wrap items-center gap-2">
          {onAddNewCollege && (
            <button
              onClick={onAddNewCollege}
              className="sm:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add College</span>
            </button>
          )}

          <button
            onClick={() => setDrccOnly(!drccOnly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              drccOnly 
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md' 
                : 'bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50'
            }`}
          >
            <ShieldCheck className={`w-4 h-4 ${drccOnly ? 'text-white' : 'text-emerald-600'}`} />
            <span>DRCC Bihar 100% Loan Approved Only</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${drccOnly ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
              {drccOnly ? 'ON' : 'ALL'}
            </span>
          </button>
        </div>
      </div>

      {/* Stream Tabs Bar */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {streams.map((stream) => {
          const isActive = selectedStream === stream;
          return (
            <button
              key={stream}
              onClick={() => setSelectedStream(stream)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {stream}
            </button>
          );
        })}
      </div>

      {/* Search & State Filter Controls */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by college name, city (e.g. Greater Noida, Bengaluru, Patna), or branch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-blue-600 transition-colors shadow-2xs text-slate-800"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        <div className="sm:col-span-4 flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">State:</span>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-blue-600 shadow-2xs text-slate-800 font-medium"
          >
            {states.map((s) => (
              <option key={s} value={s}>
                {s === 'All' ? 'All Indian States' : s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Stats Counter */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong>{filteredColleges.length}</strong> of {colleges.length} approved institutions
        </span>
        {selectedStream !== 'All' && (
          <span className="bg-blue-50 text-blue-800 font-semibold px-2 py-0.5 rounded-md">
            Filter: {selectedStream}
          </span>
        )}
      </div>

      {/* College Cards Grid */}
      {filteredColleges.length === 0 ? (
        <div className="mt-12 text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No colleges matched your search</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try resetting your search query or choosing "All" in streams/states.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedStream('All');
              setSelectedState('All');
              setDrccOnly(false);
            }}
            className="mt-4 px-4 py-2 bg-blue-700 text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((college) => (
            <div
              key={college.id}
              className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 relative"
            >
              {/* College Image Banner */}
              <div className="relative h-44 overflow-hidden bg-slate-800">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                {/* Badges Top Left & Right */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="bg-white/95 text-blue-900 font-bold text-[10px] px-2.5 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-500" />
                    {college.naacGrade}
                  </span>
                  {college.drccApproved && (
                    <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      DRCC ₹4L
                    </span>
                  )}
                </div>

                {/* Edit Button on Card (Top Right) */}
                {onEditCollege && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditCollege(college);
                    }}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white text-slate-800 hover:text-blue-700 p-1.5 rounded-lg shadow-md transition-all flex items-center gap-1 text-[10px] font-bold cursor-pointer"
                    title="Edit college details"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-blue-700" />
                    <span>Edit (एडिट)</span>
                  </button>
                )}

                {/* Bottom Details Overlay */}
                <div className="absolute bottom-2.5 left-3 right-3">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-sky-300 bg-slate-900/70 px-2 py-0.5 rounded-sm">
                    {college.stream}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-200 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span className="truncate">{college.location}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 
                    onClick={() => onSelectCollege(college)}
                    className="font-bold text-base text-slate-900 hover:text-blue-700 transition-colors cursor-pointer leading-snug line-clamp-2"
                  >
                    {college.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {college.tagline}
                  </p>

                  {/* Approvals Tags */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {college.approvals.slice(0, 3).map((app, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-md border border-slate-200">
                        {app}
                      </span>
                    ))}
                  </div>

                  {/* Key Stats: Fee & Placement */}
                  <div className="mt-4 grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Avg. Package</span>
                      <span className="font-bold text-emerald-700 text-sm flex items-center">
                        <Briefcase className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                        {college.avgPackage}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Starting Fees</span>
                      <span className="font-bold text-blue-900 text-sm flex items-center">
                        <IndianRupee className="w-3.5 h-3.5 mr-0.5 text-blue-700" />
                        ₹{(college.courses[0]?.annualFee / 1000).toFixed(0)}k/yr
                      </span>
                    </div>
                  </div>

                  {/* Popular Courses sample */}
                  <div className="mt-3 space-y-1">
                    <span className="text-[11px] font-semibold text-slate-600">Top Courses:</span>
                    <ul className="text-xs text-slate-700 space-y-0.5">
                      {college.courses.slice(0, 2).map((c, i) => (
                        <li key={i} className="flex items-center justify-between text-[11px] text-slate-600">
                          <span className="truncate max-w-[170px]">• {c.name}</span>
                          <span className="text-slate-500 font-medium">{c.duration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectCollege(college)}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-center cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onOpenInquiryWithCollege(college)}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 rounded-xl transition-all shadow-2xs text-center cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
