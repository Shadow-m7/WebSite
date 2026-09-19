import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  PhoneCall, 
  Mail, 
  Building2, 
  User, 
  MapPin, 
  GraduationCap, 
  IndianRupee, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface NewPostModalProps {
  onClose: () => void;
  onPostCreated: () => void;
}

export const NewPostModal: React.FC<NewPostModalProps> = ({
  onClose,
  onPostCreated,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    authorRole: 'College Representative',
    organization: '',
    mobile: '',
    email: '',
    category: 'Admission Alert',
    courseOrStream: 'Engineering (B.Tech)',
    location: '',
    feeDetails: '',
    seatsRemaining: '',
    content: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.title.trim() || !formData.authorName.trim() || !formData.mobile.trim() || !formData.email.trim() || !formData.content.trim()) {
      setErrorMsg('Please fill all mandatory fields (Title, Name, Mobile, Email, and Content).');
      return;
    }

    // Phone validation
    const digitsOnly = formData.mobile.replace(/[^0-9]/g, '');
    if (digitsOnly.length < 10) {
      setErrorMsg('Please provide a valid 10-digit mobile number for students/clients to contact you.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit post');
      }

      setIsSuccess(true);
      onPostCreated();
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while publishing the post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 to-blue-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg sm:text-xl font-['Outfit',sans-serif]">
                Publish Admission Notice / Post
              </h2>
              <p className="text-xs text-slate-300">
                Share updates, college seat vacancies, or queries with full contact details.
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

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {isSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Post published successfully! Refreshing notice board...</span>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Notice / Post Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Direct B.Tech CSE Admission 2026 under DRCC Bihar with 100% Loan"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-800"
            />
          </div>

          {/* Category & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-800 font-medium"
              >
                <option value="Admission Alert">Admission Alert</option>
                <option value="DRCC Seat Availability">DRCC Seat Availability</option>
                <option value="Direct Admission">Direct Admission</option>
                <option value="Scholarship Notice">Scholarship Notice</option>
                <option value="Student Review / Query">Student Review / Query</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Your Role *</label>
              <select
                value={formData.authorRole}
                onChange={(e) => setFormData({ ...formData, authorRole: e.target.value as any })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-800 font-medium"
              >
                <option value="College Representative">College Representative / Admission Officer</option>
                <option value="Senior Counsellor">Senior Educational Counsellor</option>
                <option value="Education Consultant">Education Consultant / Agency</option>
                <option value="Student / Aspirant">Student / Aspirant</option>
                <option value="Alumni">College Alumni</option>
              </select>
            </div>
          </div>

          {/* Author Name & Organization */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Author Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Er. Ankit Verma"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-800"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">College / Organization Name</label>
              <input
                type="text"
                placeholder="e.g. Galgotias University Admission Cell"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-800"
              />
            </div>
          </div>

          {/* Contact Details (Mobile & Email) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-blue-50/60 p-3 rounded-2xl border border-blue-100">
            <div>
              <label className="font-bold text-blue-900 block mb-1 flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                <span>Contact Mobile (Call/WhatsApp) *</span>
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 9835144520"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-blue-200 rounded-xl focus:border-blue-600 outline-none text-slate-800 font-semibold"
              />
            </div>
            <div>
              <label className="font-bold text-blue-900 block mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>Official / Contact Email *</span>
              </label>
              <input
                type="email"
                required
                placeholder="e.g. admissions@college.edu.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-blue-200 rounded-xl focus:border-blue-600 outline-none text-slate-800"
              />
            </div>
          </div>

          {/* Course, Location, Fee Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target Course/Stream</label>
              <input
                type="text"
                placeholder="e.g. B.Tech / B.Pharma / Nursing"
                value={formData.courseOrStream}
                onChange={(e) => setFormData({ ...formData, courseOrStream: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-800 text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Campus Location</label>
              <input
                type="text"
                placeholder="e.g. Greater Noida / Bengaluru"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-800 text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Fee or Package Details</label>
              <input
                type="text"
                placeholder="e.g. ₹1.25 Lakh/yr (DRCC 100%)"
                value={formData.feeDetails}
                onChange={(e) => setFormData({ ...formData, feeDetails: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-800 text-xs"
              />
            </div>
          </div>

          {/* Post Content */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Detailed Description & Notice Information *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe available branches, eligibility criteria, DRCC bonafide letter process, hostel facility, and how students can reach you..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-800 leading-relaxed"
            ></textarea>
          </div>

          {/* Submit button */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Publishing...' : 'Publish Notice'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
