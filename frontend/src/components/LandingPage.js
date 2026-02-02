import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight, GraduationCap, TrendingDown, Shield, Search, Building2, MapPin, IndianRupee, CheckCircle, Star, Users, BookOpen, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LandingPage = ({ onNavigateToDashboard }) => {
  const navigate = useNavigate();
  const [colleges, setColleges] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [selectedType, setSelectedType] = useState("all");

  const createSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  };

  const handleCollegeClick = (college) => {
    const slug = createSlug(college.name);
    navigate(`/college/${slug}`);
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await axios.get(`${API}/colleges`);
      setColleges(response.data);
      setFilteredColleges(response.data);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }
  };

  const filterColleges = useCallback(() => {
    let filtered = colleges;

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter((c) => c.admission_type === selectedType);
    }

    // Filter by search query
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const avgComedkFees = colleges.length > 0
    ? colleges.reduce((sum, c) => sum + c.comedk_fees, 0) / colleges.length
    : 0;

  const avgKcetFees = colleges.length > 0
    ? colleges.reduce((sum, c) => sum + c.kcet_fees, 0) / colleges.length
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Company Logo */}
            <div className="flex justify-center mb-6">
              <img 
                src="/edu9-logo.jpg" 
                alt="Edu9 Career Guidance" 
                className="h-20 w-20 rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <Badge className="mb-4 bg-white/20 text-white border-white/30" data-testid="hero-badge">
              <Star className="h-3 w-3 mr-1" />
              Top 10+ Bangalore Engineering Colleges
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Find Your Dream Engineering College in Bangalore
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Compare COMEDK & KCET fees for top engineering colleges. Make informed decisions for your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
                onClick={() => document.getElementById('colleges-section').scrollIntoView({ behavior: 'smooth' })}
                data-testid="explore-colleges-btn"
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                Explore Colleges
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                onClick={() => navigate("/dashboard")}
                data-testid="manage-data-btn"
              >
                Manage Data
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-50 to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center" data-testid="total-colleges-stat">
              <div className="flex items-center justify-center mb-2">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900">{colleges.length}</div>
              <div className="text-gray-600 mt-1">Total Colleges</div>
            </div>
            <div className="text-center" data-testid="government-colleges-stat">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900">
                {colleges.filter(c => c.admission_type === "Government").length}
              </div>
              <div className="text-gray-600 mt-1">Government</div>
            </div>
            <div className="text-center" data-testid="avg-comedk-fees-stat">
              <div className="flex items-center justify-center mb-2">
                <IndianRupee className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900">
                {formatCurrency(avgComedkFees).replace('₹', '₹')}
              </div>
              <div className="text-gray-600 mt-1">Avg COMEDK Fees</div>
            </div>
            <div className="text-center" data-testid="avg-kcet-fees-stat">
              <div className="flex items-center justify-center mb-2">
                <TrendingDown className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900">
                {formatCurrency(avgKcetFees).replace('₹', '₹')}
              </div>
              <div className="text-gray-600 mt-1">Avg KCET Fees</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600">Everything you need to make the right college choice</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Easy Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Compare COMEDK and KCET fees side-by-side for all top engineering colleges in Bangalore.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Verified Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All fee structures are verified and updated regularly to ensure accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Top Institutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Access information about the best engineering colleges ranked by reputation and quality.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Colleges Section */}
      <section id="colleges-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Bangalore Engineering Colleges</h2>
            <p className="text-xl text-gray-600">Explore detailed fee information for COMEDK & KCET admissions</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search colleges by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-6 text-lg"
                  data-testid="landing-search-input"
                />
              </div>
            </div>
            <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-4 w-full md:w-auto">
                <TabsTrigger value="all" data-testid="filter-all">All</TabsTrigger>
                <TabsTrigger value="Government" data-testid="filter-government">Government</TabsTrigger>
                <TabsTrigger value="Private" data-testid="filter-private">Private</TabsTrigger>
                <TabsTrigger value="Aided" data-testid="filter-aided">Aided</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Colleges Grid */}
          {filteredColleges.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">No colleges found matching your criteria</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredColleges.map((college) => (
                <Card
                  key={college.id}
                  className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300 cursor-pointer group"
                  onClick={() => handleCollegeClick(college)}
                  data-testid="landing-college-card"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge
                        variant={college.admission_type === "Government" ? "default" : "secondary"}
                        className="mb-2"
                      >
                        {college.admission_type}
                      </Badge>
                      {college.established_year && college.established_year < 1980 && (
                        <Badge variant="outline" className="border-amber-500 text-amber-700">
                          <Star className="h-3 w-3 mr-1" />
                          Legacy
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors">
                      {college.name}
                    </CardTitle>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {college.location}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <ExternalLink className="h-4 w-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-sm text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Fees */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">COMEDK</p>
                          <p className="text-lg font-bold text-blue-600 flex items-center">
                            <IndianRupee className="h-4 w-4" />
                            {college.comedk_fees === 0 ? 'N/A' : formatCurrency(college.comedk_fees).replace('₹', '')}
                          </p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">KCET</p>
                          <p className="text-lg font-bold text-green-600 flex items-center">
                            <IndianRupee className="h-4 w-4" />
                            {college.kcet_fees === 0 ? 'N/A' : formatCurrency(college.kcet_fees).replace('₹', '')}
                          </p>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="text-sm space-y-1">
                        {college.established_year && (
                          <p className="text-gray-600">
                            <span className="font-medium">Est:</span> {college.established_year}
                          </p>
                        )}
                        {college.affiliation && (
                          <p className="text-gray-600">
                            <span className="font-medium">Affiliation:</span> {college.affiliation}
                          </p>
                        )}
                      </div>

                      {/* Branches Count */}
                      <div className="flex items-center text-sm text-gray-600">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {college.branches.length} Branches Available
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Perfect College?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Start exploring and comparing fees to make the best decision for your engineering career.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
            onClick={() => navigate("/dashboard")}
            data-testid="cta-dashboard-btn"
          >
            Go to Full Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/edu9-logo.jpg" 
              alt="Edu9 Career Guidance" 
              className="h-12 w-12 rounded-full mr-3"
            />
            <div className="text-left">
              <span className="text-xl font-bold block">edu9 Career Guidance</span>
              <span className="text-sm text-gray-400">Engineering College Fees Portal</span>
            </div>
          </div>
          <p className="text-gray-400">
            Helping students make informed decisions about their engineering education in Bangalore.
          </p>
          <p className="text-gray-500 mt-4 text-sm">
            © 2026 edu9 Career Guidance. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
