import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  Shield, 
  Zap,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header Section */}
      <section className="relative py-20 px-4 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            We're Here to Help
          </p>
          <div className="mt-8 w-24 h-1 bg-white mx-auto"></div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form Section */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
              <p className="text-gray-600 text-lg">
                Have questions about our auctions? We'd love to hear from you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors duration-200 bg-white"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors duration-200 bg-white"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-semibold text-gray-700">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors duration-200 bg-white"
                  placeholder="What can we help you with?"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-gray-700">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors duration-200 resize-vertical bg-white"
                  placeholder="Please describe your inquiry in detail..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-gray-800 focus:bg-gray-800 focus:outline-none transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-gray-600 text-lg">
                Multiple ways to reach our dedicated support team.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="p-3 bg-black text-white rounded-full">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                  <p className="text-gray-600 mb-2">Our team typically responds within 2 hours</p>
                  <a href="mailto:support@auctionhouse.com" className="text-black font-medium hover:underline">
                    support@auctionhouse.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="p-3 bg-black text-white rounded-full">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                  <p className="text-gray-600 mb-2">Speak directly with our support team</p>
                  <a href="tel:+1-555-123-4567" className="text-black font-medium hover:underline">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="p-3 bg-black text-white rounded-full">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                  <p className="text-gray-600 mb-2">Our headquarters and auction house</p>
                  <address className="text-black font-medium not-italic">
                    123 Auction Street<br />
                    New York, NY 10001<br />
                    United States
                  </address>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="p-3 bg-black text-white rounded-full">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Support Hours</h3>
                  <p className="text-gray-600 mb-2">We're here when you need us</p>
                  <div className="text-black font-medium">
                    <p>Monday - Friday: 8:00 AM - 8:00 PM EST</p>
                    <p>Saturday - Sunday: 10:00 AM - 6:00 PM EST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Support Section */}
        <section className="mt-20 py-16 bg-black text-white rounded-2xl">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              World-Class Customer Support
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              We're committed to providing exceptional service to all our auction participants. 
              Whether you're a first-time bidder or a seasoned collector, our dedicated team is here to assist you.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-black rounded-full mb-4">
                  <MessageCircle size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-400">
                  Round-the-clock assistance for urgent auction matters and inquiries.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-black rounded-full mb-4">
                  <Zap size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Response</h3>
                <p className="text-gray-400">
                  Average response time of under 30 minutes during business hours.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-black rounded-full mb-4">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
                <p className="text-gray-400">
                  Knowledgeable specialists in art, antiques, and auction processes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Links */}
        <section className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Follow Us</h3>
          <div className="flex justify-center space-x-6">
            <a 
              href="#" 
              className="p-4 bg-gray-100 hover:bg-black hover:text-white rounded-full transition-all duration-200 transform hover:scale-110"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a 
              href="#" 
              className="p-4 bg-gray-100 hover:bg-black hover:text-white rounded-full transition-all duration-200 transform hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
            <a 
              href="#" 
              className="p-4 bg-gray-100 hover:bg-black hover:text-white rounded-full transition-all duration-200 transform hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a 
              href="#" 
              className="p-4 bg-gray-100 hover:bg-black hover:text-white rounded-full transition-all duration-200 transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;