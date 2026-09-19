import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "database.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Complete All India Colleges and Universities Seed Data
const initialSeedData = {
  contactInfo: {
    helplineTollFree: "1800-889-2040",
    whatsappNumber: "+919835144520",
    counsellingHotline1: "+91 94702 11985",
    counsellingHotline2: "+91 79034 56210",
    officialEmail: "admission@allindiacounselling.org",
    drccEmail: "drcc.help@allindiacounselling.org",
    addressPatna: "Shree Krishna Complex, 2nd Floor, Boring Road Crossing, Patna, Bihar - 800001",
    addressDelhi: "Barakhamba Road, Connaught Place, New Delhi - 110001",
    addressBangalore: "Near Electronic City Phase 1, Hosur Road, Bengaluru, Karnataka - 560100",
    workingHours: "Monday to Saturday: 9:00 AM - 8:00 PM (IST)"
  },
  colleges: [
    {
      id: "col-1",
      name: "Galgotias University & Institute of Technology",
      shortName: "Galgotias University",
      tagline: "Top NAAC A+ Accredited University with 100% DRCC Bihar Acceptance",
      location: "Greater Noida, Delhi-NCR",
      state: "Uttar Pradesh",
      type: "Private",
      stream: "Engineering (B.Tech)",
      courses: [
        { code: "BTECH-CSE", name: "B.Tech Computer Science & Engg", duration: "4 Years", annualFee: 154000, totalSeats: 480, eligibility: "12th with PCM min 55%", drccEligible: true },
        { code: "BTECH-AI", name: "B.Tech AI & Machine Learning", duration: "4 Years", annualFee: 165000, totalSeats: 180, eligibility: "12th with PCM min 60%", drccEligible: true },
        { code: "BCA", name: "Bachelor of Computer Applications", duration: "3 Years", annualFee: 98000, totalSeats: 120, eligibility: "12th any stream min 50%", drccEligible: true }
      ],
      drccApproved: true,
      naacGrade: "A+",
      approvals: ["UGC", "AICTE", "NAAC A+", "Bihar Govt DRCC Approved"],
      ranking: "NIRF Rank Band 101-150",
      avgPackage: "₹6.85 LPA",
      highestPackage: "₹44 LPA",
      topRecruiters: ["Microsoft", "Amazon", "Infosys", "TCS", "Wipro", "Cognizant"],
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80",
      phone: "+91 98351 44520",
      email: "admissions.ncr@allindiacounselling.org",
      website: "https://www.galgotiasuniversity.edu.in",
      description: "Galgotias is among the highest-enrolled universities for Bihar students under MNSSBY Student Credit Card. Fully recognized with hassle-free DRCC verification letter support.",
      hostelAvailable: true,
      scholarshipAvailable: true,
      featured: true
    },
    {
      id: "col-2",
      name: "Muzaffarpur Institute of Technology (MIT)",
      shortName: "MIT Muzaffarpur",
      tagline: "Premier Government Engineering College of Bihar",
      location: "Muzaffarpur, Bihar",
      state: "Bihar",
      type: "Government",
      stream: "Engineering (B.Tech)",
      courses: [
        { code: "BTECH-CE", name: "B.Tech Civil Engineering", duration: "4 Years", annualFee: 32000, totalSeats: 60, eligibility: "BCECE / JEE Main rank", drccEligible: true },
        { code: "BTECH-ME", name: "B.Tech Mechanical Engineering", duration: "4 Years", annualFee: 32000, totalSeats: 60, eligibility: "BCECE / JEE Main rank", drccEligible: true },
        { code: "BTECH-IT", name: "B.Tech Information Technology", duration: "4 Years", annualFee: 34000, totalSeats: 40, eligibility: "BCECE / JEE Main rank", drccEligible: true }
      ],
      drccApproved: true,
      naacGrade: "NBA Accredited",
      approvals: ["AICTE", "Bihar Engineering University (BEU)", "State Govt"],
      ranking: "Top 3 Govt College in Bihar",
      avgPackage: "₹5.50 LPA",
      highestPackage: "₹18 LPA",
      topRecruiters: ["Tata Projects", "L&T", "Indian Oil", "PRD Bihar", "Wipro"],
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80",
      phone: "+91 94702 11985",
      email: "mit.counselling@allindiacounselling.org",
      website: "https://www.mitmuzaffarpur.org",
      description: "Established in 1954, MIT is one of Bihar's oldest premier institutions. 100% covered under Bihar state student welfare schemes and nominal government fee structure.",
      hostelAvailable: true,
      scholarshipAvailable: true,
      featured: true
    },
    {
      id: "col-3",
      name: "Netaji Subhas Medical College & Hospital (NSMCH)",
      shortName: "NSMCH Patna",
      tagline: "NMC Recognized Medical College with 750-Bed Multi-Specialty Hospital",
      location: "Bihta, Patna, Bihar",
      state: "Bihar",
      type: "Private",
      stream: "Medical (MBBS/BAMS)",
      courses: [
        { code: "MBBS", name: "Bachelor of Medicine & Bachelor of Surgery (MBBS)", duration: "5.5 Years", annualFee: 1550000, totalSeats: 150, eligibility: "NEET Qualified + 12th PCB 50%", drccEligible: true },
        { code: "BSC-NUR", name: "B.Sc Nursing", duration: "4 Years", annualFee: 125000, totalSeats: 60, eligibility: "12th PCB min 45%", drccEligible: true },
        { code: "GNM", name: "General Nursing & Midwifery (GNM)", duration: "3 Years", annualFee: 95000, totalSeats: 60, eligibility: "12th Any Stream min 40%", drccEligible: true }
      ],
      drccApproved: true,
      naacGrade: "Recognized",
      approvals: ["NMC", "MoHFW", "Aryabhatta Knowledge University (AKU)", "INC"],
      ranking: "Leading Private Medical Institution in Bihar",
      avgPackage: "₹9.50 LPA",
      highestPackage: "₹24 LPA",
      topRecruiters: ["AIIMS", "Apollo Hospitals", "Medanta", "Paras HMRI", "Ruban Hospital"],
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80",
      phone: "+91 79034 56210",
      email: "medical@allindiacounselling.org",
      website: "https://nsmch.com",
      description: "Located in Bihta education hub, NSMCH offers world-class clinical training. Nursing & Paramedical courses here are 100% eligible for DRCC Student Credit Card loans up to 4 lakhs.",
      hostelAvailable: true,
      scholarshipAvailable: true,
      featured: true
    },
    {
      id: "col-4",
      name: "The Oxford College of Pharmacy & Nursing",
      shortName: "Oxford Bangalore",
      tagline: "Premier Karnataka Institution Preferred by 2000+ Bihar Students",
      location: "Hongasandra, Bengaluru",
      state: "Karnataka",
      type: "Private",
      stream: "Pharmacy (B.Pharma/D.Pharma)",
      courses: [
        { code: "BPHARM", name: "Bachelor of Pharmacy (B.Pharm)", duration: "4 Years", annualFee: 120000, totalSeats: 100, eligibility: "12th PCM/PCB min 50%", drccEligible: true },
        { code: "DPHARM", name: "Diploma in Pharmacy (D.Pharm)", duration: "2 Years", annualFee: 85000, totalSeats: 60, eligibility: "12th Science min 40%", drccEligible: true },
        { code: "BSC-NURS", name: "B.Sc Nursing", duration: "4 Years", annualFee: 110000, totalSeats: 100, eligibility: "12th PCB min 45%", drccEligible: true }
      ],
      drccApproved: true,
      naacGrade: "A",
      approvals: ["PCI", "AICTE", "RGUHS Bengaluru", "DRCC Bihar Verified"],
      ranking: "Top 20 Pharmacy Colleges in India",
      avgPackage: "₹4.80 LPA",
      highestPackage: "₹12 LPA",
      topRecruiters: ["Biocon", "Cipla", "Sun Pharma", "Dr. Reddy's", "Apollo Pharmacy"],
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1000&q=80",
      phone: "+91 98351 44520",
      email: "bangalore.desk@allindiacounselling.org",
      website: "https://www.theoxford.edu",
      description: "Oxford College provides a direct admission verification cell for Bihar domicile students with complete bonafide documentation for smooth DRCC loan disbursement.",
      hostelAvailable: true,
      scholarshipAvailable: true,
      featured: false
    },
    {
      id: "col-5",
      name: "KIIT Deemed to be University",
      shortName: "KIIT University",
      tagline: "Institute of Eminence with NAAC A++ & 100% Placement Record",
      location: "Bhubaneswar, Odisha",
      state: "Odisha",
      type: "Deemed",
      stream: "Engineering (B.Tech)",
      courses: [
        { code: "BTECH-CS", name: "B.Tech Computer Science & System Engg", duration: "4 Years", annualFee: 385000, totalSeats: 600, eligibility: "12th PCM 60% + KIITEE/JEE", drccEligible: true },
        { code: "BBA", name: "Bachelor of Business Administration (BBA)", duration: "3 Years", annualFee: 140000, totalSeats: 180, eligibility: "12th any stream 50%", drccEligible: true },
        { code: "MBA", name: "Master of Business Administration (MBA)", duration: "2 Years", annualFee: 425000, totalSeats: 240, eligibility: "Graduation 50% + CAT/MAT", drccEligible: true }
      ],
      drccApproved: true,
      naacGrade: "A++",
      approvals: ["UGC", "Ministry of Education IoE", "AICTE", "ABET USA"],
      ranking: "NIRF Rank 16 in India",
      avgPackage: "₹8.50 LPA",
      highestPackage: "₹63 LPA",
      topRecruiters: ["Amazon", "Atlassian", "De Shaw", "Deloitte", "Tata Motors", "Accenture"],
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80",
      phone: "+91 94702 11985",
      email: "kiit.desk@allindiacounselling.org",
      website: "https://kiit.ac.in",
      description: "KIIT offers an ultra-modern smart campus with over 30,000 students from 65 countries. Bihar students can avail ₹4 Lakhs DRCC loan directly adjusted into tuition fee accounts.",
      hostelAvailable: true,
      scholarshipAvailable: true,
      featured: true
    },
    {
      id: "col-6",
      name: "RV College of Engineering (RVCE)",
      shortName: "RVCE Bengaluru",
      tagline: "India's Premier Top-Ranked Autonomous Engineering Institution",
      location: "Mysore Road, Bengaluru",
      state: "Karnataka",
      type: "Autonomous",
      stream: "Engineering (B.Tech)",
      courses: [
        { code: "BTECH-CSE", name: "B.E Computer Science & Engineering", duration: "4 Years", annualFee: 245000, totalSeats: 240, eligibility: "12th PCM 60% + KCET/COMEDK/Direct", drccEligible: true },
        { code: "BTECH-ISE", name: "B.E Information Science & Engineering", duration: "4 Years", annualFee: 235000, totalSeats: 120, eligibility: "12th PCM 60%", drccEligible: true },
        { code: "BTECH-ECE", name: "B.E Electronics & Communication", duration: "4 Years", annualFee: 220000, totalSeats: 180, eligibility: "12th PCM 60%", drccEligible: true }
      ],
      drccApproved: true,
      naacGrade: "A+",
      approvals: ["AICTE", "VTU Belagavi", "NBA", "NAAC A+"],
      ranking: "NIRF Top 40 Engineering in India",
      avgPackage: "₹14.2 LPA",
      highestPackage: "₹92 LPA",
      topRecruiters: ["Google", "Microsoft", "Apple", "Texas Instruments", "Cisco", "Goldman Sachs"],
      image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1000&q=80",
      phone: "+91 98351 44520",
      email: "rvce.admissions@allindiacounselling.org",
      website: "https://rvce.edu.in",
      description: "Widely regarded as the Silicon Valley of India's flagship engineering college with unmatched placement statistics. Fully verified for DRCC bonafide education loan approvals.",
      hostelAvailable: true,
      scholarshipAvailable: true,
      featured: true
    },
    {
      id: "col-7",
      name: "Sharda University",
      shortName: "Sharda Greater Noida",
      tagline: "Global University with 27% International Students & Multi-Disciplinary Excellence",
      location: "Knowledge Park III, Greater Noida",
      state: "Uttar Pradesh",
      type: "Private",
      stream: "Engineering (B.Tech)",
      courses: [
        { code: "BTECH-CS", name: "B.Tech Computer Science & Engg", duration: "4 Years", annualFee: 185000, totalSeats: 360, eligibility: "12th PCM min 55%", drccEligible: true },
        { code: "BPHARM", name: "Bachelor of Pharmacy (B.Pharm)", duration: "4 Years", annualFee: 145000, totalSeats: 100, eligibility: "12th PCB/PCM min 50%", drccEligible: true },
        { code: "BALLB", name: "B.A. LL.B (5-Year Integrated)", duration: "5 Years", annualFee: 160000, totalSeats: 120, eligibility: "12th any stream 50%", drccEligible: true }
      ],
      drccApproved: true,
      naacGrade: "A+",
      approvals: ["UGC", "AICTE", "PCI", "BCI", "NAAC A+"],
      ranking: "NIRF Rank Band 150-200",
      avgPackage: "₹6.2 LPA",
      highestPackage: "₹48 LPA",
      topRecruiters: ["Amazon", "IBM", "Cognizant", "Wipro", "Bosch", "HCL"],
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
      phone: "+91 94702 11985",
      email: "sharda.desk@allindiacounselling.org",
      website: "https://www.sharda.ac.in",
      description: "Massive 63-acre campus in Greater Noida. Thousands of students from Bihar have successfully completed their degrees under Bihar Student Credit Card scheme here.",
      hostelAvailable: true,
      scholarshipAvailable: true,
      featured: true
    },
    {
      id: "col-8",
      name: "Chandigarh University (CU)",
      shortName: "Chandigarh University",
      tagline: "NAAC A+ Accredited with QS World Ranking & Limitless Placements",
      location: "Mohali, Punjab",
      state: "Punjab",
      type: "Private",
      stream: "Engineering (B.Tech)",
      courses: [
        { code: "BTECH-CSE", name: "B.E Computer Science & Engineering", duration: "4 Years", annualFee: 170000, totalSeats: 720, eligibility: "12th with min 50% in PCM", drccEligible: true },
        { code: "BCA", name: "Bachelor of Computer Applications", duration: "3 Years", annualFee: 95000, totalSeats: 180, eligibility: "12th pass min 50%", drccEligible: true },
        { code: "MBA", name: "Master of Business Administration", duration: "2 Years", annualFee: 190000, totalSeats: 300, eligibility: "Graduation min 50%", drccEligible: true }
      ],
      drccApproved: true,
      naacGrade: "A+",
      approvals: ["UGC", "AICTE", "NAAC A+", "QS Asia Ranked"],
      ranking: "Top 25 NIRF Universities in India",
      avgPackage: "₹7.4 LPA",
      highestPackage: "₹54.75 LPA",
      topRecruiters: ["Google", "Microsoft", "Walt Disney", "Amazon", "Capgemini", "Dell"],
      image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1000&q=80",
      phone: "+91 79034 56210",
      email: "cu.admissions@allindiacounselling.org",
      website: "https://www.cuchd.in",
      description: "One of the most sought-after universities for North Indian students. Provides specialized DRCC counters with immediate bonafide generation for Bihar applicants.",
      hostelAvailable: true,
      scholarshipAvailable: true,
      featured: true
    },
    {
      id: "col-9",
      name: "Ramaiah Institute of Technology (MSRIT)",
      shortName: "Ramaiah Bangalore",
      tagline: "Top Tier Heritage Engineering Institution in Bengaluru",
      location: "Mathikere, Bengaluru",
      state: "Karnataka",
      type: "Autonomous",
      stream: "Engineering (B.Tech)",
      courses: [
        { code: "BE-CS", name: "B.E Computer Science & Engineering", duration: "4 Years", annualFee: 260000, totalSeats: 180, eligibility: "12th PCM 60%", drccEligible: true },
        { code: "BE-AI", name: "B.E Artificial Intelligence & Data Science", duration: "4 Years", annualFee: 250000, totalSeats: 120, eligibility: "12th PCM 60%", drccEligible: true },
        { code: "BE-MECH", name: "B.E Mechanical Engineering", duration: "4 Years", annualFee: 180000, totalSeats: 120, eligibility: "12th PCM 50%", drccEligible: true }
      ],
      drccApproved: true,
      naacGrade: "A+",
      approvals: ["AICTE", "VTU", "NBA", "NAAC A+"],
      ranking: "NIRF Rank 67 Engineering",
      avgPackage: "₹9.8 LPA",
      highestPackage: "₹50 LPA",
      topRecruiters: ["Amazon", "Adobe", "Qualcomm", "Mercedes-Benz", "Schneider Electric"],
      image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=1000&q=80",
      phone: "+91 98351 44520",
      email: "ramaiah@allindiacounselling.org",
      website: "https://www.msrit.edu",
      description: "Renowned across India for strict academic standards and top corporate affiliations. Eligible for full ₹4 Lakhs DRCC educational support.",
      hostelAvailable: true,
      scholarshipAvailable: true,
      featured: true
    },
    {
      id: "col-10",
      name: "COEP Technological University",
      shortName: "COEP Pune",
      tagline: "India's Third Oldest Historic Engineering Institution",
      location: "Shivajinagar, Pune",
      state: "Maharashtra",
      type: "Government",
      stream: "Engineering (B.Tech)",
      courses: [
        { code: "BTECH-CS", name: "B.Tech Computer Engineering", duration: "4 Years", annualFee: 90000, totalSeats: 150, eligibility: "MHT-CET / JEE Main Rank", drccEligible: true },
        { code: "BTECH-ENTC", name: "B.Tech Electronics & Telecomm", duration: "4 Years", annualFee: 90000, totalSeats: 120, eligibility: "12th PCM 60%", drccEligible: true }
      ],
      drccApproved: true,
      naacGrade: "A++",
      approvals: ["Govt of Maharashtra", "AICTE", "UGC"],
      ranking: "Top 30 Engineering in India",
      avgPackage: "₹11.3 LPA",
      highestPackage: "₹50.5 LPA",
      topRecruiters: ["Goldman Sachs", "Citi", "Barclays", "Baja Auto", "Tata Motors"],
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1000&q=80",
      phone: "+91 94702 11985",
      email: "pune.desk@allindiacounselling.org",
      website: "https://www.coep.org.in",
      description: "Founded in 1854, COEP has produced Bharat Ratna Sir M. Visvesvaraya. Extremely prestigious with high ROI and nominal fee structure.",
      hostelAvailable: true,
      scholarshipAvailable: true,
      featured: false
    },
    {
      id: "col-11",
      name: "Katihar Medical College & Hospital (KMCH)",
      shortName: "KMCH Katihar",
      tagline: "Reputed Medical College in Bihar with 800+ Bed Hospital",
      location: "Katihar, Bihar",
      state: "Bihar",
      type: "Private",
      stream: "Medical (MBBS/BAMS)",
      courses: [
        { code: "MBBS", name: "MBBS (Bachelor of Medicine & Surgery)", duration: "5.5 Years", annualFee: 980000, totalSeats: 150, eligibility: "NEET Qualified + 12th PCB 50%", drccEligible: true },
        { code: "BSC-NUR", name: "B.Sc Nursing (4 Years)", duration: "4 Years", annualFee: 110000, totalSeats: 60, eligibility: "12th PCB 45%", drccEligible: true }
      ],
      drccApproved: true,
      naacGrade: "Recognized",
      approvals: ["NMC", "MoHFW", "Al-Karim University", "Bihar Health Dept"],
      ranking: "Premier Medical College in Seemanchal Bihar",
      avgPackage: "₹10.5 LPA",
      highestPackage: "₹28 LPA",
      topRecruiters: ["Apollo Hospitals", "Medanta", "Paras Patna", "Max Healthcare"],
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=80",
      phone: "+91 79034 56210",
      email: "katihar.medical@allindiacounselling.org",
      website: "https://kmckatihar.org",
      description: "Premier private medical institution of North-East Bihar serving thousands of patients daily. Nursing and paramedical courses 100% eligible for DRCC loans.",
      hostelAvailable: true,
      scholarshipAvailable: true,
      featured: true
    },
    {
      id: "col-12",
      name: "Graphic Era Deemed to be University",
      shortName: "Graphic Era Dehradun",
      tagline: "Top Ranked Uttarakhand Campus Preferred by 3500+ Bihar Students",
      location: "Dehradun, Uttarakhand",
      state: "Uttarakhand",
      type: "Deemed",
      stream: "Engineering (B.Tech)",
      courses: [
        { code: "BTECH-CSE", name: "B.Tech Computer Science & Engineering", duration: "4 Years", annualFee: 195000, totalSeats: 480, eligibility: "12th PCM min 60%", drccEligible: true },
        { code: "BBA", name: "Bachelor of Business Administration", duration: "3 Years", annualFee: 105000, totalSeats: 180, eligibility: "12th pass min 50%", drccEligible: true },
        { code: "BCA", name: "Bachelor of Computer Applications", duration: "3 Years", annualFee: 90000, totalSeats: 120, eligibility: "12th pass min 50%", drccEligible: true }
      ],
      drccApproved: true,
      naacGrade: "A+",
      approvals: ["UGC", "AICTE", "NAAC A+", "NIRF Top 55"],
      ranking: "NIRF Rank 55 in India",
      avgPackage: "₹7.25 LPA",
      highestPackage: "₹84.88 LPA",
      topRecruiters: ["Adobe", "Google", "Amazon", "Samsung", "Morgan Stanley", "Zscaler"],
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1000&q=80",
      phone: "+91 98351 44520",
      email: "dehradun@allindiacounselling.org",
      website: "https://geu.ac.in",
      description: "Scenic campus nestled in the foothills of Himalayas with exceptional placements in tier-1 tech giants. Dedicated Bihar student facilitation wing.",
      hostelAvailable: true,
      scholarshipAvailable: true,
      featured: true
    },
    {
      id: "col-13",
      name: "CIMAGE Professional College",
      shortName: "CIMAGE Patna",
      tagline: "Bihar's #1 BCA, BBA & IT Management Campus Affiliated to AKU Patna",
      location: "Boring Road, Patna, Bihar",
      state: "Bihar",
      type: "Autonomous",
      stream: "Computer Apps (BCA/MCA)",
      courses: [
        { code: "BCA", name: "Bachelor of Computer Applications (BCA)", duration: "3 Years", annualFee: 65000, totalSeats: 240, eligibility: "12th in any stream min 45%", drccEligible: true },
        { code: "BBA", name: "Bachelor of Business Administration (BBA)", duration: "3 Years", annualFee: 65000, totalSeats: 180, eligibility: "12th in any stream min 45%", drccEligible: true },
        { code: "BBM", name: "Bachelor of Business Management", duration: "3 Years", annualFee: 60000, totalSeats: 120, eligibility: "12th pass", drccEligible: true }
      ],
      drccApproved: true,
      naacGrade: "A Accredited",
      approvals: ["Aryabhatta Knowledge University (AKU)", "Patliputra University", "UGC"],
      ranking: "Top Professional College in Bihar",
      avgPackage: "₹4.50 LPA",
      highestPackage: "₹10 LPA",
      topRecruiters: ["Wipro", "TCS", "ICICI Bank", "Infosys", "Airtel", "Concentrix"],
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
      phone: "+91 94702 11985",
      email: "cimage.patna@allindiacounselling.org",
      website: "https://www.cimage.in",
      description: "Located in the heart of Patna, CIMAGE has produced state toppers in BCA & BBA. 100% of course fee is covered easily under Bihar Student Credit Card Scheme.",
      hostelAvailable: true,
      scholarshipAvailable: true,
      featured: true
    },
    {
      id: "col-14",
      name: "Lovely Professional University (LPU)",
      shortName: "LPU Punjab",
      tagline: "India's Largest Single-Campus University with 30,000+ Students",
      location: "Phagwara / Jalandhar, Punjab",
      state: "Punjab",
      type: "Private",
      stream: "Engineering (B.Tech)",
      courses: [
        { code: "BTECH-CSE", name: "B.Tech Computer Science & Engineering", duration: "4 Years", annualFee: 160000, totalSeats: 900, eligibility: "12th PCM 60% + LPUNEST", drccEligible: true },
        { code: "BPHARM", name: "Bachelor of Pharmacy (B.Pharm)", duration: "4 Years", annualFee: 130000, totalSeats: 120, eligibility: "12th PCB/PCM 60%", drccEligible: true },
        { code: "BSC-AGRI", name: "B.Sc (Hons.) Agriculture (ICAR Approved)", duration: "4 Years", annualFee: 140000, totalSeats: 180, eligibility: "12th Science 60%", drccEligible: true }
      ],
      drccApproved: true,
      naacGrade: "A++",
      approvals: ["UGC", "AICTE", "PCI", "ICAR", "NAAC A++"],
      ranking: "NIRF Rank 38 in India",
      avgPackage: "₹7.1 LPA",
      highestPackage: "₹64 LPA",
      topRecruiters: ["Google", "Microsoft", "Amazon", "Cisco", "Cognizant", "Federal Bank"],
      image: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=1000&q=80",
      phone: "+91 79034 56210",
      email: "lpu.desk@allindiacounselling.org",
      website: "https://www.lpu.in",
      description: "Massive 600-acre hi-tech campus. Welcomes over 1,500 Bihar students annually with direct Bihar Student Credit Card (DRCC) assistance.",
      hostelAvailable: true,
      scholarshipAvailable: true,
      featured: false
    },
    {
      id: "col-15",
      name: "Dayananda Sagar College of Engineering (DSCE)",
      shortName: "Dayananda Sagar",
      tagline: "Premier Bengaluru Engineering College with 100% Industry Exposure",
      location: "Kumaraswamy Layout, Bengaluru",
      state: "Karnataka",
      type: "Autonomous",
      stream: "Engineering (B.Tech)",
      courses: [
        { code: "BE-CSE", name: "B.E Computer Science & Engineering", duration: "4 Years", annualFee: 230000, totalSeats: 240, eligibility: "12th PCM min 55%", drccEligible: true },
        { code: "BE-AI", name: "B.E Artificial Intelligence & Machine Learning", duration: "4 Years", annualFee: 220000, totalSeats: 120, eligibility: "12th PCM min 55%", drccEligible: true }
      ],
      drccApproved: true,
      naacGrade: "A",
      approvals: ["AICTE", "VTU Belagavi", "NBA", "NAAC A"],
      ranking: "Top 10 Engineering Colleges in Karnataka",
      avgPackage: "₹8.2 LPA",
      highestPackage: "₹45 LPA",
      topRecruiters: ["Accenture", "Infosys", "Capgemini", "Oracle", "SAP", "Mindtree"],
      image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1000&q=80",
      phone: "+91 98351 44520",
      email: "dsce@allindiacounselling.org",
      website: "https://www.dayanandasagar.edu",
      description: "Spread across 29 sprawling acres in Bengaluru with 21 research centres and excellent IT placements.",
      hostelAvailable: true,
      scholarshipAvailable: true,
      featured: false
    },
    {
      id: "col-16",
      name: "Patliputra Polytechnic & Technical Campus",
      shortName: "Patliputra Tech",
      tagline: "Government-Assisted Polytechnic Offering 100% DRCC Financed Diploma",
      location: "Patna, Bihar",
      state: "Bihar",
      type: "Autonomous",
      stream: "Polytechnic Diploma",
      courses: [
        { code: "DIP-CIVIL", name: "Diploma in Civil Engineering", duration: "3 Years", annualFee: 45000, totalSeats: 120, eligibility: "10th pass min 35%", drccEligible: true },
        { code: "DIP-ELEC", name: "Diploma in Electrical Engineering", duration: "3 Years", annualFee: 45000, totalSeats: 120, eligibility: "10th pass min 35%", drccEligible: true },
        { code: "DIP-MECH", name: "Diploma in Mechanical Engineering", duration: "3 Years", annualFee: 45000, totalSeats: 60, eligibility: "10th pass min 35%", drccEligible: true }
      ],
      drccApproved: true,
      naacGrade: "SBTE Approved",
      approvals: ["AICTE", "SBTE Bihar", "Dept of Science & Tech Govt of Bihar"],
      ranking: "Top Rated Technical Diploma Institute in Bihar",
      avgPackage: "₹3.40 LPA",
      highestPackage: "₹6.50 LPA",
      topRecruiters: ["Tata Motors", "Maruti Suzuki", "Bajaj Auto", "Jindal Steel", "Shapoorji"],
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
      phone: "+91 79034 56210",
      email: "polytechnic@allindiacounselling.org",
      website: "https://sbte.bihar.gov.in",
      description: "Perfect for matric pass students aiming for early technical employment. Entire 3-year course fee and hostel are covered within ₹1.80 Lakhs under Bihar Student Credit Card.",
      hostelAvailable: true,
      scholarshipAvailable: true,
      featured: false
    }
  ],
  posts: [
    {
      id: "post-101",
      title: "Direct Admission Open 2026 for B.Tech & B.Pharma in NAAC A+ Campuses under DRCC Bihar",
      authorName: "Er. Rajesh Kumar Sharma",
      authorRole: "College Representative",
      organization: "All India Education Alliance, Delhi-NCR Desk",
      mobile: "+91 98351 44520",
      email: "rajesh.counsellor@allindiacounselling.org",
      category: "Admission Alert",
      courseOrStream: "B.Tech CSE / AI / B.Pharma / Nursing",
      location: "Greater Noida & Bangalore",
      content: "Admissions are officially open for academic session 2026-27! Bihar students with 50%+ in 12th can get guaranteed admission with complete DRCC bonafide letter within 24 hours. No donation, direct registration in college ERP. Free bus & hostel inspection available.",
      feeDetails: "Tuition ₹1.2L - ₹1.6L/year (100% eligible for ₹4 Lakhs DRCC)",
      seatsRemaining: 34,
      verified: true,
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      likes: 42
    },
    {
      id: "post-102",
      title: "Notice: DRCC Bihar Physical Verification Documents Checklist for Patna & Muzaffarpur Centres",
      authorName: "Smt. Vandana Kumari",
      authorRole: "Senior Counsellor",
      organization: "Bihar Youth Welfare & Student Guidance Cell",
      mobile: "+91 94702 11985",
      email: "vandana.drcc@allindiacounselling.org",
      category: "DRCC Seat Availability",
      courseOrStream: "All 42 Approved Courses (MNSSBY)",
      location: "Patna, Gaya, Muzaffarpur, Bhagalpur",
      content: "All students who have submitted online forms on 7nishchay-yuvaupmission portal must carry original 10th & 12th marksheets, bonafide certificate with college seal, residential certificate (Niwash Praman Patra), bank passbook copy, and 2 passport photos to DRCC. Our team assists with document verification free of charge.",
      feeDetails: "Govt Scheme: ₹4 Lakhs Loan at 1% for Girls / 4% for Boys",
      seatsRemaining: 150,
      verified: true,
      createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
      likes: 89
    },
    {
      id: "post-103",
      title: "B.Sc Nursing & GNM Special Seat Allocation for Bihar Girls with 1% Interest Rate",
      authorName: "Dr. Ananya Mishra",
      authorRole: "College Representative",
      organization: "Karnataka Health Science Consortium",
      mobile: "+91 79034 56210",
      email: "ananya.medical@allindiacounselling.org",
      category: "Scholarship Notice",
      courseOrStream: "B.Sc Nursing / GNM / Post Basic",
      location: "Bengaluru, Karnataka",
      content: "Special concession seats reserved for Bihar female aspirants in INC-approved colleges. 100% fee covered under Bihar Student Credit Card at nominal 1% simple interest with repayment starting only after course completion and employment.",
      feeDetails: "Total Package: ₹3.85 Lakhs inclusive of hostel & food",
      seatsRemaining: 18,
      verified: true,
      createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
      likes: 56
    }
  ],
  inquiries: [
    {
      id: "inq-1",
      trackingId: "AIC-2026-8921",
      fullName: "Amit Kumar Roy",
      mobile: "+91 91234 56789",
      email: "amit.roy@example.com",
      state: "Bihar",
      district: "Samastipur",
      tenthMarks: "78.4%",
      twelfthMarks: "74.2%",
      interestedStream: "Engineering (B.Tech)",
      preferredCollegeId: "col-1",
      drccAssistanceNeeded: true,
      message: "Want B.Tech Computer Science under Bihar Student Credit Card scheme. Need college bonafide assistance.",
      status: "Counsellor Assigned",
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ],
  drccApplications: [
    {
      id: "drcc-1",
      applicationNo: "MNSSBY-DRCC-99042",
      studentName: "Pooja Kumari",
      fatherName: "Manoj Kumar Singh",
      mobile: "+91 98765 43210",
      email: "pooja.singh@example.com",
      aadhaarNo: "XXXXXXXX4892",
      gender: "Female",
      biharDistrict: "Patna",
      twelfthBoard: "BSEB",
      twelfthRollCode: "11042",
      twelfthRollNo: "24010329",
      twelfthPassingYear: "2025",
      twelfthPercentage: 81.6,
      chosenCollege: "The Oxford College of Pharmacy & Nursing",
      chosenCourse: "B.Sc Nursing",
      courseDurationYears: 4,
      annualTuitionFee: 85000,
      hostelLivingFee: 15000,
      totalLoanRequired: 400000,
      status: "Initial Verification Passed",
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
    }
  ]
};

// Database helper functions
function loadDatabase() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialSeedData, null, 2), "utf-8");
      return initialSeedData;
    }
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    // If existing database has fewer than 10 colleges, merge with initial seed data so the user gets all Indian colleges
    if (!parsed.colleges || parsed.colleges.length < 10) {
      parsed.colleges = initialSeedData.colleges;
      saveDatabase(parsed);
    }
    return parsed;
  } catch (err) {
    console.error("Error reading db file, returning fallback seed data", err);
    return initialSeedData;
  }
}

