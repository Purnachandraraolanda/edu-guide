import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import "@/App.css";
import { MapPin, GraduationCap, Building2, Train, ExternalLink, Menu, X, MessageSquare, CheckCircle, Users, Settings, Play, Phone, Mail, Youtube, CreditCard, Shield, Sparkles, ArrowLeft, FileText, AlertCircle } from "lucide-react";

// College data based on user's provided list
const collegesData = [
  {
    rank: 1,
    name: "R.V. College of Engineering",
    shortName: "RVCE",
    location: "Mysore Road, Bangalore",
    cseCutoff: "1 - 450",
    avgPackage: "₹12.5 LPA",
    hostel: "Available for Boys & Girls",
    branches: ["Computer Science", "Electronics", "Mechanical", "Civil", "Information Science"],
    facilities: ["Advanced Labs", "Central Library"],
    metro: "Kengeri Metro (4 km)",
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80"
  },
  {
    rank: 2,
    name: "B.M.S. College of Engineering",
    shortName: "BMSCE",
    location: "Basavanagudi, Bangalore",
    cseCutoff: "450 - 1300",
    avgPackage: "₹10.8 LPA",
    hostel: "Available for Boys & Girls",
    branches: ["Computer Science", "Electronics", "Mechanical", "Civil", "Information Science"],
    facilities: ["Modern Labs", "Auditorium"],
    metro: "Lalbagh Metro (2 km)",
    image: "https://images.unsplash.com/photo-1622604647545-0cada2f34470?w=800&q=80"
  },
  {
    rank: 3,
    name: "M.S. Ramaiah Institute of Technology",
    shortName: "MSRIT",
    location: "Mathikere, Bangalore",
    cseCutoff: "800 - 1700",
    avgPackage: "₹9.5 LPA",
    hostel: "Available for Boys & Girls",
    branches: ["Computer Science", "Electronics", "Mechanical", "Civil", "Chemical"],
    facilities: ["Tech Park", "Library Complex"],
    metro: "Yeshwanthpur Metro (3 km)",
    image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=800&q=80"
  },
  {
    rank: 4,
    name: "Dayananda Sagar College of Engineering",
    shortName: "DSCE",
    location: "Kumaraswamy Layout, Bangalore",
    cseCutoff: "2500 - 4200",
    avgPackage: "₹7.5 LPA",
    hostel: "Available for Boys & Girls",
    branches: ["Computer Science", "Electronics", "Mechanical", "Civil", "Biotechnology"],
    facilities: ["Modern Labs", "Auditorium Complex"],
    metro: "Rajarajeshwari Nagar Metro (3 km)",
    image: "https://images.unsplash.com/photo-1695204906099-8d6394c2752f?w=800&q=80"
  },
  {
    rank: 5,
    name: "Bangalore Institute of Technology",
    shortName: "BIT",
    location: "K.R. Market, V.V. Puram, Bangalore",
    cseCutoff: "3500 - 5600",
    avgPackage: "₹7.0 LPA",
    hostel: "Available for Boys & Girls",
    branches: ["Computer Science", "Electronics", "Mechanical", "Civil", "Telecommunication"],
    facilities: ["Advanced Labs", "Central Library"],
    metro: "National College Metro (2 km)",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&q=80"
  },
  {
    rank: 6,
    name: "BMS Institute of Technology",
    shortName: "BMSIT",
    location: "Yelahanka, Bangalore",
    cseCutoff: "4000 - 6200",
    avgPackage: "₹6.8 LPA",
    hostel: "Available for Boys & Girls",
    branches: ["Computer Science", "Electronics", "Mechanical", "Civil", "Information Science"],
    facilities: ["Innovation Labs", "Digital Library"],
    metro: "Yelahanka Metro (5 km)",
    image: "https://images.unsplash.com/photo-1695205847178-eb302dcf8382?w=800&q=80"
  },
  {
    rank: 7,
    name: "Sir M. Visvesvaraya Institute of Technology",
    shortName: "Sir MVIT",
    location: "Airport Road, Bangalore",
    cseCutoff: "6000 - 8800",
    avgPackage: "₹6.2 LPA",
    hostel: "Available for Boys & Girls",
    branches: ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical"],
    facilities: ["Modern Labs", "Library"],
    metro: "Nearest Metro under construction",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80"
  },
  {
    rank: 8,
    name: "R.N.S. Institute of Technology",
    shortName: "RNSIT",
    location: "Channasandra, Bangalore",
    cseCutoff: "9000 - 12500",
    avgPackage: "₹5.8 LPA",
    hostel: "Available for Boys & Girls",
    branches: ["Computer Science", "Electronics", "Mechanical", "Civil", "Information Science"],
    facilities: ["Modern Labs", "Sports Complex"],
    metro: "Kengeri Metro (8 km)",
    image: "https://images.pexels.com/photos/33977829/pexels-photo-33977829.jpeg?w=800"
  },
  {
    rank: 9,
    name: "JSS Academy of Technical Education",
    shortName: "JSSATE",
    location: "Uttarahalli, Bangalore",
    cseCutoff: "11000 - 15000",
    avgPackage: "₹5.5 LPA",
    hostel: "Available for Boys & Girls",
    branches: ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical"],
    facilities: ["Advanced Labs", "Auditorium"],
    metro: "Uttarahalli Metro (4 km)",
    image: "https://images.pexels.com/photos/31070772/pexels-photo-31070772.jpeg?w=800"
  },
  {
    rank: 10,
    name: "BNM Institute of Technology",
    shortName: "BNMIT",
    location: "Banashankari, Bangalore",
    cseCutoff: "12000 - 16500",
    avgPackage: "₹5.2 LPA",
    hostel: "Available for Boys & Girls",
    branches: ["Computer Science", "Electronics", "Mechanical", "Civil", "Information Science"],
    facilities: ["Modern Labs", "Library Complex"],
    metro: "Banashankari Metro (3 km)",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80"
  },
  {
    rank: 11,
    name: "Dayananda Sagar Academy of Technology & Management",
    shortName: "DSATM",
    location: "Kanakapura Road, Bangalore",
    cseCutoff: "15000 - 19000",
    avgPackage: "₹5.0 LPA",
    hostel: "Available for Boys & Girls",
    branches: ["Computer Science", "Electronics", "Mechanical", "Civil", "Information Science"],
    facilities: ["Modern Labs", "Sports Complex"],
    metro: "Kengeri Metro (6 km)",
    image: "https://www.google.com/imgres?q=dayananda%20sagar%20academy%20of%20technology%20%26%20management&imgurl=https%3A%2F%2Fcolleges18.s3.ap-south-1.amazonaws.com%2FDayananda_Sagar_Academy_of_Technology_and_Management_Bangalore_2_JPG_25f7c3f2ef.jpg&imgrefurl=https%3A%2F%2Fwww.colleges18.com%2Fcollege%2F1849-dayananda-sagar-academy-of-technology-and-management-bangalore&docid=AtWzzjT-5WFhhM&tbnid=xj2w23s8w_vPIM&vet=12ahUKEwiD3pvHoNGSAxUXS2wGHV5bA4gQnPAOegQIHhAB..i&w=720&h=480&hcb=2&ved=2ahUKEwiD3pvHoNGSAxUXS2wGHV5bA4gQnPAOegQIHhAB"
  },
  {
    rank: 12,
    name: "CMR Institute of Technology",
    shortName: "CMRIT",
    location: "Whitefield (IT Park), Bangalore",
    cseCutoff: "16000 - 21000",
    avgPackage: "₹5.5 LPA",
    hostel: "Available for Boys & Girls",
    branches: ["Computer Science", "Electronics", "Mechanical", "Civil", "Information Science"],
    facilities: ["Innovation Labs", "Central Library"],
    metro: "Whitefield Metro (4 km)",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80"
  }
];

