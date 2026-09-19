import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Building2, 
  PhoneCall, 
  FileText, 
  Edit3, 
  Trash2, 
  Plus, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  Search,
  IndianRupee,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { College, ClientPost, ContactInfo } from '../types';

interface ManagePortalModalProps {
  colleges: College[];
  posts: ClientPost[];
  contactInfo: ContactInfo;
  onClose: () => void;
  onEditCollege: (college: College) => void;
  onAddNewCollege: () => void;
  onCollegeDeleted: (collegeId: string) => void;
  onContactInfoUpdated: (updated: ContactInfo) => void;
  onPostDeleted: (postId: string) => void;
  onRefreshAllData: () => void;
}

export const ManagePortalModal: React.FC<ManagePortalModalProps> = ({
  colleges,
  posts,
  contactInfo,
  onClose,
  onEditCollege,
  onAddNewCollege,
  onCollegeDeleted,
  onContactInfoUpdated,
  onPostDeleted,
  onRefreshAllData
}) => {
  const [activeTab, setActiveTab] = useState<'colleges' | 'contact' | 'posts'>('colleges');
  const [collegeSearch, setCollegeSearch] = useState('');
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  // Contact form state
  const [contactForm, setContactForm] = useState<ContactInfo>({ ...contactInfo });
  const [isSavingContact, setIsSavingContact] = useState(false);
  const [contactSuccessMsg, setContactSuccessMsg] = useState('');
  const [contactErrorMsg, setContactErrorMsg] = useState('');

  // Re-seed state
  const [isReSeeding, setIsReSeeding] = useState(false);
  const [seedSuccessMsg, setSeedSuccessMsg] = useState('');

  // Filter colleges
  const filteredColleges = colleges.filter((c) =>
    c.name.toLowerCase().includes(collegeSearch.toLowerCase()) ||
    c.location.toLowerCase().includes(collegeSearch.toLowerCase()) ||
    c.state.toLowerCase().includes(collegeSearch.toLowerCase()) ||
    c.stream.toLowerCase().includes(collegeSearch.toLowerCase())
  );

  const handleDeleteCollege = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      setIsDeletingId(id);
      const res = await fetch(`/api/colleges/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        onCollegeDeleted(id);
      }
    } catch (err) {
      alert('Failed to delete college');
    } finally {
      setIsDeletingId(null);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;

    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        onPostDeleted(id);
      }
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccessMsg('');
    setContactErrorMsg('');
    try {
      setIsSavingContact(true);
      const res = await fetch('/api/contact-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      const data = await res.json();
      if (data.success) {
        setContactSuccessMsg('Helpline & office addresses updated successfully!');
        onContactInfoUpdated(data.data);
        setTimeout(() => setContactSuccessMsg(''), 3500);
      } else {
        setContactErrorMsg('Failed to update contact info.');
      }
    } catch (err) {
      setContactErrorMsg('Error saving contact details.');
    } finally {
      setIsSavingContact(false);
    }
  };

  const handleResetSeed = async () => {
    if (!window.confirm('Reload All-India verified colleges and universities database?')) return;
    try {
      setIsReSeeding(true);
      const res = await fetch('/api/reset-seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSeedSuccessMsg('Database reloaded with All India institutions!');
        onRefreshAllData();
        setTimeout(() => setSeedSuccessMsg(''), 3000);
      }
    } catch (err) {
      alert('Failed to reload database');
    } finally {
      setIsReSeeding(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base sm:text-lg font-['Outfit',sans-serif]">
                  Portal Management & Edit Desk (एडिट व प्रबंधन सेंटर)
                </h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Live DB
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Manage all Indian colleges, helpline numbers, and community notices
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

        {/* Tab Navigation */}
        <div className="bg-slate-100 px-5 py-2.5 border-b border-slate-200 flex items-center justify-between gap-2 overflow-x-auto shrink-0 text-xs font-bold">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('colleges')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'colleges'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Colleges & Universities ({colleges.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'contact'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Helplines & Offices</span>
            </button>

            <button
              onClick={() => setActiveTab('posts')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'posts'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Notice Board ({posts.length})</span>
            </button>
          </div>

          <button
            onClick={handleResetSeed}
            disabled={isReSeeding}
            className="text-[11px] text-blue-700 hover:text-blue-900 flex items-center gap-1 font-semibold cursor-pointer shrink-0"
            title="Reload verified All India colleges"
          >
            <RefreshCw className={`w-3 h-3 ${isReSeeding ? 'animate-spin' : ''}`} />
            <span>Reload All India Data</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {seedSuccessMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{seedSuccessMsg}</span>
            </div>
          )}

          {/* TAB 1: COLLEGES & UNIVERSITIES */}
          {activeTab === 'colleges' && (
            <div className="space-y-4">
              {/* Search + Add Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by college name, city, state, or course..."
                    value={collegeSearch}
                    onChange={(e) => setCollegeSearch(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-xs text-slate-900"
                  />
                </div>

                <button
                  onClick={onAddNewCollege}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add New College (कॉलेज जोड़ें)</span>
                </button>
              </div>

              {/* Table / List */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">College & University</th>
                        <th className="p-3">State / City</th>
                        <th className="p-3">Stream</th>
                        <th className="p-3">Fee / Year</th>
                        <th className="p-3">DRCC Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredColleges.map((col) => (
                        <tr key={col.id} className="hover:bg-blue-50/40 transition-colors">
                          <td className="p-3 font-semibold text-slate-900">
                            <div>
                              <span>{col.name}</span>
                              <span className="block text-[10px] text-slate-400">{col.ranking}</span>
                            </div>
                          </td>
                          <td className="p-3 text-slate-600">
                            <span className="font-medium">{col.state}</span>
                            <span className="block text-[10px] text-slate-400">{col.location}</span>
                          </td>
                          <td className="p-3 text-slate-600 font-medium">
                            {col.stream}
                          </td>
                          <td className="p-3 font-bold text-slate-900">
                            ₹{col.courses[0] ? col.courses[0].annualFee.toLocaleString('en-IN') : 'N/A'}
                          </td>
                          <td className="p-3">
                            {col.drccApproved ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                ₹4L DRCC Eligible
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
                                Self Financed
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => onEditCollege(col)}
                                className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors"
                                title="Edit this college"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteCollege(col.id, col.name)}
                                disabled={isDeletingId === col.id}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                title="Delete college"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HELPLINES & OFFICES */}
          {activeTab === 'contact' && (
            <form onSubmit={handleSaveContact} className="space-y-4 max-w-2xl mx-auto text-xs sm:text-sm">
              {contactSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{contactSuccessMsg}</span>
                </div>
              )}
              {contactErrorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{contactErrorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    National Toll-Free Helpline *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.helplineTollFree}
                    onChange={(e) => setContactForm({ ...contactForm, helplineTollFree: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    WhatsApp Helpline Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.whatsappNumber}
                    onChange={(e) => setContactForm({ ...contactForm, whatsappNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900 font-bold text-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Direct Counsellor Line 1
                  </label>
                  <input
                    type="text"
                    value={contactForm.counsellingHotline1}
                    onChange={(e) => setContactForm({ ...contactForm, counsellingHotline1: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Direct Counsellor Line 2
                  </label>
                  <input
                    type="text"
                    value={contactForm.counsellingHotline2}
                    onChange={(e) => setContactForm({ ...contactForm, counsellingHotline2: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Official Admission Email</label>
                  <input
                    type="email"
                    required
                    value={contactForm.officialEmail}
                    onChange={(e) => setContactForm({ ...contactForm, officialEmail: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">DRCC Dedicated Email</label>
                  <input
                    type="email"
                    value={contactForm.drccEmail}
                    onChange={(e) => setContactForm({ ...contactForm, drccEmail: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900"
                  />
                </div>
              </div>

              {/* Patna, Delhi, Bangalore Addresses */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Patna DRCC Liaison Office Address</label>
                <input
                  type="text"
                  value={contactForm.addressPatna}
                  onChange={(e) => setContactForm({ ...contactForm, addressPatna: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">New Delhi Head Office</label>
                  <input
                    type="text"
                    value={contactForm.addressDelhi}
                    onChange={(e) => setContactForm({ ...contactForm, addressDelhi: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Bengaluru Tech Desk</label>
                  <input
                    type="text"
                    value={contactForm.addressBangalore}
                    onChange={(e) => setContactForm({ ...contactForm, addressBangalore: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Working Hours</label>
                <input
                  type="text"
                  value={contactForm.workingHours}
                  onChange={(e) => setContactForm({ ...contactForm, workingHours: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-none text-slate-900 text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  disabled={isSavingContact}
                  className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingContact ? 'Updating...' : 'Save Helpline & Contact Numbers'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: NOTICE BOARD POSTS */}
          {activeTab === 'posts' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-500 mb-2">
                Manage community and partner notices. You can remove obsolete announcements or fraudulent submissions.
              </div>

              <div className="space-y-2.5">
                {posts.map((p) => (
                  <div key={p.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{p.title}</span>
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                          {p.category}
                        </span>
                      </div>
                      <div className="text-slate-500 text-[11px] flex items-center gap-3">
                        <span>By: <strong>{p.authorName}</strong> ({p.organization})</span>
                        <span>Phone: <strong>{p.mobile}</strong></span>
                        <span>Likes: {p.likes}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeletePost(p.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title="Delete notice"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
