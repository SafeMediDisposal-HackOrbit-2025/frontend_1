import { ChevronLeft, HelpCircle, Phone, Mail, Shield, FileText, AlertTriangle, Users, Award, Clock } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import BottomNavigation from '@/react-app/components/BottomNavigation';

export default function Info() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "What types of medical waste can I dispose of?",
      answer: "We accept various types of biomedical waste including used syringes, expired medications, surgical instruments, bandages, IV bags, and laboratory waste. Please check our waste categories guide for specific details."
    },
    {
      question: "How do I earn points?",
      answer: "You earn points by properly disposing of medical waste through our app. Points are calculated based on the type and quantity of waste. The more you dispose of responsibly, the more points you earn."
    },
    {
      question: "Where can I find collection points?",
      answer: "Use the scan feature in the app to find nearby collection points. We have partnerships with hospitals, clinics, and designated collection centers throughout your area."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use industry-standard encryption and security measures to protect your personal information. Your privacy is our top priority."
    },
    {
      question: "How can I redeem my points?",
      answer: "Navigate to the Points section in the app to view available rewards. You can redeem points for e-wallet credits, healthcare vouchers, and other valuable rewards."
    }
  ];

  const wasteCategories = [
    { name: "Infectious Waste", description: "Blood-soaked items, cultures, contaminated materials", points: "10-20 pts" },
    { name: "Laboratory Waste", description: "Test tubes, petri dishes, specimen containers, lab cultures", points: "12-22 pts" },
    { name: "Sharps", description: "Needles, syringes, scalpels, broken glass", points: "5-15 pts" },
    { name: "Pharmaceutical Waste", description: "Expired medications, chemotherapy drugs", points: "8-18 pts" }
  ];

  return (
    <div className="min-h-screen bg-[#F5F9F9] pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center border-b border-gray-100">
        <Link to="/home" className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900 ml-4">Information</h1>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* About Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#50c2c9] bg-opacity-10 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-[#50c2c9]" />
            </div>
            <h2 className="text-xl font-bold text-black">About SafeMediDisposal</h2>
          </div>
          
          <div className="space-y-4 text-gray-700">
            <p>SafeMediDisposal is a comprehensive medical waste management solution designed to help healthcare facilities properly dispose of biomedical waste while earning rewards.</p>
            
            <p>Our mission is to create a cleaner and greener environment by managing waste efficiently and responsibly.</p>
            
            <div className="bg-[#F5F9F9] rounded-xl p-4 mt-6">
              <h3 className="text-lg font-semibold text-black mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#50c2c9]" />
                How It Works
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#50c2c9] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <p className="text-sm">Scan or photograph your medical waste using our app</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#50c2c9] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <p className="text-sm">Our AI analyzes the waste type and calculates points</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#50c2c9] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <p className="text-sm">Hand over your waste to our collection points</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#50c2c9] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <p className="text-sm">Earn points and redeem them for rewards</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Waste Categories */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-black">Waste Categories</h2>
          </div>
          
          <div className="grid gap-4">
            {wasteCategories.map((category, index) => (
              <div key={index} className="border border-gray-100 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <span className="text-sm font-medium text-[#50c2c9] bg-[#50c2c9] bg-opacity-10 px-2 py-1 rounded-lg">
                    {category.points}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-black">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900">{faq.question}</h3>
                    <ChevronLeft 
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedFaq === index ? 'rotate-90' : '-rotate-90'
                      }`} 
                    />
                  </div>
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Support */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-black">Contact & Support</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Phone className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Support Hotline</p>
                <p className="text-sm text-gray-600">+91 1800-123-4567</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Email Support</p>
                <p className="text-sm text-gray-600">support@safemedidisposal.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Clock className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Support Hours</p>
                <p className="text-sm text-gray-600">Mon-Fri: 9 AM - 6 PM IST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Privacy */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-black">Legal & Privacy</h2>
          </div>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Terms of Service</span>
              </div>
              <ChevronLeft className="w-5 h-5 text-gray-400 -rotate-90" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Privacy Policy</span>
              </div>
              <ChevronLeft className="w-5 h-5 text-gray-400 -rotate-90" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Safety Guidelines</span>
              </div>
              <ChevronLeft className="w-5 h-5 text-gray-400 -rotate-90" />
            </button>
          </div>
        </div>

        {/* App Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <h2 className="text-xl font-bold text-black">App Information</h2>
          </div>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between items-center">
              <span>Version</span>
              <span className="font-medium">2.1.4</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Last Updated</span>
              <span className="font-medium">Sept 22, 2025</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Developer</span>
              <span className="font-medium">SafeMedi Solutions</span>
            </div>
            <div className="flex justify-between items-center">
              <span>License</span>
              <span className="font-medium">Healthcare Certified</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