// Company Logo URL
const LOGO_URL = "https://customer-assets.emergentagent.com/job_tech-kar-campus/artifacts/jll8vs18_channels4_profile.jpg";

// Navigation Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar" data-testid="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo" data-testid="logo">
          <img src={LOGO_URL} alt="Edu9 Logo" className="logo-image" />
          <div className="logo-text">
            <span className="logo-name">Edu9</span>
            <span className="logo-tagline">Career Guidance</span>
          </div>
        </Link>
        
        <div className="nav-links-desktop">
          <Link to="/" className="nav-link" data-testid="nav-home">Home</Link>
          <a href="/#services" className="nav-link" data-testid="nav-services">Services</a>
          <a href="#colleges" className="nav-link" data-testid="nav-colleges">Colleges</a>
          
          <Link to="/payment-structure" className="nav-link" data-testid="nav-payment">Payment Structure</Link>
           <a href="/#contact" className="nav-link" data-testid="nav-contact">Contact</a>
          
           
        </div>
         

        <a href="tel:+919133311450" className="nav-phone" data-testid="nav-phone">
          <Phone size={18} />
          <span>+91 9133311450</span>
        </a>

        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsOpen(!isOpen)}
          data-testid="mobile-menu-toggle"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="mobile-nav" data-testid="mobile-nav">
          <Link to="/" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Home</Link>
          <a href="#services" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Services</a>
          <a href="#colleges" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Colleges</a>
          <Link to="/payment-structure" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Payment Structure</Link>
          <a href="#contact" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Contact</a>
          <a href="tel:+919133311450" className="mobile-nav-link phone-link" onClick={() => setIsOpen(false)}>
            <Phone size={16} /> +91 9133311450
          </a>
        </div>
      )}
    </nav>
  );
};