function saveDatabase(data: typeof initialSeedData) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving db file", err);
  }
}

// REST API ROUTES

// 1. Contact Information - GET & PUT (Live Edit)
app.get("/api/contact-info", (req: Request, res: Response) => {
  const db = loadDatabase();
  res.json({ success: true, data: db.contactInfo });
});

app.put("/api/contact-info", (req: Request, res: Response) => {
  const db = loadDatabase();
  const body = req.body;
  
  db.contactInfo = {
    ...db.contactInfo,
    ...body
  };
  saveDatabase(db);
  res.json({ success: true, message: "Helpline & contact details updated successfully!", data: db.contactInfo });
});

// 2. Colleges list, filter, add, edit, and delete
app.get("/api/colleges", (req: Request, res: Response) => {
  const db = loadDatabase();
  let colleges = db.colleges || [];

  const { search, stream, drccOnly, state } = req.query;

  if (search && typeof search === "string") {
    const q = search.toLowerCase();
    colleges = colleges.filter(
      (c: any) =>
        c.name.toLowerCase().includes(q) ||
        c.shortName.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        c.courses.some((course: any) => course.name.toLowerCase().includes(q))
    );
  }

  if (stream && stream !== "All" && typeof stream === "string") {
    colleges = colleges.filter((c: any) => c.stream === stream);
  }

  if (drccOnly === "true") {
    colleges = colleges.filter((c: any) => c.drccApproved === true);
  }

  if (state && typeof state === "string" && state !== "All") {
    colleges = colleges.filter((c: any) => c.state.toLowerCase() === state.toLowerCase());
  }

  res.json({ success: true, count: colleges.length, data: colleges });
});

