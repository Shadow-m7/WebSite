import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check,
  IndianRupee,
  FileCheck2,
  Calendar
} from 'lucide-react';

interface DrccApplyModalProps {
  onClose: () => void;
  onApplicationSubmitted?: (appNo: string) => void;
}

export const DrccApplyModal: React.FC<DrccApplyModalProps> = ({
  onClose,
  onApplicationSubmitted,
}) => {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    mobile: '',
    email: '',
    aadhaarNo: '',
    gender: 'Female',
    biharDistrict: 'Patna',
    twelfthBoard: 'BSEB',
    twelfthRollCode: '',
    twelfthRollNo: '',
    twelfthPassingYear: '2025',
    twelfthPercentage: '72',
    chosenCollege: 'Galgotias University & Institute of Technology',
    chosenCourse: 'B.Tech Computer Science & Engg',
    courseDurationYears: '4',
    annualTuitionFee: '80000',
    hostelLivingFee: '20000',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [applicationNo, setApplicationNo] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const biharDistricts = [
    'Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Samastipur', 'Purnia',
    'Begusarai', 'Saran (Chhapra)', 'Siwan', 'Gopalganj', 'Madhubani', 'Saharsa',
    'Rohtas (Sasaram)', 'Nalanda (Bihar Sharif)', 'Bhojpur (Ara)', 'Vaishali (Hajipur)',
    'Katihar', 'Motihari (East Champaran)', 'Bettiah (West Champaran)', 'Buxar',
    'Jehanabad', 'Aurangabad', 'Nawada', 'Jamui', 'Khagaria', 'Munger', 'Sitamarhi',
    'Madhepura', 'Kishanganj', 'Araria', 'Supaul', 'Banka', 'Kaimur (Bhabhua)', 'Lakhisarai',
    'Sheikhpura', 'Arwal', 'Sheohar'
  ];

  const popularCourses = [
    'B.Tech Computer Science & Engg',
    'B.Tech AI & Machine Learning',
    'B.Tech Civil Engineering',
    'B.Tech Mechanical Engineering',
    'Bachelor of Pharmacy (B.Pharma)',
    'Diploma in Pharmacy (D.Pharma)',
    'B.Sc Nursing (4 Years)',
    'General Nursing & Midwifery (GNM)',
    'Polytechnic Diploma (SBTE)',
    'Bachelor of Business Admin (BBA)',
    'Bachelor of Computer Apps (BCA)',
    'MBBS (Medical Bachelor)',
    'Hotel Management (BHM)'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.studentName.trim() || !formData.mobile.trim() || !formData.aadhaarNo.trim() || !formData.chosenCourse.trim()) {
      setErrorMsg('Please complete all compulsory fields.');
      return;
    }

    if (formData.aadhaarNo.replace(/[^0-9]/g, '').length !== 12) {
      setErrorMsg('Please enter a valid 12-digit Aadhaar card number.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/drcc-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit application');
      }

      setApplicationNo(data.applicationNo);
      if (onApplicationSubmitted) {
        onApplicationSubmitted(data.applicationNo);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error submitting DRCC pre-registration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    if (applicationNo) {
      navigator.clipboard.writeText(applicationNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-lg sm:text-xl font-['Outfit',sans-serif]">
                  Bihar Student Credit Card (DRCC) Registration
                </h2>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  MNSSBY
                </span>
              </div>
              <p className="text-xs text-emerald-200">
                Direct Pre-Registration for ₹4 Lakhs Government Education Loan
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

        {/* Form Body or Success Screen */}
        <div className="p-5 sm:p-6 overflow-y-auto text-xs sm:text-sm">
          {applicationNo ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                DRCC Pre-Registration Successful!
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Your application for <strong>{formData.chosenCourse}</strong> has been logged in our state student registry. Our DRCC liaison team will verify your bonafide and schedule your district verification appointment.
              </p>

              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 max-w-sm mx-auto">
                <span className="text-[11px] text-emerald-800 uppercase tracking-wider block font-semibold">
                  DRCC Bihar Reference Application Number
                </span>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-lg font-black text-emerald-950 tracking-wider">
                    {applicationNo}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-700 hover:text-emerald-900 cursor-pointer"
                    title="Copy reference code"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Close & Return
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Student Name & Father's Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="As on 10th marksheet"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-emerald-600 outline-none text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Father's / Guardian's Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Father's full name"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-emerald-600 outline-none text-slate-800"
                  />
                </div>
              </div>

              {/* Mobile, Email & Aadhaar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Mobile Number (Aadhaar Linked) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9835144520"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-emerald-600 outline-none text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">12-Digit Aadhaar No *</label>
                  <input
                    type="text"
                    required
                    maxLength={12}
                    placeholder="12 digit Aadhaar"
                    value={formData.aadhaarNo}
                    onChange={(e) => setFormData({ ...formData, aadhaarNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-emerald-600 outline-none text-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-emerald-600 outline-none text-slate-800 font-medium"
                  >
                    <option value="Female">Female (1% Interest)</option>
                    <option value="Male">Male (4% Interest)</option>
                    <option value="Divyang">Divyang / PwD (1% Interest)</option>
                    <option value="Transgender">Transgender (1% Interest)</option>
                  </select>
                </div>
              </div>

              {/* Bihar District & 12th Board Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Home District in Bihar *</label>
                  <select
                    value={formData.biharDistrict}
                    onChange={(e) => setFormData({ ...formData, biharDistrict: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-emerald-600 outline-none text-slate-800 font-medium"
                  >
                    {biharDistricts.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">12th Board</label>
                  <select
                    value={formData.twelfthBoard}
                    onChange={(e) => setFormData({ ...formData, twelfthBoard: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-emerald-600 outline-none text-slate-800 font-medium"
                  >
                    <option value="BSEB">Bihar Board (BSEB Patna)</option>
                    <option value="CBSE">CBSE Board</option>
                    <option value="ICSE">ICSE Board</option>
                    <option value="Other">Other State Board</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">12th Percentage %</label>
                  <input
                    type="number"
                    min="35"
                    max="100"
                    placeholder="e.g. 74"
                    value={formData.twelfthPercentage}
                    onChange={(e) => setFormData({ ...formData, twelfthPercentage: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-emerald-600 outline-none text-slate-800"
                  />
                </div>
              </div>

              {/* 12th Roll Code & Roll No (for BSEB verification) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    12th Roll Code (BSEB / Board)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 11042"
                    value={formData.twelfthRollCode}
                    onChange={(e) => setFormData({ ...formData, twelfthRollCode: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:border-emerald-600 outline-none text-slate-800 font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    12th Roll Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 24010329"
                    value={formData.twelfthRollNo}
                    onChange={(e) => setFormData({ ...formData, twelfthRollNo: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:border-emerald-600 outline-none text-slate-800 font-mono text-xs"
                  />
                </div>
              </div>

              {/* Chosen Course & College */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Desired Course (DRCC Approved) *</label>
                  <select
                    value={formData.chosenCourse}
                    onChange={(e) => setFormData({ ...formData, chosenCourse: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-emerald-600 outline-none text-slate-800 font-medium"
                  >
                    {popularCourses.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">College Preference / Enrolled College</label>
                  <input
                    type="text"
                    placeholder="e.g. Galgotias / MIT / Oxford Bangalore"
                    value={formData.chosenCollege}
                    onChange={(e) => setFormData({ ...formData, chosenCollege: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-emerald-600 outline-none text-slate-800"
                  />
                </div>
              </div>

              {/* Loan Ceiling Notice */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium">
                  <IndianRupee className="w-4 h-4 text-emerald-600" />
                  Total Maximum Loan Covered: <strong>₹4,00,000 (Four Lakhs)</strong>
                </span>
                <span className="text-[11px] text-emerald-700 font-bold">100% Collateral Free</span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3">
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
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Registering...' : 'Submit DRCC Application'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
