import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle2 } from 'lucide-react';
import { getStoredCourses, testimonials } from '../data';
import EnrollModal from '../components/EnrollModal';

const Home = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const courses = getStoredCourses();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Unlock Your True <span className="text-blue-600">Academic Potential</span>
              </h1>
              <p className="text-lg text-gray-600 md:pr-12">
                Expert tutoring for students of all ages. Build confidence, improve grades, and achieve your educational goals with our personalized learning programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/contact"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Get a Free Trial <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/courses"
                  className="bg-white text-blue-600 border border-blue-200 px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-50 transition-colors text-center"
                >
                  Explore Courses
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                alt="Students studying together"
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Star className="w-6 h-6 text-green-600 fill-current" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">4.9/5</p>
                  <p className="text-sm text-gray-500">Average Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Apex Learning?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We provide a supportive environment where every student gets the attention they need to succeed.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Expert Tutors', desc: 'Our instructors are carefully selected professionals with years of teaching experience.' },
              { title: 'Personalized Plans', desc: 'We tailor our teaching methods to match each student\'s unique learning style.' },
              { title: 'Flexible Schedules', desc: 'Choose between online or in-person sessions at times that work for you.' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <CheckCircle2 className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Programs</h2>
              <p className="text-gray-600 max-w-2xl">Discover our most sought-after tutoring programs designed for academic excellence.</p>
            </div>
            <Link to="/courses" className="hidden md:flex text-blue-600 font-medium hover:text-blue-700 items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 3).map((course) => (
              <div key={course.id} className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div className="p-7">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                      {course.icon}
                    </div>
                    {course.isLive ? (
                      <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span> LIVE BATCH
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Self-Paced
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                  <p className="text-slate-600 text-xs mb-4 line-clamp-2">{course.description}</p>

                  {/* Teacher Row */}
                  {course.instructor && (
                    <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl mb-4 border border-slate-100">
                      <img
                        src={course.instructor.image}
                        alt={course.instructor.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-900 truncate">{course.instructor.name}</p>
                        <p className="text-[10px] text-purple-700 truncate">{course.instructor.credentials}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span>{course.duration}</span>
                    <span className="font-bold text-slate-900 font-mono text-sm">${course.price}.00</span>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3">
                  <button 
                    onClick={() => setSelectedCourse(course)} 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs transition-colors"
                  >
                    Enroll Now
                  </button>
                  {course.isLive && (
                    <Link
                      to={`/live-class/${course.id}`}
                      className="px-3 py-2 bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold transition-colors"
                    >
                      Room
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/courses" className="inline-flex text-blue-600 font-medium hover:text-blue-700 items-center gap-1">
              View All Programs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">What Parents & Students Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm relative">
                <div className="text-4xl text-blue-200 absolute top-4 right-6 font-serif">"</div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic relative z-10">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnrollModal 
        course={selectedCourse} 
        isOpen={!!selectedCourse} 
        onClose={() => setSelectedCourse(null)} 
      />
    </div>
  );
};

export default Home;