app.get("/api/colleges/:id", (req: Request, res: Response) => {
  const db = loadDatabase();
  const college = db.colleges.find((c: any) => c.id === req.params.id);
  if (!college) {
    return res.status(404).json({ success: false, message: "College not found" });
  }
  res.json({ success: true, data: college });
});

// Create new college
app.post("/api/colleges", (req: Request, res: Response) => {
  const db = loadDatabase();
  const body = req.body;
  if (!body.name || !body.location || !body.phone) {
    return res.status(400).json({ success: false, message: "Name, location, and phone are required" });
  }

  const newCollege = {
    id: `col-${Date.now()}`,
    name: body.name.trim(),
    shortName: body.shortName ? body.shortName.trim() : body.name.split(" ")[0],
    tagline: body.tagline ? body.tagline.trim() : "Verified Partner Institute",
    location: body.location.trim(),
    state: body.state || "Bihar",
    type: body.type || "Private",
    stream: body.stream || "Engineering (B.Tech)",
    courses: body.courses && body.courses.length > 0 ? body.courses : [
      { code: "COURSE-1", name: "Degree Course", duration: "4 Years", annualFee: 120000, totalSeats: 60, eligibility: "12th Pass", drccEligible: true }
    ],
    drccApproved: body.drccApproved !== false,
    naacGrade: body.naacGrade || "A",
    approvals: Array.isArray(body.approvals) ? body.approvals : ["AICTE", "UGC", "DRCC Approved"],
    ranking: body.ranking || "State Accredited",
    avgPackage: body.avgPackage || "₹5.5 LPA",
    highestPackage: body.highestPackage || "₹18.0 LPA",
    topRecruiters: Array.isArray(body.topRecruiters) ? body.topRecruiters : ["TCS", "Wipro", "Infosys"],
    image: body.image || "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80",
    phone: body.phone.trim(),
    email: body.email ? body.email.trim() : "admissions@allindiacounselling.org",
    website: body.website ? body.website.trim() : "https://allindiacounselling.org",
    description: body.description ? body.description.trim() : "Partner college listed for admission and DRCC Bihar counselling.",
    hostelAvailable: body.hostelAvailable ?? true,
    scholarshipAvailable: body.scholarshipAvailable ?? true,
    featured: !!body.featured
  };

  db.colleges.unshift(newCollege);
  saveDatabase(db);

  res.status(201).json({ success: true, message: "College added successfully", data: newCollege });
});

