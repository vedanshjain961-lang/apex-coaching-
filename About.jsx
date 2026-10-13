import React from 'react';
import { Target, Heart, Award } from 'lucide-react';
import { tutors } from '../data';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">About Apex Learning</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Dedicated to empowering students with the knowledge and confidence they need to succeed in life.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                At Apex Learning, we believe every student has untapped potential. Our mission is to provide personalized, high-quality education that goes beyond memorization, focusing instead on deep understanding and critical thinking.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg h-fit">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Goal-Oriented Approach</h3>
                    <p className="text-gray-600">We set clear, measurable milestones for every student.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-red-50 p-3 rounded-lg h-fit">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Passionate Educators</h3>
                    <p className="text-gray-600">Our tutors teach because they love seeing students thrive.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-yellow-50 p-3 rounded-lg h-fit">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Proven Excellence</h3>
                    <p className="text-gray-600">Consistently high success rates across standardized tests.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400" alt="Students in library" className="rounded-xl shadow-md w-full h-64 object-cover" />
              <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=400" alt="Student writing" className="rounded-xl shadow-md w-full h-64 object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Expert Tutors</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our team consists of highly qualified educators dedicated to your success.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tutors.map((tutor) => (
              <div key={tutor.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <img src={tutor.image} alt={tutor.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{tutor.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{tutor.subject}</p>
                  <p className="text-gray-600 text-sm">{tutor.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
