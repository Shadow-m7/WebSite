export type StreamType = 
  | 'All'
  | 'Engineering (B.Tech)'
  | 'Medical (MBBS/BAMS)'
  | 'Management (MBA/BBA)'
  | 'Pharmacy (B.Pharma/D.Pharma)'
  | 'Nursing & Paramedical'
  | 'Polytechnic Diploma'
  | 'Computer Apps (BCA/MCA)'
  | 'Law (LLB/BA LLB)';

export interface CollegeCourse {
  code: string;
  name: string;
  duration: string;
  annualFee: number;
  totalSeats: number;
  eligibility: string;
  drccEligible: boolean;
}

export interface College {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  location: string;
  state: string;
  type: 'Government' | 'Private' | 'Deemed' | 'Autonomous';
  stream: StreamType;
  courses: CollegeCourse[];
  drccApproved: boolean;
  naacGrade: string;
  approvals: string[];
  ranking: string;
  avgPackage: string;
  highestPackage: string;
  topRecruiters: string[];
  image: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  hostelAvailable: boolean;
  scholarshipAvailable: boolean;
  featured?: boolean;
}

export interface ClientPost {
  id: string;
  title: string;
  authorName: string;
  authorRole: 'College Representative' | 'Senior Counsellor' | 'Student / Aspirant' | 'Alumni' | 'Education Consultant';
  organization: string;
  mobile: string;
  email: string;
  category: 'Admission Alert' | 'DRCC Seat Availability' | 'Direct Admission' | 'Scholarship Notice' | 'Student Review / Query';
  courseOrStream: string;
  location: string;
  content: string;
  feeDetails?: string;
  seatsRemaining?: number;
  verified: boolean;
  createdAt: string;
  likes: number;
}

export interface StudentInquiry {
  id: string;
  trackingId: string;
  fullName: string;
  mobile: string;
  email: string;
  state: string;
  district: string;
  tenthMarks: string;
  twelfthMarks: string;
  interestedStream: string;
  preferredCollegeId?: string;
  drccAssistanceNeeded: boolean;
  message?: string;
  status: 'Pending' | 'Counsellor Assigned' | 'Documents Verified' | 'College Seat Booked';
  createdAt: string;
}

export interface DrccApplication {
  id: string;
  applicationNo: string;
  studentName: string;
  fatherName: string;
  mobile: string;
  email: string;
  aadhaarNo: string;
  gender: 'Male' | 'Female' | 'Transgender' | 'Divyang';
  biharDistrict: string;
  twelfthBoard: 'BSEB' | 'CBSE' | 'ICSE' | 'Other';
  twelfthRollCode: string;
  twelfthRollNo: string;
  twelfthPassingYear: string;
  twelfthPercentage: number;
  chosenCollege: string;
  chosenCourse: string;
  courseDurationYears: number;
  annualTuitionFee: number;
  hostelLivingFee: number;
  totalLoanRequired: number;
  status: 'Received' | 'Initial Verification Passed' | 'Bonafide Scrutiny' | 'DRCC Slot Scheduled';
  createdAt: string;
}

export interface ContactInfo {
  helplineTollFree: string;
  whatsappNumber: string;
  counsellingHotline1: string;
  counsellingHotline2: string;
  officialEmail: string;
  drccEmail: string;
  addressPatna: string;
  addressDelhi: string;
  addressBangalore: string;
  workingHours: string;
}