// Edit existing college (PUT)
app.put("/api/colleges/:id", (req: Request, res: Response) => {
  const db = loadDatabase();
  const index = db.colleges.findIndex((c: any) => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "College not found to edit" });
  }

  const existing = db.colleges[index];
  const body = req.body;

  const updatedCollege = {
    ...existing,
    ...body,
    id: existing.id // preserve ID
  };

  db.colleges[index] = updatedCollege;
  saveDatabase(db);

  res.json({ success: true, message: "College details updated successfully!", data: updatedCollege });
});

// Delete college
app.delete("/api/colleges/:id", (req: Request, res: Response) => {
  const db = loadDatabase();
  const beforeLength = db.colleges.length;
  db.colleges = db.colleges.filter((c: any) => c.id !== req.params.id);

  if (db.colleges.length === beforeLength) {
    return res.status(404).json({ success: false, message: "College not found" });
  }

  saveDatabase(db);
  res.json({ success: true, message: "College removed successfully" });
});

// 3. Client & Student Posts Board - GET, POST, PUT, DELETE, LIKE
app.get("/api/posts", (req: Request, res: Response) => {
  const db = loadDatabase();
  let posts = db.posts || [];
  const { category, search } = req.query;

  if (category && category !== "All" && typeof category === "string") {
    posts = posts.filter((p: any) => p.category === category);
  }

  if (search && typeof search === "string") {
    const q = search.toLowerCase();
    posts = posts.filter(
      (p: any) =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.organization.toLowerCase().includes(q) ||
        p.authorName.toLowerCase().includes(q) ||
        p.courseOrStream.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: posts.length, data: posts });
});

