import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getStoredCourses } from '../data';
import { CreditCard, User, CheckCircle, ArrowLeft, Lock } from 'lucide-react';

const Enroll = () => {
  const [searchParams] = useSearchParams();
  const courseId = parseInt(searchParams.get('courseId'));
  const allCourses = getStoredCourses();
  const course = allCourses.find(c => c.id === courseId);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Program Selected</h2>
          <p className="text-gray-600 mb-8">Please select a program from our courses page to begin enrollment.</p>
          <Link to="/courses" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" /> Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      
      // Save enrollment to local storage for Admin Dashboard demo
      let existingEnrollments = [];
      try {
        existingEnrollments = JSON.parse(localStorage.getItem('apex_enrollments') || '[]');
        if (!Array.isArray(existingEnrollments)) existingEnrollments = [];
      } catch (_err) {
        existingEnrollments = [];
      }

      const newEnrollment = {
        id: `APX-${Math.floor(10000 + Math.random() * 90000)}`,
        studentName: formData.studentName,
        parentName: formData.parentName,
        email: formData.email,
        phone: formData.phone,
        courseId: course.id,
        courseTitle: course.title,
        price: course.price,
        status: 'In Progress',
        progress: '15%',
        date: new Date().toISOString()
      };
      
      try {
        localStorage.setItem('apex_enrollments', JSON.stringify([newEnrollment, ...existingEnrollments]));
      } catch (err) {
        console.error('Error saving enrollment:', err);
      }
      
      // Store the generated ID in formData so we can display it on the success screen
      setFormData(prev => ({ ...prev, orderId: newEnrollment.id }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
              <span className="hidden sm:inline font-medium">Student Details</span>
            </div>
            <div className={`h-1 w-16 md:w-32 rounded ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
              <span className="hidden sm:inline font-medium">Payment</span>
            </div>
            <div className={`h-1 w-16 md:w-32 rounded ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
              <span className="hidden sm:inline font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="md:col-span-2">
            
            {step === 1 && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <User className="w-8 h-8 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Student Information</h2>
                </div>
                <form onSubmit={handleNextStep} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Student Full Name *</label>
                      <input type="text" name="studentName" required value={formData.studentName} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50" placeholder="John Doe Jr." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian Name *</label>
                      <input type="text" name="parentName" required value={formData.parentName} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50" placeholder="Jane Doe" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50" placeholder="jane@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50" placeholder="(555) 123-4567" />
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
                </div>
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-8 flex items-start gap-3 text-blue-800">
                  <Lock className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm">This is a secure 128-bit SSL encrypted payment. (Demo Environment: Do not enter real card details)</p>
                </div>
                <form onSubmit={handlePayment} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                    <input type="text" name="cardNumber" required value={formData.cardNumber} onChange={handleChange} maxLength="16" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 tracking-widest font-mono" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (MM/YY) *</label>
                      <input type="text" name="expiryDate" required value={formData.expiryDate} onChange={handleChange} maxLength="5" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50" placeholder="12/25" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                      <input type="text" name="cvv" required value={formData.cvv} onChange={handleChange} maxLength="4" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50" placeholder="123" />
                    </div>
                  </div>
                  <div className="pt-4 flex justify-between items-center">
                    <button type="button" onClick={() => setStep(1)} className="text-gray-600 font-medium hover:text-gray-900 transition-colors">
                      Back
                    </button>
                    <button type="submit" disabled={isProcessing} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center min-w-[200px] disabled:bg-blue-400">
                      {isProcessing ? 'Processing...' : `Pay $${course.price}`}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Enrollment Successful!</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Thank you for enrolling <strong>{formData.studentName}</strong> in <strong>{course.title}</strong>. We have sent a confirmation email to <strong>{formData.email}</strong> with schedule details.
                </p>
                <div className="bg-gray-50 rounded-lg p-6 max-w-sm mx-auto mb-8 text-left border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Order Reference:</p>
                  <p className="font-mono text-gray-900 mb-4">#{formData.orderId}</p>
                  <p className="text-sm text-gray-500 mb-1">Amount Paid:</p>
                  <p className="font-bold text-gray-900">${course.price}.00</p>
                </div>
                <Link to="/" className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  Return to Home
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="flex gap-4 items-start mb-6">
                <div className="bg-blue-50 p-3 rounded-lg">
                  {course.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{course.title}</h4>
                  <p className="text-sm text-gray-500">{course.duration} • {course.level}</p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Course Fee</span>
                  <span className="font-medium text-gray-900">${course.price}.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Registration</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                <span className="font-bold text-gray-900 text-lg">Total</span>
                <span className="font-bold text-blue-600 text-2xl">${course.price}.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enroll;
