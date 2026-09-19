import React, { useState, useEffect } from 'react';
import { 
  X, 
  Building2, 
  Save, 
  AlertCircle, 
  IndianRupee, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Award,
  Sparkles
} from 'lucide-react';
import { College, StreamType } from '../types';

interface CollegeEditModalProps {
  college?: College | null; // if null, creating new college
  onClose: () => void;
  onSaved: (savedCollege: College) => void;
}

export const CollegeEditModal: React.FC<CollegeEditModalProps> = ({
  college,
  onClose,
  onSaved,
}) => {
  const isEditing = !!college;

  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    tagline: '',
    location: '',
    state: 'Bihar',
    type: 'Private',
    stream: 'Engineering (B.Tech)' as StreamType,
    annualFee: '120000',
    drccApproved: true,
    naacGrade: 'A+',
    approvalsText: 'AICTE, UGC, NAAC, DRCC Approved',
    ranking: 'Top Tier Accredited',
    avgPackage: '₹6.5 LPA',
    highestPackage: '₹24 LPA',
    topRecruitersText: 'TCS, Wipro, Infosys, Amazon, Cognizant',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80',
    phone: '+91 9241160787',
    email: 'masumkhaniva041@gmail.com',
    website: 'https://allindiacounselling.org',
    description: '',
    hostelAvailable: true,
    scholarshipAvailable: true,
    featured: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const indianStates = [
    'Bihar',
    'Delhi-NCR',
    'Uttar Pradesh',
    'Karnataka',
    'Maharashtra',
    'Odisha',
    'Punjab',
    'Uttarakhand',
    'West Bengal',
    'Rajasthan',
    'Tamil Nadu',
    'Madhya Pradesh',
    'Haryana',
    'Gujarat',
    'Telangana'
  ];

  const streamOptions: StreamType[] = [
    'Engineering (B.Tech)',
    'Medical (MBBS/BAMS)',
    'Management (MBA/BBA)',
    'Pharmacy (B.Pharma/D.Pharma)',
    'Nursing & Paramedical',
    'Polytechnic Diploma',
    'Computer Apps (BCA/MCA)'
  ];

  useEffect(() => {
    if (college) {
      setFormData({
        name: college.name,
        shortName: college.shortName,
        tagline: college.tagline,
        location: college.location,
        state: college.state,
        type: college.type,
        stream: college.stream,
        annualFee: college.courses && college.courses[0] ? String(college.courses[0].annualFee) : '120000',
        drccApproved: college.drccApproved,
        naacGrade: college.naacGrade,
        approvalsText: college.approvals.join(', '),
        ranking: college.ranking,
        avgPackage: college.avgPackage,
        highestPackage: college.highestPackage,
        topRecruitersText: college.topRecruiters.join(', '),
        image: college.image,
        phone: college.phone,
        email: college.email,
        website: college.website,
        description: college.description,
        hostelAvailable: Boolean(college.hostelAvailable),
        scholarshipAvailable: Boolean(college.scholarshipAvailable),
        featured: Boolean(college.featured)
      });
    }
  }, [college]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.location.trim() || !formData.phone.trim()) {
      setErrorMsg('College Name, Location, and Contact Phone are required.');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      shortName: formData.shortName.trim() || formData.name.split(' ')[0],
      tagline: formData.tagline.trim() || 'Accredited Institution for Higher Studies',
      location: formData.location.trim(),
      state: formData.state,
      type: formData.type,
      stream: formData.stream,
      courses: [
        {
          code: 'MAIN',
          name: `${formData.stream} Main Program`,
          duration: '3-4 Years',
          annualFee: Number(formData.annualFee) || 100000,
          totalSeats: 120,
          eligibility: '12th Pass with required marks',
          drccEligible: formData.drccApproved
        }
      ],
      drccApproved: formData.drccApproved,
      naacGrade: formData.naacGrade.trim(),
      approvals: formData.approvalsText.split(',').map(s => s.trim()).filter(Boolean),
      ranking: formData.ranking.trim(),
      avgPackage: formData.avgPackage.trim(),
      highestPackage: formData.highestPackage.trim(),
      topRecruiters: formData.topRecruitersText.split(',').map(s => s.trim()).filter(Boolean),
      image: formData.image.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      website: formData.website.trim(),
      description: formData.description.trim() || 'Approved partner college listed for student admission and DRCC Bihar loan.',
      hostelAvailable: formData.hostelAvailable,
      scholarshipAvailable: formData.scholarshipAvailable,
      featured: formData.featured
    };

    try {
      setIsSubmitting(true);
      const url = isEditing ? `/api/colleges/${college.id}` : '/api/colleges';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Error saving college details.');
      }

      onSaved(data.data);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Server error while saving college.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg font-['Outfit',sans-serif]">
                {isEditing ? `Edit College: ${college.name}` : 'Add New College / University (कॉलेज जोड़ें)'}
              </h2>
              <p className="text-xs text-blue-200">
                All India College & DRCC Bihar database live editor
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

        {/* Form */}
        <div className="p-5 sm:p-6 overflow-y-auto text-xs sm:text-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* College Full Name & Short Name */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">
                  Full College / University Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vellore Institute of Technology"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900 font-medium"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Short Display Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. VIT Vellore"
                  value={formData.shortName}
                  onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900"
                />
              </div>
            </div>

            {/* Tagline */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                College Highlight / Tagline
              </label>
              <input
                type="text"
                placeholder="e.g. NAAC A++ Accredited with 100% Placement & DRCC Bihar Approval"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900 text-xs"
              />
            </div>

            {/* Location, State, Type */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">City / Campus Location *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vellore, Tamil Nadu"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">State in India *</label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900 font-medium"
                >
                  {indianStates.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Institution Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900 font-medium"
                >
                  <option value="Private">Private University</option>
                  <option value="Government">Government Institute</option>
                  <option value="Autonomous">Autonomous College</option>
                  <option value="Deemed">Deemed to be University</option>
                </select>
              </div>
            </div>

            {/* Stream, Annual Tuition Fee & NAAC Grade */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Primary Stream *</label>
                <select
                  value={formData.stream}
                  onChange={(e) => setFormData({ ...formData, stream: e.target.value as StreamType })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900 font-medium"
                >
                  {streamOptions.map((str) => (
                    <option key={str} value={str}>{str}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Annual Tuition Fee (₹) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 140000"
                    value={formData.annualFee}
                    onChange={(e) => setFormData({ ...formData, annualFee: e.target.value })}
                    className="w-full pl-8 pr-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">NAAC Grade / Accreditation</label>
                <input
                  type="text"
                  placeholder="e.g. A++ / A+ / NBA"
                  value={formData.naacGrade}
                  onChange={(e) => setFormData({ ...formData, naacGrade: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900 font-semibold"
                />
              </div>
            </div>

            {/* DRCC Bihar Approved Toggle */}
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <div>
                  <strong className="text-emerald-950 block text-xs">
                    Bihar Student Credit Card (DRCC ₹4 Lakhs) Eligible?
                  </strong>
                  <span className="text-[11px] text-emerald-800">
                    College issues Bonafide & Fee Structure for DRCC approval
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.drccApproved}
                  onChange={(e) => setFormData({ ...formData, drccApproved: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {/* Approvals & Ranking */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Approvals (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. AICTE, UGC, PCI, NMC, NAAC A+"
                  value={formData.approvalsText}
                  onChange={(e) => setFormData({ ...formData, approvalsText: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Ranking / Recognition</label>
                <input
                  type="text"
                  placeholder="e.g. NIRF Rank 25 in India"
                  value={formData.ranking}
                  onChange={(e) => setFormData({ ...formData, ranking: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900 text-xs"
                />
              </div>
            </div>

            {/* Average & Highest Package */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Average Placement Package</label>
                <input
                  type="text"
                  placeholder="e.g. ₹7.5 LPA"
                  value={formData.avgPackage}
                  onChange={(e) => setFormData({ ...formData, avgPackage: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Highest Placement Package</label>
                <input
                  type="text"
                  placeholder="e.g. ₹54 LPA"
                  value={formData.highestPackage}
                  onChange={(e) => setFormData({ ...formData, highestPackage: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900"
                />
              </div>
            </div>

            {/* Top Recruiters */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Top Recruiters (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. Microsoft, Amazon, Google, TCS, Infosys, Wipro"
                value={formData.topRecruitersText}
                onChange={(e) => setFormData({ ...formData, topRecruitersText: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900 text-xs"
              />
            </div>

            {/* Contact Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Official Admission Contact Phone *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +91 9241160787"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Admission Desk Email</label>
                <input
                  type="email"
                  placeholder="e.g. admission@vit.ac.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900"
                />
              </div>
            </div>

            {/* Image URL & Website */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Campus Image URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900 text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Official Website</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900 text-xs"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">College Overview / Description</label>
              <textarea
                rows={2}
                placeholder="Key highlights, lab facilities, hostel environment, and DRCC support details..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900 text-xs"
              ></textarea>
            </div>

            {/* Submit buttons */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
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
                <Save className="w-4 h-4" />
                <span>{isSubmitting ? 'Saving...' : isEditing ? 'Save Changes (अपडेट करें)' : 'Add College (कॉलेज सेव करें)'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