app.post("/api/posts", (req: Request, res: Response) => {
  const db = loadDatabase();
  const { title, authorName, authorRole, organization, mobile, email, category, courseOrStream, location, content, feeDetails, seatsRemaining } = req.body;

  if (!title || !authorName || !mobile || !email || !content) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields: Title, Author Name, Mobile, Email, and Details."
    });
  }

  const cleanPhone = mobile.replace(/[^0-9+]/g, "");
  if (cleanPhone.length < 10) {
    return res.status(400).json({ success: false, message: "Please enter a valid 10-digit mobile number." });
  }

  const newPost = {
    id: `post-${Date.now()}`,
    title: title.trim(),
    authorName: authorName.trim(),
    authorRole: authorRole || "College Representative",
    organization: organization ? organization.trim() : "Education Helpline",
    mobile: cleanPhone,
    email: email.trim(),
    category: category || "Admission Alert",
    courseOrStream: courseOrStream ? courseOrStream.trim() : "General Stream",
    location: location ? location.trim() : "India",
    content: content.trim(),
    feeDetails: feeDetails ? feeDetails.trim() : undefined,
    seatsRemaining: seatsRemaining ? Number(seatsRemaining) : undefined,
    verified: true,
    createdAt: new Date().toISOString(),
    likes: 0
  };

  db.posts.unshift(newPost);
  saveDatabase(db);

  res.status(201).json({ success: true, message: "Post published successfully!", data: newPost });
});