// Hero Section

const HeroSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your enquiry! We will contact you soon.');
    setFormData({ name: '', phone: '', email: '', course: '' });
  };

  return (
    <section className="hero" data-testid="hero-section">
      <div className="hero-layout">
        {/* Left Side - Content */}
        <div className="hero-left">
          <h1 className="hero-title" data-testid="hero-title">
            Get Admitted to Top Bangalore Engineering Colleges
          </h1>
          <p className="hero-subtitle" data-testid="hero-subtitle">
            500+ successful placements in premier colleges | Expert guidance for COMEDK, KCET & Management admissions
          </p>
          
          <div className="stats-row" data-testid="stats-section">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Successful Admissions</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">14</span>
              <span className="stat-label">Partner Colleges</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
        </div>

        {/* Right Side - Meritto Form */}
          <div className="w-full lg:w-[420px] animate-slide-up-delay" id="enquiry-form">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Form Header */}
              <div className="bg-[#0055A5] px-6 py-4">
                <h3 className="text-white text-xl font-bold text-center">Enquiry Form</h3>
                <p className="text-white/80 text-sm text-center mt-1">Start your Engineering journey today</p>
              </div>
              {/* Meritto Form Widget */}
              <div className="p-1">
                <div 
                  className="npf_wgts" 
                  data-height="480px" 
                  data-w="48d9c2a459354029d770de776442581e"
                ></div>
              </div>
            </div>
          </div>
      </div>
      
    </section>
  );
};

// College Card Component
const CollegeCard = ({ college }) => (
  <div className="college-card" data-testid={`college-card-${college.rank}`}>
    <div className="card-image-wrapper">
      <img 
        src={college.image} 
        alt={college.name}
        className="card-image"
        loading="lazy"
      />
      <div className="card-badges">
        <span className="rank-badge" data-testid={`rank-badge-${college.rank}`}>#{college.rank}</span>
        <span className="cutoff-badge" data-testid={`cutoff-badge-${college.rank}`}>
          CSE: {college.cseCutoff}
        </span>
      </div>
    </div>
    
    <div className="card-content">
      <h3 className="college-name" data-testid={`college-name-${college.rank}`}>{college.name}</h3>
      <p className="college-short" data-testid={`college-short-${college.rank}`}>({college.shortName})</p>
      
      <div className="college-location">
        <MapPin size={16} />
        <span>{college.location}</span>
      </div>
      
      <div className="info-grid">
        <div className="info-item">
          <span className="info-label">AVG. PACKAGE</span>
          <span className="info-value highlight">{college.avgPackage}</span>
        </div>
        <div className="info-item">
          <span className="info-label">HOSTEL</span>
          <span className="info-value">{college.hostel}</span>
        </div>
      </div>
      
      <div className="branches-section">
        <span className="section-label">Key Branches:</span>
        <div className="branches-tags">
          {college.branches.slice(0, 3).map((branch, idx) => (
            <span key={idx} className="branch-tag">{branch}</span>
          ))}
          {college.branches.length > 3 && (
            <span className="branch-tag more">+{college.branches.length - 3} more</span>
          )}
        </div>
      </div>
      
      <div className="facilities-section">
        {college.facilities.map((facility, idx) => (
          <span key={idx} className="facility-tag">{facility}</span>
        ))}
      </div>
      
      <div className="metro-info">
        <Train size={16} />
        <span>{college.metro}</span>
      </div>
      
      <button className="view-details-btn" data-testid={`view-details-${college.rank}`}>
        View Full Details
        <ExternalLink size={16} />
      </button>
    </div>
  </div>
);

