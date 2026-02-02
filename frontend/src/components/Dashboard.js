import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, Pencil, Trash2, Search, Building2, MapPin, IndianRupee, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BRANCHES = [
  "Computer Science Engineering (CSE)",
  "Electronics and Communication Engineering (ECE)",
  "Mechanical Engineering",
  "Civil Engineering",
  "Information Science Engineering (ISE)",
  "Electrical and Electronics Engineering (EEE)",
  "Artificial Intelligence and Machine Learning (AI/ML)",
  "Data Science",
];

const ADMISSION_TYPES = ["Government", "Private", "Aided"];

const Dashboard = ({ onNavigateToLanding }) => {
  const navigate = useNavigate();
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCollege, setEditingCollege] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    comedk_fees: "",
    kcet_fees: "",
    branches: [],
    admission_type: "Private",
    established_year: "",
    affiliation: "",
  });

  const fetchColleges = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/colleges`);
      setColleges(response.data);
      setFilteredColleges(response.data);
    } catch (error) {
      console.error("Error fetching colleges:", error);
      toast({
        title: "Error",
        description: "Failed to fetch colleges",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const filterColleges = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredColleges(colleges);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = colleges.filter(
      (college) =>
        college.name.toLowerCase().includes(query) ||
        college.location.toLowerCase().includes(query) ||
        college.admission_type.toLowerCase().includes(query)
    );
    setFilteredColleges(filtered);
  }, [searchQuery, colleges]);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  useEffect(() => {
    filterColleges();
  }, [filterColleges]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.location ||
      !formData.comedk_fees ||
      !formData.kcet_fees ||
      formData.branches.length === 0
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...formData,
        comedk_fees: parseFloat(formData.comedk_fees),
        kcet_fees: parseFloat(formData.kcet_fees),
        established_year: formData.established_year
          ? parseInt(formData.established_year)
          : null,
      };

      if (editingCollege) {
        await axios.put(`${API}/colleges/${editingCollege.id}`, payload);
        toast({
          title: "Success",
          description: "College updated successfully",
        });
      } else {
        await axios.post(`${API}/colleges`, payload);
        toast({
          title: "Success",
          description: "College added successfully",
        });
      }

      fetchColleges();
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving college:", error);
      toast({
        title: "Error",
        description: "Failed to save college",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this college?")) {
      return;
    }

    try {
      await axios.delete(`${API}/colleges/${id}`);
      toast({
        title: "Success",
        description: "College deleted successfully",
      });
      fetchColleges();
    } catch (error) {
      console.error("Error deleting college:", error);
      toast({
        title: "Error",
        description: "Failed to delete college",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (college) => {
    setEditingCollege(college);
    setFormData({
      name: college.name,
      location: college.location,
      comedk_fees: college.comedk_fees.toString(),
      kcet_fees: college.kcet_fees.toString(),
      branches: college.branches,
      admission_type: college.admission_type,
      established_year: college.established_year?.toString() || "",
      affiliation: college.affiliation || "",
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      comedk_fees: "",
      kcet_fees: "",
      branches: [],
      admission_type: "Private",
      established_year: "",
      affiliation: "",
    });
    setEditingCollege(null);
  };

  const handleBranchToggle = (branch) => {
    setFormData((prev) => ({
      ...prev,
      branches: prev.branches.includes(branch)
        ? prev.branches.filter((b) => b !== branch)
        : [...prev.branches, branch],
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src="/edu9-logo.jpg" 
                alt="Edu9 Career Guidance" 
                className="h-16 w-16 rounded-full border-2 border-blue-600"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                  College Management Dashboard
                </h1>
                <p className="text-gray-600 mt-1">Manage COMEDK & KCET Fee Information</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                data-testid="back-to-landing-btn"
              >
                <Home className="h-4 w-4 mr-2" />
                Back to Landing
              </Button>
              <Button
                onClick={() => {
                  resetForm();
                  setIsDialogOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700"
                data-testid="add-college-btn"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add College
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search colleges by name, location, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="search-input"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Colleges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {colleges.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Government Colleges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {colleges.filter((c) => c.admission_type === "Government").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Private Colleges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {colleges.filter((c) => c.admission_type === "Private").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colleges Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading colleges...</p>
          </div>
        ) : filteredColleges.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 text-lg">
              {searchQuery ? "No colleges found matching your search" : "No colleges added yet"}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => {
                  resetForm();
                  setIsDialogOpen(true);
                }}
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First College
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredColleges.map((college) => (
              <Card
                key={college.id}
                className="hover:shadow-lg transition-shadow duration-200"
                data-testid="college-card"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{college.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {college.location}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(college)}
                        data-testid="edit-college-btn"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(college.id)}
                        data-testid="delete-college-btn"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  <Badge
                    variant={college.admission_type === "Government" ? "default" : "secondary"}
                    className="mt-2 w-fit"
                  >
                    {college.admission_type}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">COMEDK Fees</p>
                        <p className="text-2xl font-bold text-blue-600 flex items-center">
                          <IndianRupee className="h-5 w-5" />
                          {formatCurrency(college.comedk_fees).replace('₹', '')}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">per year</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">KCET Fees</p>
                        <p className="text-2xl font-bold text-green-600 flex items-center">
                          <IndianRupee className="h-5 w-5" />
                          {formatCurrency(college.kcet_fees).replace('₹', '')}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">per year</p>
                      </div>
                    </div>

                    <div className="text-sm space-y-1">
                      {college.established_year && (
                        <p className="text-gray-600">
                          <span className="font-medium">Established:</span> {college.established_year}
                        </p>
                      )}
                      {college.affiliation && (
                        <p className="text-gray-600">
                          <span className="font-medium">Affiliation:</span> {college.affiliation}
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Available Branches:</p>
                      <div className="flex flex-wrap gap-2">
                        {college.branches.map((branch, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {branch}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCollege ? "Edit College" : "Add New College"}
            </DialogTitle>
            <DialogDescription>
              Enter the college details with COMEDK and KCET fee information
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">College Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., RV College of Engineering"
                  required
                  data-testid="college-name-input"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Bangalore"
                  required
                  data-testid="college-location-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="comedk_fees">COMEDK Annual Fees (₹) *</Label>
                  <Input
                    id="comedk_fees"
                    type="number"
                    value={formData.comedk_fees}
                    onChange={(e) =>
                      setFormData({ ...formData, comedk_fees: e.target.value })
                    }
                    placeholder="e.g., 200000"
                    required
                    data-testid="comedk-fees-input"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="kcet_fees">KCET Annual Fees (₹) *</Label>
                  <Input
                    id="kcet_fees"
                    type="number"
                    value={formData.kcet_fees}
                    onChange={(e) =>
                      setFormData({ ...formData, kcet_fees: e.target.value })
                    }
                    placeholder="e.g., 50000"
                    required
                    data-testid="kcet-fees-input"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Admission Type *</Label>
                <Select
                  value={formData.admission_type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, admission_type: value })
                  }
                >
                  <SelectTrigger data-testid="admission-type-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ADMISSION_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="established_year">Established Year</Label>
                  <Input
                    id="established_year"
                    type="number"
                    value={formData.established_year}
                    onChange={(e) =>
                      setFormData({ ...formData, established_year: e.target.value })
                    }
                    placeholder="e.g., 1963"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="affiliation">Affiliation</Label>
                  <Input
                    id="affiliation"
                    value={formData.affiliation}
                    onChange={(e) =>
                      setFormData({ ...formData, affiliation: e.target.value })
                    }
                    placeholder="e.g., VTU"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Available Branches * (Select at least one)</Label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border rounded-md">
                  {BRANCHES.map((branch) => (
                    <div key={branch} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={branch}
                        checked={formData.branches.includes(branch)}
                        onChange={() => handleBranchToggle(branch)}
                        className="rounded border-gray-300"
                      />
                      <label
                        htmlFor={branch}
                        className="text-sm cursor-pointer select-none"
                      >
                        {branch}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
                data-testid="submit-college-btn"
              >
                {loading ? "Saving..." : editingCollege ? "Update College" : "Add College"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