// Edit post (PUT)
app.put("/api/posts/:id", (req: Request, res: Response) => {
  const db = loadDatabase();
  const index = db.posts.findIndex((p: any) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Post not found to edit" });
  }

  const existing = db.posts[index];
  const updatedPost = {
    ...existing,
    ...req.body,
    id: existing.id // preserve ID
  };

  db.posts[index] = updatedPost;
  saveDatabase(db);
  res.json({ success: true, message: "Post updated successfully!", data: updatedPost });
});

// Delete post
app.delete("/api/posts/:id", (req: Request, res: Response) => {
  const db = loadDatabase();
  const beforeLength = db.posts.length;
  db.posts = db.posts.filter((p: any) => p.id !== req.params.id);

  if (db.posts.length === beforeLength) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }

  saveDatabase(db);
  res.json({ success: true, message: "Post removed successfully" });
});

app.post("/api/posts/:id/like", (req: Request, res: Response) => {
  const db = loadDatabase();
  const post = db.posts.find((p: any) => p.id === req.params.id);
  if (!post) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }
  post.likes = (post.likes || 0) + 1;
  saveDatabase(db);
  res.json({ success: true, likes: post.likes });
});

// 4. Student Counselling Inquiries
app.get("/api/inquiries", (req: Request, res: Response) => {
  const db = loadDatabase();
  res.json({ success: true, data: db.inquiries || [] });
});