// Services Section
const ServicesSection = () => {
  const services = [
    {
      icon: <MessageSquare size={28} />,
      title: "COMEDK Counselling",
      description: "Complete assistance with COMEDK counselling process, seat allocation, and document verification for Bangalore colleges."
    },
    {
      icon: <CheckCircle size={28} />,
      title: "KCET Counselling",
      description: "Expert guidance for KCET counselling, choice filling, and seat allotment in top Bangalore engineering colleges."
    },
    {
      icon: <Users size={28} />,
      title: "Management Admissions",
      description: "Direct admission support through management quota in premier Bangalore engineering institutions with complete transparency."
    },
    {
      icon: <Settings size={28} />,
      title: "Admission Guidance",
      description: "Comprehensive career counseling and admission strategy for securing seats in top Bangalore engineering colleges."
    }
  ];

  return (
    <section id="services" className="services-section" data-testid="services-section">
      <div className="services-container">
        <span className="services-badge">OUR SERVICES</span>
        <h2 className="services-title" data-testid="services-title">
          Bangalore Engineering Admissions Made Easy
        </h2>
        <p className="services-subtitle">
          Expert guidance for COMEDK, KCET, and Management quota admissions
        </p>
        
        <div className="services-grid" data-testid="services-grid">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="service-card"
              data-testid={`service-card-${idx + 1}`}
            >
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              
<a href="#services" className="service-link" data-testid={`service-link-${idx + 1}`}>
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Colleges Table Section
const CollegesTableSection = () => {
  const tableData = [
    { rank: 1, name: "R.V. College of Engineering", shortName: "RVCE", location: "Mysore Road", cutoff: "1 - 450" },
    { rank: 2, name: "B.M.S. College of Engineering", shortName: "BMSCE", location: "Basavanagudi", cutoff: "450 - 1300" },
    { rank: 3, name: "M.S. Ramaiah Institute of Technology", shortName: "MSRIT", location: "Mathikere", cutoff: "800 - 1700" },
    { rank: 4, name: "Dayananda Sagar College of Engineering", shortName: "DSCE", location: "Kumaraswamy Layout", cutoff: "2500 - 4200" },
    { rank: 5, name: "Bangalore Institute of Technology", shortName: "BIT", location: "K.R. Market", cutoff: "3500 - 5600" },
    { rank: 6, name: "BMS Institute of Technology", shortName: "BMSIT", location: "Yelahanka", cutoff: "4000 - 6200" },
    { rank: 7, name: "Sir M. Visvesvaraya Institute of Tech", shortName: "Sir MVIT", location: "Airport Road", cutoff: "6000 - 8800" },
    { rank: 8, name: "R.N.S. Institute of Technology", shortName: "RNSIT", location: "Channasandra", cutoff: "9000 - 12500" },
    { rank: 9, name: "JSS Academy of Technical Education", shortName: "JSSATE", location: "Uttarahalli", cutoff: "11000 - 15000" },
    { rank: 10, name: "BNM Institute of Technology", shortName: "BNMIT", location: "Banashankari", cutoff: "12000 - 16500" }
  ];

  return (
    <section id="colleges" className="colleges-table-section" data-testid="colleges-table-section">
      <div className="table-container">
        <span className="table-badge">TOP COLLEGES</span>
        <h2 className="table-title" data-testid="table-title">Top Colleges</h2>
        
        <div className="table-wrapper" data-testid="colleges-table">
          <table className="colleges-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>College Name</th>
                <th>Short Name</th>
                <th>Location</th>
                <th>Est. CSE Cutoff (Rank)</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((college) => (
                <tr key={college.rank} data-testid={`table-row-${college.rank}`}>
                  <td className="rank-cell">{college.rank}</td>
                  <td className="name-cell">{college.name}</td>
                  <td className="short-cell">{college.shortName}</td>
                  <td className="location-cell">{college.location}</td>
                  <td className="cutoff-cell">{college.cutoff}</td>
                </tr>
              ))}

              
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

// Colleges Section
const CollegesSection = () => (
  <section id="colleges" className="colleges-section" data-testid="colleges-section">
    <div className="section-header">
      <h2 className="section-title" data-testid="colleges-title">
        Top 12 COMEDK Engineering Colleges in Bangalore
      </h2>
      <p className="section-subtitle">
        Explore detailed information about Bangalore's premier engineering institutions
      </p>
    </div>
    
    <div className="colleges-grid" data-testid="colleges-grid">
      {collegesData.map((college) => (
        <CollegeCard key={college.rank} college={college} />
      ))}
    </div>
  </section>
);

// About COMEDK Section
const AboutSection = () => (
  <section id="about" className="about-section" data-testid="about-section">
    <div className="about-container">
      <h2 className="about-title" data-testid="about-title">About COMEDK UGET</h2>
      <p className="about-subtitle">
        Consortium of Medical, Engineering and Dental Colleges of Karnataka
      </p>
      
      <p className="about-description">
        COMEDK UGET (Undergraduate Entrance Test) is a state-level entrance examination 
        conducted for admission to undergraduate engineering programs in Karnataka's top 
        private engineering colleges.
      </p>
      
      <div className="about-grid">
        <div className="about-card">
          <h4>Eligibility</h4>
          <p>Must have passed 10+2 with Physics, Chemistry, and Mathematics with minimum 45% aggregate marks.</p>
        </div>
        
        <div className="about-card">
          <h4>Exam Pattern</h4>
          <ul>
            <li><strong>Subjects:</strong> Physics, Chemistry, Mathematics</li>
            <li><strong>Questions:</strong> 180</li>
            <li><strong>Duration:</strong> 3 hours</li>
            <li><strong>No negative marking</strong></li>
          </ul>
        </div>
        
        <div className="about-card benefits-card">
          <h4>Benefits of COMEDK</h4>
          <ul>
            <li>Single exam for admission to multiple top engineering colleges</li>
            <li>No need to appear for multiple entrance tests</li>
            <li>Merit-based transparent admission process</li>
            <li>Access to some of the best engineering colleges in Karnataka</li>
            <li>Better career opportunities with quality education</li>
          </ul>
        </div>
      </div>
      
      <a 
        href="https://www.comedk.org/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="btn btn-primary comedk-btn"
        data-testid="comedk-website-btn"
      >
        Visit Official COMEDK Website
        <ExternalLink size={16} />
      </a>
    </div>
  </section>
);

// Watch & Learn Section (YouTube Videos)
const VideoSection = () => {
  const videos = [
    {
      id: "TNh4aaiCrec",
      title: "COMEDK 2026 Strategy Guide",
      description: "Roadmap to Top 10 Bengaluru Engineering Colleges"
    },
    {
      id: "qdWpI8nlhmE",
      title: "Why Bangalore for Engineering?",
      description: "Best for Students - Mini Hyderabad Explained"
    },
    {
      id: "uGizA4hbIkM",
      title: "KCET vs COMEDK for B.Tech",
      description: "Truth, Costs & Common Scams Exposed"
    },
    {
      id: "QFHpY8Q9h00",
      title: "COMEDK UGET 2026 Official Guide",
      description: "Registration, Eligibility & Dates"
    }
  ];

  return (
    <section className="video-section" data-testid="video-section">
      <div className="video-container">
        <div className="video-header">
          <div className="youtube-badge">
            <Youtube size={20} />
            <span>346K subscribers</span>
          </div>
          <h2 className="video-title" data-testid="video-title">Watch & Learn</h2>
          <p className="video-subtitle">
            Discover everything about engineering admissions through our informative video guides
          </p>
        </div>
        
        <div className="video-grid" data-testid="video-grid">
          {videos.map((video, idx) => (
            <a 
              key={idx}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="video-card"
              data-testid={`video-card-${idx + 1}`}
            >
              <div className="video-thumbnail">
                <img 
                  src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  loading="lazy"
                />
                <div className="play-overlay">
                  <Play size={40} fill="white" />
                </div>
              </div>
              <div className="video-info">
                <h4>{video.title}</h4>
                <p>{video.description}</p>
              </div>
            </a>
          ))}
        </div>
        
        <a 
          href="https://www.youtube.com/@edu9lvgr" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-secondary youtube-btn"
          data-testid="youtube-channel-btn"
        >
          <Youtube size={18} />
          View All Videos
        </a>
      </div>
    </section>
  );
};

// Pay-As-You-Go Section
const PaymentSection = () => (
  <section className="payment-section" data-testid="payment-section">
    <div className="payment-container">
      <span className="payment-badge-gold">Edu9 Beauty</span>
      <h2 className="payment-title" data-testid="payment-title">Pay-As-You-Go Model</h2>
      <p className="payment-tagline">Transparent. Flexible. Student-Friendly.</p>
      
      <div className="payment-card">
        <p className="payment-description">
          No burden of one-stretch payments. Our stage-wise consultation structure ensures 
          you pay only for what you need, when you need it. Complete transparency in every 
          step of your admission journey.
        </p>
        
        <div className="payment-features">
          <div className="payment-feature-box">
            <CheckCircle size={20} />
            <span>Stage-wise consultation</span>
          </div>
          <div className="payment-feature-box">
            <CheckCircle size={20} />
            <span>No hidden costs</span>
          </div>
          <div className="payment-feature-box">
            <CheckCircle size={20} />
            <span>Flexible payment options</span>
          </div>
        </div>
        
        <p className="payment-structure">Stage-wise payment structure</p>
        
        <Link to="/payment-structure" className="payment-details-btn" data-testid="view-pricing-btn">
          Click to view details →
        </Link>
      </div>
    </div>
  </section>
);

// CTA Section
const CTASection = () => (
  <section className="cta-section" data-testid="cta-section">
    <div className="cta-content">
      <h2 className="cta-title">Ready to Start Your Engineering Journey?</h2>
      <p className="cta-subtitle">
        Explore top COMEDK colleges and find the perfect fit for your career aspirations
      </p>
      <a href="#colleges" className="btn btn-primary" data-testid="compare-colleges-btn">
        Compare Colleges
      </a>
    </div>
  </section>
);

// WhatsApp Button Component
const WhatsAppButton = () => (
  <a 
    href="https://wa.me/919133311450?text=Hi%2C%20I%20need%20guidance%20for%20engineering%20college%20admission"
    target="_blank"
    rel="noopener noreferrer"
    className="whatsapp-float"
    data-testid="whatsapp-btn"
  >
    <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    <span>Chat with us</span>
  </a>
);

// Partner Logos Marquee Section
const PartnersSection = () => {
  const partnerColleges = [
    { name: "RVCE", fullName: "R.V. College of Engineering" },
    { name: "BMSCE", fullName: "B.M.S. College of Engineering" },
    { name: "MSRIT", fullName: "M.S. Ramaiah Institute of Technology" },
    { name: "DSCE", fullName: "Dayananda Sagar College of Engineering" },
    { name: "BIT", fullName: "Bangalore Institute of Technology" },
    { name: "BMSIT", fullName: "BMS Institute of Technology" },
    { name: "MVIT", fullName: "Sir M. Visvesvaraya Institute of Tech" },
    { name: "RNSIT", fullName: "R.N.S. Institute of Technology" },
    { name: "JSSATE", fullName: "JSS Academy of Technical Education" },
    { name: "BNMIT", fullName: "BNM Institute of Technology" },
    { name: "DSATM", fullName: "Dayananda Sagar Academy of Tech" },
    { name: "CMRIT", fullName: "CMR Institute of Technology" },
  ];

  // Double the array for seamless loop
  const doubledLogos = [...partnerColleges, ...partnerColleges];

  return (
    <section className="partners-section" data-testid="partners-section">
      <div className="partners-container">
        <span className="partners-badge">OUR PARTNERS</span>
        <h2 className="partners-title" data-testid="partners-title">
          Partner Colleges & Institutions
        </h2>
        <p className="partners-subtitle">
          Trusted partnerships with top engineering colleges in Bangalore
        </p>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {doubledLogos.map((college, idx) => (
            <div key={idx} className="partner-logo-card" data-testid={`partner-logo-${idx}`}>
              <div className="partner-logo-icon">
                <GraduationCap size={28} />
              </div>
              <div className="partner-logo-text">
                <span className="partner-short">{college.name}</span>
                <span className="partner-full">{college.fullName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second row - reverse direction */}
      <div className="marquee-wrapper reverse">
        <div className="marquee-track">
          {doubledLogos.map((college, idx) => (
            <div key={idx} className="partner-logo-card" data-testid={`partner-logo-rev-${idx}`}>
              <div className="partner-logo-icon">
                <GraduationCap size={28} />
              </div>
              <div className="partner-logo-text">
                <span className="partner-short">{college.name}</span>
                <span className="partner-full">{college.fullName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer CTA Section
const FooterCTA = () => (
  <section id="contact" className="footer-cta" data-testid="footer-cta">
  <div className="footer-cta-container">
    <div className="footer-cta-content">
      <h2>Start Your Engineering Journey Today</h2>
      
      {/* Changed <button> to <a> and added the href link */}
      <a 
        href="https://bookings.edu9.in/#/2026" 
        target="_blank" 
        rel="noopener noreferrer"
        className="btn btn-primary enquire-btn inline-block" 
        data-testid="enquire-now-btn"
        style={{ textDecoration: 'none' }}
      >
        get career counselling!
      </a>
      
    </div>
    <div className="footer-cta-card">
      <div className="cta-card-inner"></div>
    </div>
  </div>
</section>
);

// Footer Component
const Footer = () => (
  <footer className="footer" data-testid="footer">
    <div className="footer-container">
      <div className="footer-grid-4">
        {/* Column 1: Brand & Social */}
        <div className="footer-brand-section">
          <div className="footer-logo">
            <img src={LOGO_URL} alt="Edu9 Logo" className="footer-logo-image" />
            <div className="footer-brand-text">
              <span className="footer-brand">Edu9</span>
              <span className="footer-brand-sub">Career Guidance</span>
            </div>
          </div>
          <p className="footer-description">
            Your trusted partner for engineering college admissions in Bangalore. Expert guidance for COMEDK, KCET & Management admissions.
          </p>
          <div className="social-links">
            <a href="https://www.facebook.com/edu9careerguide/" target="_blank" rel="noopener noreferrer" className="social-link" data-testid="social-facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/edu9careerguide/" target="_blank" rel="noopener noreferrer" className="social-link" data-testid="social-instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://x.com/edu9careerguide" target="_blank" rel="noopener noreferrer" className="social-link" data-testid="social-twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Column 2: Quick Links */}
        <div className="footer-links-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Programs</a></li>
            <li><a href="#">FTO Partners</a></li>
            <li><a href="#">Success Stories</a></li>
            <li><a href="#">Blog</a></li>
            {/* Add the Privacy Policy link here */}
    
          </ul>
        </div>
        
        {/* Column 3: Contact Us */}
        <div className="footer-contact-section">
          <h4>Contact Us</h4>
          <div className="contact-item">
            <Phone size={18} />
            <div>
              <span className="contact-label">Call Us</span>
              <span className="contact-value">+91 9133311450</span>
            </div>
          </div>
          <div className="contact-item">
            <Mail size={18} />
            <div>
              <span className="contact-label">Email Us</span>
              <span className="contact-value">ceo@edu9.in</span>
            </div>
          </div>
          <div className="contact-item">
            <MapPin size={18} />
            <div>
              <span className="contact-label">Visit Us</span>
              <span className="contact-value">Unit No 1312, 12th Floor, Vasavi Mpm Grand, beside Ameerpet Metro Station, Ameerpet, Hyderabad, Telangana 500073</span>
            </div>
          </div>
          <div className="contact-item">
            <Building2 size={18} />
            <div>
              <span className="contact-label">Working Hours</span>
              <span className="contact-value">Mon - Sat: 9AM - 7PM</span>
            </div>
          </div>
        </div>
        
        {/* Column 4: Map */}
        <div className="footer-map-section">
          <h4>Find Us</h4>
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.529363622335!2d78.44231507516596!3d17.434359483460852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9160af7ddf1b%3A0xd324b68f71027183!2sEdu9%20Career%20Guidance%20%7C%20B.Tech%2C%20Diploma%2C%20MBA%2C%20B.Sc.Agriculture%2C%20B.V.SC%20%26%20A.H%2C%20MBBS%20Colleges%20Best%20Career%20Guidance!5e0!3m2!1sen!2sin!4v1770805054132!5m2!1sen!2sin"
              width="100%"
              height="180"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            ></iframe>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2026 Edu9 Career Guidance. All information is for educational purposes.
        </p>
        {/* This is your new link */}
    <Link to="/privacy-policy" className="text-white/70 hover:text-[#FFD700] text-sm transition-colors">
      Privacy Policy
    </Link>
      </div>
    </div>
    
    
  </footer>
);

// Payment Structure Page Component
const PaymentStructurePage = () => {
  const navigate = useNavigate();
  
  const stages = [
    {
      number: 1,
      title: "Career Guidance & Counselling",
      description: "Initial consultation to understand your goals and guide you through the admission process",
      amount: "10,000",
      important: false,
      includes: [
        "One-on-one career counseling session",
        "College selection guidance based on your rank",
        "Understanding of COMEDK, KCET, JEE options",
        "Branch and specialization recommendations",
        "Personalized admission strategy",
        "Documentation checklist provided"
      ]
    },
    {
      number: 2,
      title: "Management Quota Admission Processing",
      description: "Complete assistance for management quota admission process",
      amount: "1,00,000",
      important: true,
      importantNote: "Only applicable if you choose Management Quota admission",
      includes: [
        "College and branch confirmation",
        "Document preparation and verification",
        "Application submission support",
        "College liaison and coordination",
        "Seat booking assistance",
        "All official formalities handled"
      ]
    },
    {
      number: 3,
      title: "Remaining Donation - Direct College Payment",
      description: "Final donation amount paid directly to the college (not to Edu9)",
      amount: "Variable",
      important: true,
      importantNote: "This is a direct college fee - Edu9 provides guidance only",
      includes: [
        "Amount varies by college (₹12L - ₹50L)",
        "Paid directly to the college administration",
        "Edu9 does NOT collect this payment",
        "College provides official receipt",
        "Payment schedule as per college policy",
        "We guide you through the process"
      ]
    }
  ];

  return (
    <div className="payment-structure-page" data-testid="payment-structure-page">
      {/* Header */}
      <header className="ps-header">
        <div className="ps-header-container">
          <Link to="/" className="ps-logo">
            <img src={LOGO_URL} alt="Edu9 Logo" className="logo-image" />
            <span className="logo-name">Edu9</span>
            <span className="logo-sub">Career Guidance</span>
          </Link>
          
          <button 
            onClick={() => navigate('/')} 
            className="back-btn"
            data-testid="back-to-home-btn"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="ps-hero">
        <span className="ps-badge">Payment Structure</span>
        <h1 className="ps-title" data-testid="ps-title">Stage-Wise Payment Structure</h1>
        <p className="ps-subtitle">
          Transparent. Flexible. Student-Friendly. Pay only what you need, when you need it.
        </p>
      </section>

      {/* How It Works */}
      <section className="ps-how-it-works">
        <div className="ps-container">
          <h2>How Our Payment Structure Works</h2>
          <p>
            At Edu9 Career Guidance, we believe in complete transparency. Our stage-wise 
            payment model ensures you pay only for the services you need, at each step of 
            your admission journey. No hidden costs, no surprises.
          </p>
        </div>
      </section>

      {/* Stages */}
      <section className="ps-stages">
        <div className="ps-container">
          {stages.map((stage, idx) => (
            <div 
              key={idx} 
              className={`stage-card ${stage.important ? 'stage-important' : ''}`}
              data-testid={`stage-${stage.number}`}
            >
              <div className="stage-header">
                <span className="stage-number">Stage {stage.number}</span>
                {stage.important && (
                  <span className="stage-tag">Important</span>
                )}
              </div>
              
              <h3 className="stage-title">{stage.title}</h3>
              <p className="stage-description">{stage.description}</p>
              
              <div className="stage-amount-box">
                <span className="amount-label">Payment Amount</span>
                <span className="amount-value">
                  {stage.amount === "Variable" ? stage.amount : `₹${stage.amount}`}
                </span>
              </div>
              
              <div className="stage-includes">
                <h4>What's Included:</h4>
                <ul>
                  {stage.includes.map((item, i) => (
                    <li key={i}>
                      <CheckCircle size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              {stage.importantNote && (
                <div className="stage-note">
                  <AlertCircle size={18} />
                  <span><strong>Important Note:</strong> {stage.importantNote}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Example Breakdown */}
      <section className="ps-example">
        <div className="ps-container">
          <h3 className="example-title">Example: Total Cost Breakdown</h3>
          
          <div className="example-grid">
            <div className="example-card">
              <h4>Edu9 Service Fees:</h4>
              <div className="fee-row">
                <span>Stage 1: Career Guidance</span>
                <span>₹10,000</span>
              </div>
              <div className="fee-row">
                <span>Stage 2: Management Quota Processing</span>
                <span>₹1,00,000</span>
              </div>
              <div className="fee-total">
                <span>Total Edu9 Fees:</span>
                <span>₹1,10,000</span>
              </div>
            </div>
            
            <div className="example-card college-card">
              <h4>Direct College Payment:</h4>
              <div className="fee-row">
                <span>Stage 3: College Donation</span>
                <span>₹12L - ₹50L</span>
              </div>
              <p className="fee-note">* Paid directly to college (not to Edu9)</p>
              <p className="fee-example">Example for RV College: ₹25,00,000</p>
            </div>
          </div>
          
          <Link to="/#colleges" className="btn btn-primary explore-btn" data-testid="explore-colleges-btn">
            Explore Colleges & Compare Fees
          </Link>
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
};

// Home Page Component
const HomePage = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <ServicesSection />
      <CollegesSection />
      <VideoSection />
      <PaymentSection />
      <PartnersSection />
      <FooterCTA />
    </main>
    <Footer />
    <WhatsAppButton />
  </>
);

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <div className="app" data-testid="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/payment-structure" element={<PaymentStructurePage />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
