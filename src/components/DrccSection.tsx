import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  IndianRupee, 
  Percent, 
  Calendar, 
  GraduationCap, 
  Users, 
  AlertCircle, 
  ArrowRight, 
  PhoneCall, 
  Calculator, 
  Download, 
  Building2,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';

interface DrccSectionProps {
  onOpenDrccApply: () => void;
  onOpenInquiry: () => void;
}

export const DrccSection: React.FC<DrccSectionProps> = ({
  onOpenDrccApply,
  onOpenInquiry,
}) => {
  // Calculator state
  const [tuitionPerYear, setTuitionPerYear] = useState<number>(75000);
  const [hostelPerYear, setHostelPerYear] = useState<number>(25000);
  const [courseYears, setCourseYears] = useState<number>(4);
  const [gender, setGender] = useState<'female' | 'male' | 'divyang'>('female');

  // Calculations
  const calculatedTotal = (tuitionPerYear + hostelPerYear) * courseYears;
  const sanctionedAmount = Math.min(calculatedTotal, 400000);
  const interestRate = gender === 'male' ? 0.04 : 0.01;
  // Simple interest accrued over moratorium (courseYears + 1 year)
  const moratoriumYears = courseYears + 1;
  const simpleInterestAccrued = sanctionedAmount * interestRate * moratoriumYears;
  const totalRepayable = sanctionedAmount + simpleInterestAccrued;
  // 60-month (5-year) post-job repayment estimate
  const estimatedMonthlyEmi = Math.round(totalRepayable / 60);

  const [activeCourseCategory, setActiveCourseCategory] = useState<'all' | 'technical' | 'medical' | 'general'>('all');

  const approvedCourses = [
    { name: 'B.Tech / B.E (All Engineering Branches)', duration: '4 Years', category: 'technical' },
    { name: 'MBBS / BDS / BAMS / BHMS', duration: '5.5 Years', category: 'medical' },
    { name: 'B.Sc Nursing / Post Basic B.Sc Nursing', duration: '4 Years', category: 'medical' },
    { name: 'General Nursing & Midwifery (GNM)', duration: '3 Years', category: 'medical' },
    { name: 'Bachelor of Pharmacy (B.Pharma)', duration: '4 Years', category: 'medical' },
    { name: 'Diploma in Pharmacy (D.Pharma)', duration: '2 Years', category: 'medical' },
    { name: 'Bachelor of Physiotherapy (BPT)', duration: '4.5 Years', category: 'medical' },
    { name: 'Bachelor of Computer Applications (BCA)', duration: '3 Years', category: 'technical' },
    { name: 'Master of Computer Applications (MCA)', duration: '2 Years', category: 'technical' },
    { name: 'Bachelor of Business Administration (BBA)', duration: '3 Years', category: 'general' },
    { name: 'Master of Business Administration (MBA)', duration: '2 Years', category: 'general' },
    { name: 'Polytechnic Diploma in Engineering', duration: '3 Years', category: 'technical' },
    { name: 'Hotel Management (BHM / B.Sc HM)', duration: '3-4 Years', category: 'general' },
    { name: 'B.Sc Agriculture / Horticulture', duration: '4 Years', category: 'general' },
    { name: 'B.A. LL.B / B.B.A. LL.B (5-Year Integrated)', duration: '5 Years', category: 'general' },
    { name: 'Bachelor of Mass Communication (BMC)', duration: '3 Years', category: 'general' }
  ];

  const filteredCourses = approvedCourses.filter(c => {
    if (activeCourseCategory === 'all') return true;
    return c.category === activeCourseCategory;
  });

  const documents = [
    'Aadhaar Card (Student & Parents)',
    '10th (Matriculation) Marksheet & Certificate',
    '12th (Intermediate) Marksheet & Certificate',
    'Residential Certificate (Niwash Praman Patra - Bihar)',
    'Bonafide Certificate issued by the college',
    'Fee Structure issued on official college letterhead',
    'Bank Account Passbook / Cancelled Cheque',
    'PAN Card of Student',
    '2 Passport Size Color Photographs'
  ];

  const steps = [
    {
      num: '01',
      title: 'College Admission & Bonafide',
      desc: 'Secure provisional admission in an approved college and receive the official DRCC Bonafide Certificate & Fee Structure with college seal.'
    },
    {
      num: '02',
      title: 'Online MNSSBY Registration',
      desc: 'Submit application on Bihar Govt portal (7nishchay-yuvaupmission.bihar.gov.in) with basic student details, 12th roll code, and course info.'
    },
    {
      num: '03',
      title: 'DRCC Physical Verification',
      desc: 'Visit your home District Registration and Counselling Centre (DRCC) on allotted slot date with original certificates for verification.'
    },
    {
      num: '04',
      title: 'BSEFC Sanction & Agreement',
      desc: 'Bihar State Education Finance Corporation verifies details, issues loan sanction letter, and signs agreement.'
    },
    {
      num: '05',
      title: 'Direct Fee Disbursement',
      desc: 'Tuition fees disbursed directly into the college account per semester/year. Hostel & living stipend transferred to student account.'
    }
  ];

  return (
    <section id="drcc-bihar" className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Bihar Government Flagship Scheme • MNSSBY
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            Bihar Student Credit Card (DRCC) Guide
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            बिहार सरकार की <strong>मुख्यमंत्री निश्चय स्वयं सहायता भत्ता योजना</strong> के तहत 12वीं पास छात्रों को उच्च शिक्षा (B.Tech, MBBS, Nursing, Pharmacy, Diploma आदि) हेतु ₹4,00,000 तक का आसान शिक्षा ऋण।
          </p>
        </div>

        {/* 4 Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold mb-3">
              <IndianRupee className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">₹4,00,000 Loan</h3>
            <p className="text-xs text-slate-500 mt-1">
              Covers complete college tuition fees, hostel, food charges, exam fees, books & laptop allowance.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3">
              <Percent className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">1% & 4% Simple Interest</h3>
            <p className="text-xs text-slate-500 mt-1">
              1% for Female, Transgender & Divyang students. 4% for Male students. No compound interest or hidden charges.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Zero EMI During Course</h3>
            <p className="text-xs text-slate-500 mt-1">
              Repayment starts only 1 year after course completion, or 6 months after getting a job, whichever is earlier.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold mb-3">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">42+ Approved Courses</h3>
            <p className="text-xs text-slate-500 mt-1">
              Recognized for Engineering, Medical, B.Sc Nursing, GNM, Pharmacy, Management, and Polytechnic.
            </p>
          </div>
        </div>

        {/* Interactive DRCC Loan & Repayment Calculator */}
        <div id="calculator" className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-blue-800/40">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Calculator Controls */}
            <div className="flex-1 space-y-6 w-full">
              <div>
                <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Calculator className="w-4 h-4" />
                  Official DRCC Repayment Calculator
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif]">
                  Calculate Your Loan & Repayment
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Estimate total sanction amount and nominal monthly post-job EMI under Bihar Student Credit Card scheme.
                </p>
              </div>

              {/* Gender Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Student Category (Sets Interest Rate):
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`py-2 px-3 rounded-xl font-bold transition-all cursor-pointer ${
                      gender === 'female'
                        ? 'bg-amber-400 text-slate-950 shadow-md'
                        : 'bg-white/10 text-slate-200 hover:bg-white/20'
                    }`}
                  >
                    Female (1% Int.)
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`py-2 px-3 rounded-xl font-bold transition-all cursor-pointer ${
                      gender === 'male'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-white/10 text-slate-200 hover:bg-white/20'
                    }`}
                  >
                    Male (4% Int.)
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('divyang')}
                    className={`py-2 px-3 rounded-xl font-bold transition-all cursor-pointer ${
                      gender === 'divyang'
                        ? 'bg-emerald-400 text-slate-950 shadow-md'
                        : 'bg-white/10 text-slate-200 hover:bg-white/20'
                    }`}
                  >
                    Divyang (1% Int.)
                  </button>
                </div>
              </div>

              {/* Annual Tuition Fee Slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-200 mb-1">
                  <span>Annual College Tuition Fee</span>
                  <span className="text-amber-300 font-bold">₹{tuitionPerYear.toLocaleString('en-IN')} / year</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="150000"
                  step="5000"
                  value={tuitionPerYear}
                  onChange={(e) => setTuitionPerYear(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              {/* Annual Hostel & Living Slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-200 mb-1">
                  <span>Hostel / Living Expenses per Year</span>
                  <span className="text-sky-300 font-bold">₹{hostelPerYear.toLocaleString('en-IN')} / year</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60000"
                  step="5000"
                  value={hostelPerYear}
                  onChange={(e) => setHostelPerYear(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
                />
              </div>

              {/* Course Duration Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Course Duration:
                </label>
                <div className="flex gap-2">
                  {[2, 3, 4, 5].map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setCourseYears(y)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        courseYears === y
                          ? 'bg-white text-slate-900 shadow-md'
                          : 'bg-white/10 text-slate-300 hover:bg-white/20'
                      }`}
                    >
                      {y} Years
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="w-full lg:w-96 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs uppercase font-semibold tracking-wider text-slate-300 block">
                  Eligible DRCC Sanction
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-['Outfit',sans-serif] mt-1">
                  ₹{sanctionedAmount.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-slate-300 block mt-0.5">
                  Max statutory ceiling: ₹4,00,000
                </span>
              </div>

              <div className="space-y-2 py-3 border-y border-white/10 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Applicable Interest Rate:</span>
                  <span className="font-bold text-white">{(interestRate * 100).toFixed(0)}% Simple Interest</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Moratorium Period (No EMI):</span>
                  <span className="font-bold text-emerald-400">{moratoriumYears} Years (Course + 1 Yr)</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Approx. Simple Interest Accrued:</span>
                  <span className="font-bold text-white">₹{Math.round(simpleInterestAccrued).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-3 text-center border border-white/15">
                <span className="text-[11px] text-slate-300 block">
                  Post-Job Estimated EMI (60 Months / 5 Years)
                </span>
                <span className="text-2xl font-black text-emerald-400 block mt-1">
                  ₹{estimatedMonthlyEmi.toLocaleString('en-IN')} / month
                </span>
                <span className="text-[10px] text-slate-400">
                  *Repayment starts only after gaining employment
                </span>
              </div>

              <button
                onClick={onOpenDrccApply}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Apply for DRCC Bihar Pre-Registration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Step-by-Step Application Procedure */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              How to Apply: Step-by-Step Procedure
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              5 easy steps from college selection to direct fee disbursement by Bihar Government.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs relative">
                <span className="text-2xl font-black text-blue-200 font-['Outfit',sans-serif] block mb-2">
                  {step.num}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{step.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents & Eligible Courses Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Documents Checklist Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base mb-4">
              <FileText className="w-5 h-5 text-blue-700" />
              <span>Mandatory Documents Checklist for DRCC</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Keep original and 2 sets of self-attested photocopies ready for your physical verification at your District Registration & Counselling Centre.
            </p>
            <div className="space-y-2.5">
              {documents.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Approved Courses List */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <GraduationCap className="w-5 h-5 text-emerald-700" />
                  <span>Popular DRCC Approved Courses</span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  42+ Courses
                </span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex gap-1.5 mb-3 text-[11px]">
                <button
                  onClick={() => setActiveCourseCategory('all')}
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer ${activeCourseCategory === 'all' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveCourseCategory('technical')}
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer ${activeCourseCategory === 'technical' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  Engineering & Tech
                </button>
                <button
                  onClick={() => setActiveCourseCategory('medical')}
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer ${activeCourseCategory === 'medical' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  Medical & Nursing
                </button>
                <button
                  onClick={() => setActiveCourseCategory('general')}
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer ${activeCourseCategory === 'general' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  Management & Others
                </button>
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2 pr-1 divide-y divide-slate-100">
                {filteredCourses.map((c, i) => (
                  <div key={i} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                    <span className="text-slate-800 font-medium truncate max-w-[260px]">{c.name}</span>
                    <span className="text-slate-500 text-[11px] shrink-0 font-semibold">{c.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500">Need college bonafide letter?</span>
              <button
                onClick={onOpenInquiry}
                className="px-3.5 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer"
              >
                Request Bonafide Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
