import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, IndianRupee, Users, FileText, Building2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PaymentStructure = () => {
  const navigate = useNavigate();

  const stages = [
    {
      stage: 1,
      title: 'Career Guidance & Counselling',
      amount: 10000,
      icon: Users,
      description: 'Initial consultation to understand your goals and guide you through the admission process',
      includes: [
        'One-on-one career counseling session',
        'College selection guidance based on your rank',
        'Understanding of COMEDK, KCET, JEE options',
        'Branch and specialization recommendations',
        'Personalized admission strategy',
        'Documentation checklist provided'
      ],
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600'
    },
    {
      stage: 2,
      title: 'Management Quota Admission Processing',
      amount: 100000,
      icon: FileText,
      description: 'Complete assistance for management quota admission process',
      includes: [
        'College and branch confirmation',
        'Document preparation and verification',
        'Application submission support',
        'College liaison and coordination',
        'Seat booking assistance',
        'All official formalities handled'
      ],
      color: 'orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-600',
      note: 'Only applicable if you choose Management Quota admission'
    },
    {
      stage: 3,
      title: 'Remaining Donation - Direct College Payment',
      amount: 'Variable',
      icon: Building2,
      description: 'Final donation amount paid directly to the college (not to Edu9)',
      includes: [
        'Amount varies by college (₹12L - ₹50L)',
        'Paid directly to the college administration',
        'Edu9 does NOT collect this payment',
        'College provides official receipt',
        'Payment schedule as per college policy',
        'We guide you through the process'
      ],
      color: 'red',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-600',
      note: 'This is a direct college fee - Edu9 provides guidance only'
    }
  ];

  const formatCurrency = (amount) => {
    if (typeof amount === 'string') return amount;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#001F3F] to-[#0074D9] text-white py-8">
        <div className="container mx-auto px-4">
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
            className="text-white hover:bg-white/10"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          <div className="mt-6">
            <Badge className="bg-[#FFD700] text-[#001F3F] mb-4">Payment Structure</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Stage-Wise Payment Structure</h1>
            <p className="text-xl text-blue-100">
              Transparent. Flexible. Student-Friendly. Pay only what you need, when you need it.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Introduction */}
        <Card className="mb-8 border-2 border-[#0074D9]">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-[#001F3F] mb-4">How Our Payment Structure Works</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              At Edu9 Career Guidance, we believe in complete transparency. Our stage-wise payment model ensures you 
              pay only for the services you need, at each step of your admission journey. No hidden costs, no surprises.
            </p>
          </CardContent>
        </Card>

        {/* Payment Stages */}
        <div className="space-y-8">
          {stages.map((stage, index) => (
            <Card 
              key={stage.stage} 
              className={`border-2 ${stage.borderColor} shadow-lg hover:shadow-xl transition-shadow`}
            >
              <CardHeader className={stage.bgColor}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`h-16 w-16 ${stage.bgColor} border-2 ${stage.borderColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <stage.icon className={`h-8 w-8 ${stage.textColor}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={`${stage.bgColor} ${stage.textColor} border ${stage.borderColor}`}>
                          Stage {stage.stage}
                        </Badge>
                        {stage.note && (
                          <Badge variant="outline" className="text-xs">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Important
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-2xl mb-2">{stage.title}</CardTitle>
                      <CardDescription className="text-base">{stage.description}</CardDescription>
                    </div>
                  </div>
                  <div className={`${stage.bgColor} border-2 ${stage.borderColor} rounded-lg px-6 py-3`}>
                    <p className="text-sm text-gray-600 mb-1">Payment Amount</p>
                    <p className={`text-3xl font-bold ${stage.textColor} flex items-center gap-1`}>
                      {typeof stage.amount === 'number' ? (
                        <>
                          <IndianRupee className="h-6 w-6" />
                          {formatCurrency(stage.amount).replace('₹', '')}
                        </>
                      ) : (
                        <span>{stage.amount}</span>
                      )}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-lg mb-4 text-gray-900">What's Included:</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {stage.includes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className={`h-5 w-5 ${stage.textColor} flex-shrink-0 mt-0.5`} />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                {stage.note && (
                  <div className={`mt-6 ${stage.bgColor} border ${stage.borderColor} rounded-lg p-4`}>
                    <p className={`${stage.textColor} font-semibold flex items-center gap-2`}>
                      <AlertCircle className="h-5 w-5" />
                      Important Note:
                    </p>
                    <p className="text-gray-700 mt-2">{stage.note}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Total Cost Example */}
        <Card className="mt-12 bg-gradient-to-br from-[#001F3F] to-[#0074D9] text-white">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6">Example: Total Cost Breakdown</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-[#FFD700]">Edu9 Service Fees:</h4>
                <div className="space-y-3 text-blue-100">
                  <div className="flex justify-between">
                    <span>Stage 1: Career Guidance</span>
                    <span className="font-bold">₹10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stage 2: Management Quota Processing</span>
                    <span className="font-bold">₹1,00,000</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 flex justify-between text-lg">
                    <span className="font-semibold">Total Edu9 Fees:</span>
                    <span className="font-bold text-[#FFD700]">₹1,10,000</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-[#FFD700]">Direct College Payment:</h4>
                <div className="space-y-3 text-blue-100">
                  <div className="flex justify-between">
                    <span>Stage 3: College Donation</span>
                    <span className="font-bold">₹12L - ₹50L</span>
                  </div>
                  <p className="text-sm text-blue-200 italic">
                    * Paid directly to college (not to Edu9)
                  </p>
                  <div className="border-t border-white/20 pt-3">
                    <p className="text-sm">Example for RV College: ₹25,00,000</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-[#FFD700] text-[#001F3F] hover:bg-yellow-500 px-12 py-6 text-lg font-bold"
            onClick={() => navigate('/')}
          >
            Explore Colleges & Compare Fees
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#001F3F] text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-blue-200">
            Have questions about our payment structure? Contact us at <a href="tel:9133311450" className="text-[#FFD700] font-semibold">9133311450</a> or <a href="mailto:manager@edu9.in" className="text-[#FFD700] font-semibold">manager@edu9.in</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PaymentStructure;
