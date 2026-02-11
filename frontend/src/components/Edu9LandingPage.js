import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowRight, 
  Search, 
  Building2, 
  MapPin, 
  IndianRupee, 
  Star, 
  BookOpen, 
  Award,
  CheckCircle,
  Users,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Edu9LandingPage = () => {
  const navigate = useNavigate();
  const [colleges, setColleges] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await axios.get(`${API}/colleges`);
      setColleges(response.data);
      setFilteredColleges(response.data);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  const filterColleges = useCallback(() => {
    let filtered = colleges;

    if (selectedType !== 'all') {
      filtered = filtered.filter((c) => c.admission_type === selectedType);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (college) =>
          college.name.toLowerCase().includes(query) ||
          college.location.toLowerCase().includes(query)
      );
    }

    setFilteredColleges(filtered);
  }, [colleges, selectedType, searchQuery]);

  useEffect(() => {
    filterColleges();
  }, [filterColleges]);

  const createSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  };

  const handleCollegeClick = (college) => {
    const slug = createSlug(college.name);
    navigate(`/college/${slug}`);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-[#001F3F] text-white py-4 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/edu9-logo.jpg" 
              alt="Edu9 Career Guidance" 
              className="h-12 w-12 rounded-full"
            />
            <span className="text-xl font-bold">Edu9 Career Guidance</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="/#home" className="hover:text-[#0074D9] transition-colors">Home</a>
            <a href="/#services" className="hover:text-[#0074D9] transition-colors">Services</a>
            <a href="/#colleges" className="hover:text-[#0074D9] transition-colors">Colleges</a>
            <a href="/#contact" className="hover:text-[#0074D9] transition-colors">Contact</a>
            <a 
              href="https://bookings.edu9.in/#/2026"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0074D9] text-white px-5 py-2 rounded-full font-bold hover:bg-[#FFD700] hover:text-[#001F3F] transition-colors"
            >
              Book Career Counselling
            </a>
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#001F3F]"
            >
              Dashboard
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-[#001F3F] via-[#0074D9] to-[#001F3F] text-white py-24 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <img 
              src="/edu9-logo.jpg" 
              alt="Edu9 Career Guidance" 
              className="h-24 w-24 rounded-full mx-auto mb-6 border-4 border-white shadow-2xl"
            />
            <h1 className="text-2xl md:text-2xl font-bold mb-6 leading-tight text-left">
 Get Admitted to Top Bangalore Engineering Colleges
            </h1>
            <p className="text-1xl mb-4 text-blue-100 text-left">
              500+ successful placements in premier colleges | Expert guidance for COMEDK, KCET & Management admissions
            </p>
            
            {/* Form Header */}
              <div className="bg-[#0055A5] px-6 py-4">
                <h3 className="text-white text-xl font-bold text-center">Enquiry Form</h3>
                <p className="text-white/80 text-sm text-center mt-1">Start your Engineering journey today</p>
              </div>
              {/* Meritto Form Widget */}
              <div className="p-1">
                <div 
                  className="npf_wgts" 
                  data-height="400px" 
                  data-w="48d9c2a459354029d770de776442581e"
                ></div>
              </div>
  

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2">500+</div>
                <div className="text-lg">Successful Admissions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2">{colleges.length}</div>
                <div className="text-lg">Partner Colleges</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2">15+</div>
                <div className="text-lg">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2">98%</div>
                <div className="text-lg">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm text-[#0074D9] font-semibold mb-2 uppercase">Our Services</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[#001F3F] mb-4">Bangalore Engineering Admissions Made Easy</h3>
            <p className="text-xl text-gray-600">Expert guidance for COMEDK, KCET, and Management quota admissions</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:border-[#0074D9] hover:shadow-xl transition-all cursor-pointer group">
              <CardHeader>
                <div className="h-14 w-14 bg-[#0074D9] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">COMEDK Counselling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Complete assistance with COMEDK counselling process, seat allocation, and document verification for Bangalore colleges.
                </p>
                <Button variant="link" className="text-[#0074D9] p-0">Learn more →</Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-[#0074D9] hover:shadow-xl transition-all cursor-pointer group">
              <CardHeader>
                <div className="h-14 w-14 bg-[#0074D9] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">KCET Counselling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Expert guidance for KCET counselling, choice filling, and seat allotment in top Bangalore engineering colleges.
                </p>
                <Button variant="link" className="text-[#0074D9] p-0">Learn more →</Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-[#0074D9] hover:shadow-xl transition-all cursor-pointer group">
              <CardHeader>
                <div className="h-14 w-14 bg-[#0074D9] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">Management Admissions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Direct admission support through management quota in premier Bangalore engineering institutions with complete transparency.
                </p>
                <Button variant="link" className="text-[#0074D9] p-0">Learn more →</Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-[#0074D9] hover:shadow-xl transition-all cursor-pointer group">
              <CardHeader>
                <div className="h-14 w-14 bg-[#0074D9] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">Admission Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Comprehensive career counseling and admission strategy for securing seats in top Bangalore engineering colleges.
                </p>
                <Button variant="link" className="text-[#0074D9] p-0">Learn more →</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Colleges Section */}
      <section id="colleges" className="py-20 bg-white scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm text-[#0074D9] font-semibold mb-2 uppercase">Top Colleges</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[#001F3F] mb-4">Engineering Education Excellence</h3>
            <p className="text-xl text-gray-600">Comprehensive information on Bangalore's best engineering colleges</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search colleges by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 text-lg border-2 focus:border-[#0074D9]"
              />
            </div>
            <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-4 w-full md:w-auto bg-[#001F3F]">
                <TabsTrigger value="all" className="data-[state=active]:bg-[#0074D9]">All</TabsTrigger>
                <TabsTrigger value="Government" className="data-[state=active]:bg-[#0074D9]">Govt</TabsTrigger>
                <TabsTrigger value="Private" className="data-[state=active]:bg-[#0074D9]">Private</TabsTrigger>
                <TabsTrigger value="Aided" className="data-[state=active]:bg-[#0074D9]">Aided</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Colleges Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.slice(0, 6).map((college) => (
              <Card
                key={college.id}
                className="border-2 hover:border-[#0074D9] hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden"
                onClick={() => handleCollegeClick(college)}
              >
                <div className="h-48 bg-gradient-to-br from-[#001F3F] to-[#0074D9] relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Building2 className="h-20 w-20 text-white/30" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#FFD700] text-[#001F3F] font-bold">
                      {college.admission_type}
                    </Badge>
                  </div>
                  {college.nirf_ranking && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white text-[#001F3F] font-bold">
                        <Award className="h-3 w-3 mr-1" />
                        NIRF #{college.nirf_ranking}
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#001F3F] mb-2 group-hover:text-[#0074D9] transition-colors">
                    {college.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {college.location}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">COMEDK</p>
                      <p className="text-sm font-bold text-[#0074D9]">
                        {college.comedk_fees === 0 ? 'N/A' : formatCurrency(college.comedk_fees)}
                      </p>
                    </div>
                    <div className="bg-green-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">KCET</p>
                      <p className="text-sm font-bold text-green-600">
                        {college.kcet_fees === 0 ? 'N/A' : formatCurrency(college.kcet_fees)}
                      </p>
                    </div>
                    <div className="bg-indigo-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">JEE Main</p>
                      <p className="text-sm font-bold text-indigo-600">
                        {!college.jee_fees || college.jee_fees === 0 ? 'N/A' : formatCurrency(college.jee_fees)}
                      </p>
                    </div>
                    <div className="bg-orange-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Management</p>
                      <p className="text-sm font-bold text-orange-600">
                        {!college.management_fees || college.management_fees === 0 ? 'N/A' : formatCurrency(college.management_fees)}
                      </p>
                    </div>
                  </div>

                  {college.donation && college.donation > 0 && (
                    <div className="bg-red-50 p-2 rounded-lg mb-4">
                      <p className="text-xs text-gray-600 mb-1">Donation (One-time)</p>
                      <p className="text-sm font-bold text-red-600">{formatCurrency(college.donation)}</p>
                    </div>
                  )}

                  <Button className="w-full bg-[#0074D9] hover:bg-[#001F3F] text-white">
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              onClick={() => document.getElementById('all-colleges')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#001F3F] hover:bg-[#0074D9] text-white px-8 py-6 text-lg"
            >
              View All {colleges.length} Colleges
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-[#F0F8FF]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img 
                src="/edu9-logo.jpg" 
                alt="Edu9 Career Guidance" 
                className="h-16 w-16 rounded-full"
              />
              <div className="text-left">
                <h3 className="text-3xl font-bold text-[#001F3F]">Edu9 Career Guidance</h3>
                <p className="text-gray-600">346K subscribers</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-[#001F3F] mb-4">Watch & Learn</h2>
            <p className="text-xl text-gray-600">
              Discover everything about engineering admissions through our informative video guides
            </p>
          </div>

          {/* Horizontal Scrolling Videos */}
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#0074D9] scrollbar-track-gray-200">
              {[
                { id: 'TNh4aaiCrec', title: 'COMEDK Engineering College Admissions Guide' },
                { id: 'qdWpI8nlhmE', title: 'KCET Counselling Process Explained' },
                { id: 'uGizA4hbIkM', title: 'Top Bangalore Engineering Colleges 2026' },
                { id: 'QFHpY8Q9h00', title: 'Management Quota Admissions - Complete Guide' },
                { id: '9BHSwtwWTg4', title: 'COMEDK exam 2026 90 days master plan'},
                { id: 'QPsqHv7_-Ds', title: 'top 10 comedk engineering colleges'},
                { id: 'yKisD6-Gx1M', title: 'pes university campus live tour'},
                { id: '7UHzwcjpvj8', title: 'garden city university live tour'}
              ].map((video, idx) => (
                <Card 
                  key={idx} 
                  className="flex-shrink-0 w-[450px] snap-start overflow-hidden border-2 hover:border-[#0074D9] hover:shadow-xl transition-all"
                >
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-t-lg"
                    ></iframe>
                  </div>
                  <CardContent className="p-4 bg-white">
                    <h4 className="font-semibold text-[#001F3F] mb-2">{video.title}</h4>
                    <p className="text-sm text-gray-600">Edu9 Career Guidance</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              👉 Scroll horizontally to view all videos
            </p>
          </div>
        </div>
      </section>

      {/* Pay-as-you-go Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[#FFD700] text-[#001F3F] px-6 py-2 rounded-full font-bold mb-6">
              edu9 Beauty
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#001F3F] mb-6">
              Pay-As-You-Go Model
            </h2>
            <p className="text-2xl text-gray-600 mb-12">
              Transparent. Flexible. Student-Friendly.
            </p>

            <div className="bg-gradient-to-br from-[#001F3F] to-[#0074D9] text-white rounded-2xl p-12">
              <p className="text-xl mb-8">
                No burden of one-stretch payments. Our stage-wise consultation structure ensures you pay only for what you need, when you need it. Complete transparency in every step of your admission journey.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {['Stage-wise consultation', 'No hidden costs', 'Flexible payment options'].map((feature, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                    <CheckCircle className="h-10 w-10 text-[#FFD700] mx-auto mb-3" />
                    <p className="font-semibold">{feature}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <p className="text-white text-lg mb-2">Stage-wise payment structure</p>
                <Button 
                  size="lg"
                  className="bg-[#FFD700] text-[#001F3F] hover:bg-yellow-500 px-12 py-6 text-lg font-bold"
                  onClick={() => navigate('/payment-structure')}
                >
                  Click to view details →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Colleges Section */}
      <section id="all-colleges" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#001F3F] text-center mb-12">
            Complete List of Engineering Colleges
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.map((college) => (
              <Card
                key={college.id}
                className="border-2 hover:border-[#0074D9] hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handleCollegeClick(college)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={college.admission_type === 'Government' ? 'bg-green-600' : 'bg-[#0074D9]'}>
                      {college.admission_type}
                    </Badge>
                    {college.nirf_ranking && (
                      <span className="text-sm text-gray-600">NIRF #{college.nirf_ranking}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-[#001F3F] mb-2">{college.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{college.location}</p>
                  <div className="flex gap-2 text-sm">
                    <span className="text-[#0074D9] font-semibold">
                      COMEDK: {college.comedk_fees === 0 ? 'N/A' : formatCurrency(college.comedk_fees)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#001F3F] text-white py-12 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src="/edu9-logo.jpg" 
                  alt="Edu9 Career Guidance" 
                  className="h-20 w-20 rounded-full"
                />
                <div>
                  <h3 className="text-2xl font-bold">Edu9 Career Guidance</h3>
                  <p className="text-blue-200 text-sm">Engineering Admissions Portal</p>
                </div>
              </div>
              <p className="text-blue-200 mb-4 leading-relaxed">
                Edu9 Career Guidance provides expert counselling and admission guidance for Bangalore's top engineering colleges including RV, BMS, PES, UVCE and more.
              </p>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 bg-white/10 hover:bg-[#0074D9] rounded-lg flex items-center justify-center transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 bg-white/10 hover:bg-[#0074D9] rounded-lg flex items-center justify-center transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 bg-white/10 hover:bg-[#0074D9] rounded-lg flex items-center justify-center transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://wa.me/919133311450" target="_blank" rel="noopener noreferrer" className="h-10 w-10 bg-white/10 hover:bg-[#0074D9] rounded-lg flex items-center justify-center transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold mb-4 text-[#FFD700]">Quick Links</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a href="#colleges" className="hover:text-white transition-colors">Top Engineering Colleges</a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors">COMEDK Counselling</a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors">KCET Counselling</a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors">Management Admissions</a>
                </li>
                <li>
                  <a href="/dashboard" className="hover:text-white transition-colors">Our Services</a>
                </li>
                <li>
                  <a href="#home" className="hover:text-white transition-colors">Contact Us</a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xl font-bold mb-4 text-[#FFD700]">Contact</h4>
              <div className="space-y-3 text-blue-200">
                <p className="flex items-start gap-2">
                  <svg className="h-5 w-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Phone: 9133311450</span>
                </p>
                <p className="flex items-start gap-2">
                  <svg className="h-5 w-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email: manager@edu9.in</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Hyderabad, Telangana</span>
                </p>
              </div>
              <Button 
                size="lg"
                className="bg-[#FFD700] text-[#001F3F] hover:bg-yellow-500 font-bold mt-6 w-full"
                onClick={() => setShowEnquiryForm(true)}
              >
                Book Consultation
              </Button>
            </div>
          </div>

          {/* Google Maps */}
          <div className="mb-8">
            <h4 className="text-xl font-bold mb-4 text-[#FFD700]">Visit Our Office</h4>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.529363622335!2d78.44231507516596!3d17.434359483460852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9160af7ddf1b%3A0xd324b68f71027183!2sEdu9%20Career%20Guidance%20%7C%20B.Tech%2C%20Diploma%2C%20MBA%2C%20B.Sc.Agriculture%2C%20B.V.SC%20%26%20A.H%2C%20MBBS%20Colleges%20Best%20Career%20Guidance!5e0!3m2!1sen!2sin!4v1770117807664!5m2!1sen!2sin" 
                width="100%" 
                height="350" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Edu9 Career Guidance Location"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-blue-800 pt-6 text-center">
            <p className="text-blue-300">
              © 2026 Edu9 Career Guidance. All rights reserved. | Bangalore Engineering College Admissions
            </p>
          </div>
        </div>
      </footer>

      {/* Enquiry Form Modal */}
      {showEnquiryForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Start Your Engineering Journey Today</CardTitle>
              <button 
                onClick={() => setShowEnquiryForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input placeholder="Full Name" className="border-2" />
                <Input placeholder="Phone Number" type="tel" className="border-2" />
                <Input placeholder="Email" type="email" className="border-2" />
                <Input placeholder="City" className="border-2" />
                <Button className="w-full bg-[#0074D9] hover:bg-[#001F3F] py-6 text-lg">
                  Submit Enquiry
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Edu9LandingPage;