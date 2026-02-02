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
              alt="edu9 Career Guidance" 
              className="h-12 w-12 rounded-full"
            />
            <span className="text-xl font-bold">Edu9 Career Guidance</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#home" className="hover:text-[#0074D9] transition-colors">Home</a>
            <a href="#services" className="hover:text-[#0074D9] transition-colors">Services</a>
            <a href="#colleges" className="hover:text-[#0074D9] transition-colors">Colleges</a>
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
      <section id="home" className="relative bg-gradient-to-br from-[#001F3F] via-[#0074D9] to-[#001F3F] text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <img 
              src="/edu9-logo.jpg" 
              alt="edu9 Career Guidance" 
              className="h-24 w-24 rounded-full mx-auto mb-6 border-4 border-white shadow-2xl"
            />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Secure Your Engineering Future with Confidence
            </h1>
            <p className="text-2xl mb-4 text-blue-100">
              100s of successful admissions | Your journey to top engineering colleges starts here
            </p>
            <Button 
              size="lg" 
              className="bg-[#FFD700] text-[#001F3F] hover:bg-yellow-500 text-lg px-12 py-6 rounded-full font-bold shadow-lg"
              onClick={() => setShowEnquiryForm(true)}
            >
              Book Career Counseling
            </Button>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2">{colleges.length}+</div>
                <div className="text-lg">Top Colleges</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2">50+</div>
                <div className="text-lg">Partner Institutions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2">10+</div>
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
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm text-[#0074D9] font-semibold mb-2 uppercase">Our Services</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[#001F3F] mb-4">We Handle the Hard Part</h3>
            <p className="text-xl text-gray-600">Focus on your dream while we take care of the complexities</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: 'COMEDK Registration', desc: 'Seamless assistance with COMEDK portal registration and documentation for aspiring engineers.' },
              { icon: CheckCircle, title: 'KCET Counseling', desc: 'Complete guidance for KCET counseling process and seat allocation procedures.' },
              { icon: Award, title: 'Document Verification', desc: 'End-to-end support for educational document verification required by colleges.' },
              { icon: Users, title: 'Admission Guidance', desc: 'Expert help in securing admission to your dream engineering college.' }
            ].map((service, idx) => (
              <Card key={idx} className="border-2 hover:border-[#0074D9] hover:shadow-xl transition-all cursor-pointer group">
                <CardHeader>
                  <div className="h-14 w-14 bg-[#0074D9] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <Button variant="link" className="text-[#0074D9] p-0">Learn more →</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Colleges Section */}
      <section id="colleges" className="py-20 bg-white">
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
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <img 
                src="/edu9-logo.jpg" 
                alt="edu9 Career Guidance" 
                className="h-16 w-16 rounded-full"
              />
              <div>
                <h3 className="text-3xl font-bold text-[#001F3F]">edu9 Career Guidance</h3>
                <p className="text-gray-600">346K subscribers</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-[#001F3F] mb-4">Watch & Learn</h2>
            <p className="text-xl text-gray-600 mb-8">
              Discover everything about engineering admissions through our informative video guides.
            </p>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-[#001F3F] to-[#0074D9] rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="h-20 w-20 mx-auto mb-4" />
                  <p className="text-xl">Video content coming soon</p>
                </div>
              </div>
            </div>
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

              <Button 
                size="lg"
                className="bg-[#FFD700] text-[#001F3F] hover:bg-yellow-500 px-12 py-6 text-lg font-bold"
              >
                View Fee Structure Details →
              </Button>
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
      <footer className="bg-[#001F3F] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img 
                src="/edu9-logo.jpg" 
                alt="edu9 Career Guidance" 
                className="h-16 w-16 rounded-full"
              />
              <div>
                <h3 className="text-2xl font-bold">edu9 Career Guidance</h3>
                <p className="text-blue-200">Engineering College Admissions Portal</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-blue-200 mb-2">
                Helping students make informed decisions about their engineering education
              </p>
              <p className="text-sm text-blue-300">
                © 2026 edu9 Career Guidance. All rights reserved.
              </p>
            </div>
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