app.post("/api/inquiries", (req: Request, res: Response) => {
  const db = loadDatabase();
  const { fullName, mobile, email, state, district, tenthMarks, twelfthMarks, interestedStream, preferredCollegeId, drccAssistanceNeeded, message } = req.body;

  if (!fullName || !mobile || !email || !interestedStream) {
    return res.status(400).json({
      success: false,
      message: "Name, mobile, email, and preferred stream are required."
    });
  }

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const trackingId = `AIC-2026-${randomNum}`;

  const newInquiry = {
    id: `inq-${Date.now()}`,
    trackingId,
    fullName: fullName.trim(),
    mobile: mobile.trim(),
    email: email.trim(),
    state: state || "Bihar",
    district: district || "Patna",
    tenthMarks: tenthMarks || "N/A",
    twelfthMarks: twelfthMarks || "N/A",
    interestedStream,
    preferredCollegeId: preferredCollegeId || undefined,
    drccAssistanceNeeded: !!drccAssistanceNeeded,
    message: message ? message.trim() : "",
    status: "Counsellor Assigned",
    createdAt: new Date().toISOString()
  };

  db.inquiries.unshift(newInquiry);
  saveDatabase(db);

  res.status(201).json({
    success: true,
    message: "Your counselling request has been registered! A senior counsellor will call you shortly.",
    trackingId,
    data: newInquiry
  });
});

