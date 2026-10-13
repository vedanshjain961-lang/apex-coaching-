import React from 'react';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl">Apex Learning</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Empowering students to achieve their academic goals through personalized and expert tutoring.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Instagram
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="text-gray-400 hover:text-white text-sm transition-colors">Courses</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Top Subjects</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">Advanced Mathematics</li>
              <li className="text-gray-400 text-sm">Physics & Chemistry</li>
              <li className="text-gray-400 text-sm">English Literature</li>
              <li className="text-gray-400 text-sm">Computer Science</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-400 shrink-0" />
                <span className="text-gray-400 text-sm">123 Education Lane, Knowledge City, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400 shrink-0" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400 shrink-0" />
                <span className="text-gray-400 text-sm">info@apexlearning.demo</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {CURRENT_YEAR} Apex Learning Demo. This is a portfolio project.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
