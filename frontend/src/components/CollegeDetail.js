import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Building2,
  MapPin,
  IndianRupee,
  Award,
  Users,
  BookOpen,
  TrendingUp,
  Home,
  ExternalLink,
  CheckCircle2,
  GraduationCap,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CollegeDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCollegeDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchCollegeDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/colleges/slug/${slug}`);
      setCollege(response.data);
    } catch (err) {
      console.error("Error fetching college:", err);
      setError("College not found");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading college details...</p>
        </div>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">College Not Found</h2>
          <p className="text-gray-600 mb-6">The college you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/")}>
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src="/edu9-logo.jpg" 
              alt="Edu9 Career Guidance" 
              className="h-12 w-12 rounded-full border-2 border-white"
            />
            <span className="text-lg font-semibold">Edu9 Career Guidance</span>
          </div>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4"
            onClick={() => navigate("/")}
            data-testid="back-to-home-btn"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Colleges
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Building2 className="h-10 w-10" />
                <div>
                  <h1 className="text-4xl font-bold" data-testid="college-name">{college.name}</h1>
                  <div className="flex items-center gap-2 mt-2 text-blue-100">
                    <MapPin className="h-4 w-4" />
                    <span>{college.location}</span>
                    {college.established_year && (
                      <span className="ml-4">Est. {college.established_year}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-white/20 text-white border-white/30">
                  {college.admission_type}
                </Badge>
                {college.affiliation && (
                  <Badge className="bg-white/20 text-white border-white/30">
                    {college.affiliation}
                  </Badge>
                )}
                {college.nirf_ranking && (
                  <Badge className="bg-amber-500 text-white">
                    <Award className="h-3 w-3 mr-1" />
                    NIRF Rank: {college.nirf_ranking}
                  </Badge>
                )}
              </div>
            </div>
            
            {college.website && (
              <Button
                variant="secondary"
                onClick={() => window.open(college.website, "_blank")}
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Visit Website
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            {college.description && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    About {college.name.split(' ')[0]}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{college.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Admission Quotas */}
            {college.admission_quotas && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Admission Quotas & Seats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {college.total_seats && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Total Seats</p>
                        <p className="text-3xl font-bold text-blue-600">{college.total_seats}</p>
                      </div>
                    )}
                    
                    {college.admission_quotas.comedk > 0 && (
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">COMEDK Quota</p>
                        <p className="text-3xl font-bold text-purple-600">{college.admission_quotas.comedk}</p>
                        <p className="text-xs text-gray-500 mt-1">seats available</p>
                      </div>
                    )}
                    
                    {college.admission_quotas.kcet > 0 && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">KCET Quota</p>
                        <p className="text-3xl font-bold text-green-600">{college.admission_quotas.kcet}</p>
                        <p className="text-xs text-gray-500 mt-1">seats available</p>
                      </div>
                    )}
                    
                    {college.admission_quotas.cet > 0 && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">CET Quota</p>
                        <p className="text-3xl font-bold text-green-600">{college.admission_quotas.cet}</p>
                        <p className="text-xs text-gray-500 mt-1">seats available</p>
                      </div>
                    )}
                    
                    {college.admission_quotas.management > 0 && (
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Management Quota</p>
                        <p className="text-3xl font-bold text-orange-600">{college.admission_quotas.management}</p>
                        <p className="text-xs text-gray-500 mt-1">seats available</p>
                      </div>
                    )}
                    
                    {college.admission_quotas.jee_main > 0 && (
                      <div className="bg-indigo-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">JEE Main Quota</p>
                        <p className="text-3xl font-bold text-indigo-600">{college.admission_quotas.jee_main}</p>
                        <p className="text-xs text-gray-500 mt-1">seats available</p>
                      </div>
                    )}
                    
                    {college.admission_quotas.university_entrance > 0 && (
                      <div className="bg-pink-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">University Entrance</p>
                        <p className="text-3xl font-bold text-pink-600">{college.admission_quotas.university_entrance}</p>
                        <p className="text-xs text-gray-500 mt-1">seats available</p>
                      </div>
                    )}
                    
                    {college.admission_quotas.nri > 0 && (
                      <div className="bg-teal-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">NRI Quota</p>
                        <p className="text-3xl font-bold text-teal-600">{college.admission_quotas.nri}</p>
                        <p className="text-xs text-gray-500 mt-1">seats available</p>
                      </div>
                    )}
                    
                    {college.admission_quotas.snq > 0 && (
                      <div className="bg-cyan-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">SNQ (Special Category)</p>
                        <p className="text-3xl font-bold text-cyan-600">{college.admission_quotas.snq}</p>
                        <p className="text-xs text-gray-500 mt-1">seats available</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Branches */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  Engineering Branches Offered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {college.branches.map((branch, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{branch}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Placements */}
            {college.placements && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Placements & Recruiters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      {college.placements.average_package && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Average Package</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {formatCurrency(college.placements.average_package)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">per annum</p>
                        </div>
                      )}
                      {college.placements.highest_package && (
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Highest Package</p>
                          <p className="text-2xl font-bold text-green-600">
                            {formatCurrency(college.placements.highest_package)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">per annum</p>
                        </div>
                      )}
                    </div>
                    {college.placements.top_recruiters && (
                      <div>
                        <p className="font-semibold text-gray-900 mb-3">Top Recruiters:</p>
                        <div className="flex flex-wrap gap-2">
                          {college.placements.top_recruiters.map((recruiter, index) => (
                            <Badge key={index} variant="outline" className="text-sm">
                              {recruiter}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Facilities */}
            {college.facilities && college.facilities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Campus Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {college.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{facility}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Fee Structure */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="h-5 w-5 text-blue-600" />
                  Fee Structure (2026-27)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">COMEDK Fees</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {college.comedk_fees === 0 ? 'N/A' : formatCurrency(college.comedk_fees)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">per year</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">KCET Fees</p>
                  <p className="text-2xl font-bold text-green-600">
                    {college.kcet_fees === 0 ? 'N/A' : formatCurrency(college.kcet_fees)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">per year</p>
                </div>
                {college.jee_fees > 0 && (
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">JEE Main Fees</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {formatCurrency(college.jee_fees)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">per year</p>
                  </div>
                )}
                {college.management_fees > 0 && (
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Management Quota Fees</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatCurrency(college.management_fees)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">per year</p>
                  </div>
                )}
                {college.donation > 0 && (
                  <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
                    <p className="text-sm text-gray-600 mb-1">Donation</p>
                    <p className="text-2xl font-bold text-red-600">
                      {formatCurrency(college.donation)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">one-time payment</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {college.campus_area && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Campus Area:</span>
                    <span className="font-semibold">{college.campus_area}</span>
                  </div>
                )}
                {college.total_seats && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Intake:</span>
                    <span className="font-semibold">{college.total_seats} students</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Branches:</span>
                  <span className="font-semibold">{college.branches.length}</span>
                </div>
                {college.nirf_ranking && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">NIRF Ranking:</span>
                    <span className="font-semibold">#{college.nirf_ranking}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Other Rankings */}
            {college.other_rankings && Object.keys(college.other_rankings).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-600" />
                    Other Rankings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {Object.entries(college.other_rankings).map(([source, rank]) => (
                    <div key={source} className="flex justify-between">
                      <span className="text-gray-600">{source}:</span>
                      <span className="font-semibold">#{rank}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetail;