app.get("/api/inquiries/track/:trackingId", (req: Request, res: Response) => {
  const db = loadDatabase();
  const inquiry = (db.inquiries || []).find((i: any) => i.trackingId === req.params.trackingId);
  if (!inquiry) {
    return res.status(404).json({ success: false, message: "No counselling request found with this Tracking ID." });
  }
  res.json({ success: true, data: inquiry });
});

// 5. DRCC Bihar Student Credit Card Applications
app.get("/api/drcc-applications", (req: Request, res: Response) => {
  const db = loadDatabase();
  res.json({ success: true, data: db.drccApplications || [] });
});

app.post("/api/drcc-applications", (req: Request, res: Response) => {
  const db = loadDatabase();
  const {
    studentName, fatherName, mobile, email, aadhaarNo, gender, biharDistrict,
    twelfthBoard, twelfthRollCode, twelfthRollNo, twelfthPassingYear, twelfthPercentage,
    chosenCollege, chosenCourse, courseDurationYears, annualTuitionFee, hostelLivingFee
  } = req.body;

  if (!studentName || !mobile || !aadhaarNo || !biharDistrict || !chosenCourse) {
    return res.status(400).json({
      success: false,
      message: "Student Name, Mobile, Aadhaar Number, Bihar District, and Chosen Course are mandatory."
    });
  }

  const duration = Number(courseDurationYears) || 4;
  const tuition = Number(annualTuitionFee) || 75000;
  const living = Number(hostelLivingFee) || 25000;
  const calculatedTotal = Math.min((tuition + living) * duration, 400000);

  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const applicationNo = `MNSSBY-DRCC-${randomNum}`;

  const newApp = {
    id: `drcc-${Date.now()}`,
    applicationNo,
    studentName: studentName.trim(),
    fatherName: fatherName ? fatherName.trim() : "Guardian",
    mobile: mobile.trim(),
    email: email ? email.trim() : "student@example.com",
    aadhaarNo: aadhaarNo.length > 4 ? `XXXXXXXX${aadhaarNo.slice(-4)}` : aadhaarNo,
    gender: gender || "Male",
    biharDistrict: biharDistrict.trim(),
    twelfthBoard: twelfthBoard || "BSEB",
    twelfthRollCode: twelfthRollCode || "",
    twelfthRollNo: twelfthRollNo || "",
    twelfthPassingYear: twelfthPassingYear || "2025",
    twelfthPercentage: Number(twelfthPercentage) || 60,
    chosenCollege: chosenCollege || "Selected DRCC Approved Partner College",
    chosenCourse: chosenCourse.trim(),
    courseDurationYears: duration,
    annualTuitionFee: tuition,
    hostelLivingFee: living,
    totalLoanRequired: calculatedTotal,
    status: "Initial Verification Passed",
    createdAt: new Date().toISOString()
  };

  db.drccApplications.unshift(newApp);
  saveDatabase(db);

  res.status(201).json({
    success: true,
    message: "DRCC Bihar application pre-registered successfully! Your application reference number is generated.",
    applicationNo,
    data: newApp
  });
});

app.get("/api/drcc-applications/track/:appNo", (req: Request, res: Response) => {
  const db = loadDatabase();
  const item = (db.drccApplications || []).find((a: any) => a.applicationNo === req.params.appNo);
  if (!item) {
    return res.status(404).json({ success: false, message: "No DRCC application found with this reference number." });
  }
  res.json({ success: true, data: item });
});

// 6. Overall Portal Stats
app.get("/api/stats", (req: Request, res: Response) => {
  const db = loadDatabase();
  res.json({
    success: true,
    data: {
      totalColleges: (db.colleges || []).length,
      drccApprovedColleges: (db.colleges || []).filter((c: any) => c.drccApproved).length,
      activeNotices: (db.posts || []).length,
      studentsAssisted: 14850 + (db.inquiries || []).length,
      sanctionedLoansCr: "₹42.8+ Crores",
      partnerDistricts: 38
    }
  });
});

// Reset seed endpoint for easy instant reload of All India colleges
app.post("/api/reset-seed", (req: Request, res: Response) => {
  saveDatabase(initialSeedData);
  res.json({ success: true, message: "All India colleges database re-seeded successfully!", count: initialSeedData.colleges.length });
});

// Vite Middleware & SPA serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`All India Counselling Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
