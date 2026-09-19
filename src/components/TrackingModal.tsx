import React, { useState } from 'react';
import { 
  X, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  ShieldCheck, 
  PhoneCall, 
  Calendar 
} from 'lucide-react';

interface TrackingModalProps {
  onClose: () => void;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({ onClose }) => {
  const [queryCode, setQueryCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setResult(null);

    const code = queryCode.trim();
    if (!code) {
      setErrorMsg('Please enter an Application Reference or Tracking ID.');
      return;
    }

    try {
      setIsSearching(true);
      if (code.toUpperCase().includes('DRCC') || code.toUpperCase().includes('MNSSBY')) {
        // Search DRCC
        const res = await fetch(`/api/drcc-applications/track/${encodeURIComponent(code)}`);
        const data = await res.json();
        if (data.success && data.data) {
          setResult({ type: 'drcc', ...data.data });
        } else {
          setErrorMsg('No DRCC application found with this reference number.');
        }
      } else {
        // Search Inquiry
        const res = await fetch(`/api/inquiries/track/${encodeURIComponent(code)}`);
        const data = await res.json();
        if (data.success && data.data) {
          setResult({ type: 'inquiry', ...data.data });
        } else {
          setErrorMsg('No admission inquiry found with this Tracking ID.');
        }
      }
    } catch (err: any) {
      setErrorMsg('Network error while searching status.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-blue-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg font-['Outfit',sans-serif]">
                Track Application Status
              </h2>
              <p className="text-xs text-slate-300">
                Check Counselling inquiry or DRCC Bihar status
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          {/* Search form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. AIC-2026-8921 or MNSSBY-DRCC-99042"
              value={queryCode}
              onChange={(e) => setQueryCode(e.target.value)}
              className="flex-1 px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-800 font-mono text-xs uppercase"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSearching ? 'Searching...' : 'Check Status'}
            </button>
          </form>

          {/* Error notice */}
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Result card */}
          {result && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    {result.type === 'drcc' ? 'Bihar Student Credit Card (DRCC)' : 'Admission Counselling Inquiry'}
                  </span>
                  <span className="font-extrabold text-blue-900 text-base font-mono">
                    {result.applicationNo || result.trackingId}
                  </span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {result.status}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant:</span>
                  <strong className="text-slate-900">{result.studentName || result.fullName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mobile:</span>
                  <span>{result.mobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">District:</span>
                  <span>{result.biharDistrict || result.district}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Course / Stream:</span>
                  <span className="font-semibold text-blue-800">{result.chosenCourse || result.interestedStream}</span>
                </div>
                {result.totalLoanRequired && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sanctioned Loan Estimate:</span>
                    <strong className="text-emerald-700">₹{Number(result.totalLoanRequired).toLocaleString('en-IN')}</strong>
                  </div>
                )}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Submitted on: {new Date(result.createdAt).toLocaleDateString('en-IN')}</span>
                <span className="text-blue-700 font-semibold">Counsellor Contact: 1800-889-2040</span>
              </div>
            </div>
          )}

          {/* Quick sample tips */}
          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-slate-600 text-[11px] space-y-1">
            <span className="font-bold text-blue-950 block">Quick Reference Tip:</span>
            <p>You can try sample IDs like <strong>AIC-2026-8921</strong> (Inquiry) or <strong>MNSSBY-DRCC-99042</strong> (DRCC Application) to test the live tracking engine.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
