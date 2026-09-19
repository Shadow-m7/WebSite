import React, { useState } from 'react';
import { 
  FileText, 
  PlusCircle, 
  Search, 
  PhoneCall, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Building2, 
  Heart, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  GraduationCap, 
  IndianRupee,
  Share2,
  Trash2
} from 'lucide-react';
import { ClientPost } from '../types';

interface PostBoardSectionProps {
  posts: ClientPost[];
  onOpenNewPost: () => void;
  onLikePost: (postId: string) => void;
  onDeletePost?: (postId: string) => void;
}

export const PostBoardSection: React.FC<PostBoardSectionProps> = ({
  posts,
  onOpenNewPost,
  onLikePost,
  onDeletePost,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const categories = [
    'All',
    'Admission Alert',
    'DRCC Seat Availability',
    'Direct Admission',
    'Scholarship Notice',
    'Student Review / Query'
  ];

  const handleLike = (id: string) => {
    if (!likedMap[id]) {
      setLikedMap(prev => ({ ...prev, [id]: true }));
      onLikePost(id);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.mobile.includes(searchTerm) ||
      post.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.courseOrStream.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Admission Alert':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'DRCC Seat Availability':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Direct Admission':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Scholarship Notice':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const formatTime = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <section id="community-posts" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Live Client & Student Notice Board
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            Admission Notices & Verified Posts
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            College representatives, education counsellors, and students post live seat availability and contact details.
          </p>
        </div>

        {/* Post Creation CTA Button */}
        <button
          onClick={onOpenNewPost}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-amber-600/25 transition-all cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post Admission Notice / Seat</span>
        </button>
      </div>

      {/* Category Pills & Search */}
      <div className="mt-6 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search posts, phone, college..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none shadow-2xs"
          />
        </div>
      </div>

      {/* Posts Feed Grid */}
      <div className="mt-8 space-y-5">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No posts found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Be the first client or college official to post an admission notice or query!
            </p>
            <button
              onClick={onOpenNewPost}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-white hover:bg-amber-600 cursor-pointer"
            >
              Create New Post
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow"
            >
              {/* Top row: Category + Date */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                  {post.verified && (
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Official
                    </span>
                  )}
                  {post.seatsRemaining && (
                    <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-200">
                      Only {post.seatsRemaining} Seats Left
                    </span>
                  )}
                </div>

                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {formatTime(post.createdAt)}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {post.title}
              </h3>

              {/* Course & Location Tags */}
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                  {post.courseOrStream}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  {post.location}
                </span>
                {post.feeDetails && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                      {post.feeDetails}
                    </span>
                  </>
                )}
              </div>

              {/* Content description */}
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                {post.content}
              </p>

              {/* Author & Action Strip */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    {post.authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">
                      {post.authorName}
                      <span className="ml-2 text-[10px] font-normal text-slate-500 px-1.5 py-0.5 bg-slate-100 rounded-md">
                        {post.authorRole}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {post.organization}
                    </div>
                  </div>
                </div>

                {/* Direct Contact Buttons (Phone, WhatsApp, Email) */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Call Button */}
                  <a
                    href={`tel:${post.mobile}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold transition-colors border border-blue-200"
                    title={`Call ${post.mobile}`}
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                    <span>{post.mobile}</span>
                  </a>

                  {/* WhatsApp Button */}
                  <a
                    href={`https://wa.me/${post.mobile.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(post.authorName)},%20I%20saw%20your%20admission%20post%20"${encodeURIComponent(post.title)}"%20on%20All%20India%20Counselling%20portal.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors border border-emerald-200"
                    title="Chat on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>

                  {/* Email Button */}
                  <a
                    href={`mailto:${post.email}?subject=Inquiry regarding ${encodeURIComponent(post.title)}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                    title={post.email}
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span className="hidden sm:inline">{post.email}</span>
                  </a>

                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      likedMap[post.id] 
                        ? 'bg-rose-50 text-rose-600' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-500'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${likedMap[post.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{post.likes}</span>
                  </button>

                  {/* Optional Delete Button */}
                  {onDeletePost && (
                    <button
                      onClick={() => onDeletePost(post.id)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete this notice"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
