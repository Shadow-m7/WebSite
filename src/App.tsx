import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CollegesSection } from './components/CollegesSection';
import { CollegeDetailsModal } from './components/CollegeDetailsModal';
import { CollegeEditModal } from './components/CollegeEditModal';
import { ManagePortalModal } from './components/ManagePortalModal';
import { DrccSection } from './components/DrccSection';
import { PostBoardSection } from './components/PostBoardSection';
import { NewPostModal } from './components/NewPostModal';
import { InquiryModal } from './components/InquiryModal';
import { DrccApplyModal } from './components/DrccApplyModal';
import { TrackingModal } from './components/TrackingModal';
import { Footer } from './components/Footer';
import { QuickContactFloating } from './components/QuickContactFloating';
import { College, ClientPost, ContactInfo } from './types';
import { 
  Building2, 
  ShieldCheck, 
  FileText, 
  Calculator, 
  PhoneCall, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Settings,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const defaultContactInfo: ContactInfo = {
  helplineTollFree: "1800-889-2040",
  whatsappNumber: "+91 98351 44520",
  counsellingHotline1: "+91 94702 11985",
  counsellingHotline2: "+91 79034 56210",
  officialEmail: "admission@allindiacounselling.org",
  drccEmail: "drcc.help@allindiacounselling.org",
  addressPatna: "Shree Krishna Complex, 2nd Floor, Boring Road Crossing, Patna, Bihar - 800001",
  addressDelhi: "Barakhamba Road, Connaught Place, New Delhi - 110001",
  addressBangalore: "Near Electronic City Phase 1, Hosur Road, Bengaluru, Karnataka - 560100",
  workingHours: "Monday to Saturday: 9:00 AM - 8:00 PM (IST)"
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [colleges, setColleges] = useState<College[]>([]);
  const [posts, setPosts] = useState<ClientPost[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedStream, setSelectedStream] = useState<string>('All');

  // Modals state
  const [selectedCollegeForDetails, setSelectedCollegeForDetails] = useState<College | null>(null);
  const [collegeForEdit, setCollegeForEdit] = useState<College | null>(null);
  const [isCollegeEditOpen, setIsCollegeEditOpen] = useState<boolean>(false);
  const [isManageOpen, setIsManageOpen] = useState<boolean>(false);

  const [collegeForInquiry, setCollegeForInquiry] = useState<College | null>(null);
  const [isNewPostOpen, setIsNewPostOpen] = useState<boolean>(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const [isDrccApplyOpen, setIsDrccApplyOpen] = useState<boolean>(false);
  const [isTrackOpen, setIsTrackOpen] = useState<boolean>(false);

  // Toast notifications
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Fetch initial data from Express backend
  const fetchColleges = async () => {
    try {
      const res = await fetch('/api/colleges');
      const data = await res.json();
      if (data.success && data.data) {
        setColleges(data.data);
      }
    } catch (err) {
      console.error('Error fetching colleges', err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      if (data.success && data.data) {
        setPosts(data.data);
      }
    } catch (err) {
      console.error('Error fetching posts', err);
    }
  };

  const fetchStatsAndContact = async () => {
    try {
      const [resContact, resStats] = await Promise.all([
        fetch('/api/contact-info'),
        fetch('/api/stats')
      ]);
      const dataContact = await resContact.json();
      const dataStats = await resStats.json();

      if (dataContact.success && dataContact.data) {
        setContactInfo(dataContact.data);
      }
      if (dataStats.success && dataStats.data) {
        setStats(dataStats.data);
      }
    } catch (err) {
      console.error('Error fetching stats/contact', err);
    }
  };

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([fetchColleges(), fetchPosts(), fetchStatsAndContact()]);
      setLoading(false);
    };
    loadAll();
  }, []);

  const handleLikePost = async (postId: string) => {
    try {
      const res = await fetch(`/api/posts/${postId}/like`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setPosts(prev =>
          prev.map(p => (p.id === postId ? { ...p, likes: data.likes } : p))
        );
      }
    } catch (err) {
      console.error('Error liking post', err);
    }
  };

  const handleOpenInquiryWithCollege = (college: College) => {
    setCollegeForInquiry(college);
    setIsInquiryOpen(true);
  };

  const handleInquirySubmitted = (trackingId: string) => {
    showToast(`Counselling request booked! Reference ID: ${trackingId}`);
    fetchStatsAndContact();
  };

  const handleDrccSubmitted = (appNo: string) => {
    showToast(`DRCC application submitted! Ref: ${appNo}`);
    fetchStatsAndContact();
  };

  const handlePostCreated = () => {
    fetchPosts();
    showToast('Your admission notice was published to the community board!');
  };

  // Editing handlers
  const handleOpenEditCollege = (col: College) => {
    setCollegeForEdit(col);
    setIsCollegeEditOpen(true);
  };

  const handleOpenAddCollege = () => {
    setCollegeForEdit(null);
    setIsCollegeEditOpen(true);
  };

  const handleCollegeSaved = (savedCol: College) => {
    setColleges(prev => {
      const index = prev.findIndex(c => c.id === savedCol.id);
      if (index >= 0) {
        const next = [...prev];
        next[index] = savedCol;
        return next;
      }
      return [savedCol, ...prev];
    });
    showToast(`"${savedCol.name}" details updated successfully in database!`);
    setIsCollegeEditOpen(false);
    fetchStatsAndContact();
  };

  const handleCollegeDeleted = (collegeId: string) => {
    setColleges(prev => prev.filter(c => c.id !== collegeId));
    showToast('College removed from database.');
    fetchStatsAndContact();
  };

  const handleContactInfoUpdated = (updated: ContactInfo) => {
    setContactInfo(updated);
    showToast('Helpline numbers and office details updated live!');
  };

  const handlePostDeleted = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    showToast('Notice removed from board.');
    fetchStatsAndContact();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-400 selection:text-slate-900">
      {/* Toast Notification Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs sm:text-sm font-medium"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <Header
        contactInfo={contactInfo}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewPost={() => setIsNewPostOpen(true)}
        onOpenInquiry={() => {
          setCollegeForInquiry(null);
          setIsInquiryOpen(true);
        }}
        onOpenDrccApply={() => setIsDrccApplyOpen(true)}
        onOpenTrackModal={() => setIsTrackOpen(true)}
        onOpenManageModal={() => setIsManageOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection
              stats={stats}
              contactInfo={contactInfo}
              onSearch={(q) => {
                setActiveTab('colleges');
              }}
              onSelectStream={(stream) => {
                setSelectedStream(stream);
                setActiveTab('colleges');
              }}
              onOpenInquiry={() => {
                setCollegeForInquiry(null);
                setIsInquiryOpen(true);
              }}
              onOpenDrccApply={() => setIsDrccApplyOpen(true)}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Quick Admin/Edit Floating Banner for Fast Discovery */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
              <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 border border-blue-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base">
                      Portal Edit & Management Center (कॉलेज व नंबर एडिट करें)
                    </h4>
                    <p className="text-xs text-slate-300">
                      Edit any All-India college data, fees, DRCC eligibility, change helpline numbers, or add new universities.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleOpenAddCollege}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add College</span>
                  </button>
                  <button
                    onClick={() => setIsManageOpen(true)}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Settings className="w-4 h-4 text-slate-950" />
                    <span>Open Edit Desk</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Colleges on Home */}
            <CollegesSection
              colleges={colleges}
              selectedStream={selectedStream}
              setSelectedStream={setSelectedStream}
              onSelectCollege={(col) => setSelectedCollegeForDetails(col)}
              onOpenInquiryWithCollege={handleOpenInquiryWithCollege}
              onEditCollege={handleOpenEditCollege}
              onAddNewCollege={handleOpenAddCollege}
            />

            {/* DRCC Scheme Detailed Section */}
            <DrccSection
              onOpenDrccApply={() => setIsDrccApplyOpen(true)}
              onOpenInquiry={() => {
                setCollegeForInquiry(null);
                setIsInquiryOpen(true);
              }}
            />

            {/* Client & Community Posts Board */}
            <PostBoardSection
              posts={posts}
              onOpenNewPost={() => setIsNewPostOpen(true)}
              onLikePost={handleLikePost}
              onDeletePost={handlePostDeleted}
            />
          </>
        )}

        {activeTab === 'colleges' && (
          <div className="py-6">
            <CollegesSection
              colleges={colleges}
              selectedStream={selectedStream}
              setSelectedStream={setSelectedStream}
              onSelectCollege={(col) => setSelectedCollegeForDetails(col)}
              onOpenInquiryWithCollege={handleOpenInquiryWithCollege}
              onEditCollege={handleOpenEditCollege}
              onAddNewCollege={handleOpenAddCollege}
            />
          </div>
        )}

        {(activeTab === 'drcc' || activeTab === 'calculator') && (
          <div className="py-6">
            <DrccSection
              onOpenDrccApply={() => setIsDrccApplyOpen(true)}
              onOpenInquiry={() => {
                setCollegeForInquiry(null);
                setIsInquiryOpen(true);
              }}
            />
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="py-6">
            <PostBoardSection
              posts={posts}
              onOpenNewPost={() => setIsNewPostOpen(true)}
              onLikePost={handleLikePost}
              onDeletePost={handlePostDeleted}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        contactInfo={contactInfo}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenNewPost={() => setIsNewPostOpen(true)}
        onOpenInquiry={() => {
          setCollegeForInquiry(null);
          setIsInquiryOpen(true);
        }}
        onOpenDrccApply={() => setIsDrccApplyOpen(true)}
      />

      {/* Floating Quick Action Contacts */}
      <QuickContactFloating
        contactInfo={contactInfo}
        onOpenInquiry={() => {
          setCollegeForInquiry(null);
          setIsInquiryOpen(true);
        }}
      />

      {/* Modals */}
      <CollegeDetailsModal
        college={selectedCollegeForDetails}
        onClose={() => setSelectedCollegeForDetails(null)}
        onOpenInquiry={(col) => handleOpenInquiryWithCollege(col)}
      />

      {/* College Add / Edit Modal */}
      {isCollegeEditOpen && (
        <CollegeEditModal
          college={collegeForEdit}
          onClose={() => setIsCollegeEditOpen(false)}
          onSaved={handleCollegeSaved}
        />
      )}

      {/* Manage Portal & Database Modal */}
      {isManageOpen && (
        <ManagePortalModal
          colleges={colleges}
          posts={posts}
          contactInfo={contactInfo}
          onClose={() => setIsManageOpen(false)}
          onEditCollege={(col) => {
            setIsManageOpen(false);
            handleOpenEditCollege(col);
          }}
          onAddNewCollege={() => {
            setIsManageOpen(false);
            handleOpenAddCollege();
          }}
          onCollegeDeleted={handleCollegeDeleted}
          onContactInfoUpdated={handleContactInfoUpdated}
          onPostDeleted={handlePostDeleted}
          onRefreshAllData={() => {
            fetchColleges();
            fetchPosts();
            fetchStatsAndContact();
          }}
        />
      )}

      {isNewPostOpen && (
        <NewPostModal
          onClose={() => setIsNewPostOpen(false)}
          onPostCreated={handlePostCreated}
        />
      )}

      {isInquiryOpen && (
        <InquiryModal
          college={collegeForInquiry}
          onClose={() => setIsInquiryOpen(false)}
          onInquirySubmitted={handleInquirySubmitted}
        />
      )}

      {isDrccApplyOpen && (
        <DrccApplyModal
          onClose={() => setIsDrccApplyOpen(false)}
          onApplicationSubmitted={handleDrccSubmitted}
        />
      )}

      {isTrackOpen && (
        <TrackingModal
          onClose={() => setIsTrackOpen(false)}
        />
      )}
    </div>
  );
}
