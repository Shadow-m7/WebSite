import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  GraduationCap, 
  ShieldCheck, 
  Copy, 
  Check,
  Building2
} from 'lucide-react';
import { College } from '../types';

interface InquiryModalProps {
  college?: College | null;
  onClose: () => void;
  onInquirySubmitted?: (trackingId: string) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  college,
  onClose,
  onInquirySubmitted,
}) => {
  const [formData, setFormData] = useState<{
    fullName: string;
    mobile: string;
    email: string;
    state: string;
    district: string;
    tenthMarks: string;
    twelfthMarks: string;
    interestedStream: string;
    drccAssistanceNeeded: boolean;
    message: string;
  }>({
    fullName: '',
    mobile: '',
    email: '',
    state: 'Bihar',
    district: 'Patna',
    tenthMarks: '',
    twelfthMarks: '',
    interestedStream: college ? college.stream : 'Engineering (B.Tech)',
    drccAssistanceNeeded: true,
    message: college ? `Inquiring about admission in ${college.name}` : ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const biharDistricts = [
    'Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Samastipur', 'Purnia',
    'Begusarai', 'Saran (Chhapra)', 'Siwan', 'Gopalganj', 'Madhubani', 'Saharsa',
    'Rohtas (Sasaram)', 'Nalanda (Bihar Sharif)', 'Bhojpur (Ara)', 'Vaishali (Hajipur)',
    'Katihar', 'Motihari (East Champaran)', 'Bettiah (West Champaran)', 'Buxar',
    'Jehanabad', 'Aurangabad', 'Nawada', 'Jamui', 'Khagaria', 'Munger', 'Sitamarhi'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim() || !formData.mobile.trim() || !formData.email.trim()) {
      setErrorMsg('Name, Mobile, and Email are required.');
      return;
    }

    const cleanMobile = formData.mobile.replace(/[^0-9]/g, '');
    if (cleanMobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          preferredCollegeId: college ? college.id : undefined
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit inquiry');
      }

      setTrackingId(data.trackingId);
      if (onInquirySubmitted) {
        onInquirySubmitted(data.trackingId);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error registering counselling request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    if (trackingId) {
      navigator.clipboard.writeText(trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg sm:text-xl font-['Outfit',sans-serif]">
                {college ? `Apply to ${college.shortName}` : 'Free Counselling & Seat Booking'}
              </h2>
              <p className="text-xs text-slate-300">
                100% Free guidance on college admission & DRCC Bihar loan scheme
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

        {/* Form or Success Screen */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {trackingId ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                Counselling Request Registered!
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. A dedicated senior admission officer will call you within 15 minutes to guide you on colleges, fees, and the DRCC Bihar loan process.
              </p>

              {/* Tracking ID badge */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-sm mx-auto">
                <span className="text-[11px] text-slate-500 uppercase tracking-wider block">
                  Your Application Tracking Reference
                </span>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-lg font-black text-blue-900 tracking-wider">
                    {trackingId}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-blue-700 cursor-pointer"
                    title="Copy tracking code"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Done & Back to Portal
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Full Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Kumar"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">WhatsApp / Calling Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9835144520"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-800"
                  />
                </div>
              </div>

              {/* Email & District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rahul@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">District in Bihar</label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-800 font-medium"
                  >
                    {biharDistricts.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Marks & Stream */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Interested Stream</label>
                  <select
                    value={formData.interestedStream}
                    onChange={(e) => setFormData({ ...formData, interestedStream: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-800 font-medium"
                  >
                    <option value="Engineering (B.Tech)">Engineering (B.Tech)</option>
                    <option value="Medical (MBBS/BAMS)">Medical (MBBS/BAMS)</option>
                    <option value="Management (MBA/BBA)">Management (MBA/BBA)</option>
                    <option value="Pharmacy (B.Pharma/D.Pharma)">Pharmacy (B.Pharma/D.Pharma)</option>
                    <option value="Nursing & Paramedical">Nursing & Paramedical</option>
                    <option value="Polytechnic Diploma">Polytechnic Diploma</option>
                    <option value="Computer Apps (BCA/MCA)">Computer Apps (BCA/MCA)</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">12th Marks / Percentage</label>
                  <input
                    type="text"
                    placeholder="e.g. 74.5% or Appearing"
                    value={formData.twelfthMarks}
                    onChange={(e) => setFormData({ ...formData, twelfthMarks: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-800"
                  />
                </div>
              </div>

              {/* DRCC Checkbox */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="drccCheck"
                  checked={formData.drccAssistanceNeeded}
                  onChange={(e) => setFormData({ ...formData, drccAssistanceNeeded: e.target.checked })}
                  className="mt-1 w-4 h-4 accent-emerald-600 cursor-pointer"
                />
                <label htmlFor="drccCheck" className="text-xs text-emerald-950 font-medium cursor-pointer">
                  <strong>I need Bihar Student Credit Card (DRCC ₹4 Lakhs) Assistance</strong>
                  <span className="block text-[11px] text-emerald-700">
                    We will provide bonafide certificate coordination and step-by-step DRCC verification support.
                  </span>
                </label>
              </div>

              {/* Message */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Specific Query / College Preference</label>
                <textarea
                  rows={2}
                  placeholder="Any particular college or branch you want? Tell our counsellors..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-800"
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-extrabold shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Registering...' : 'Request Free Counselling'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
