import { useState } from "react";
import { Container } from "../../router";
import { Gavel, Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
    };

    const contactInfo = [
        {
            icon: Mail,
            title: "Email Us",
            details: "support@auctionhub.com",
            description: "Send us an email anytime"
        },
        {
            icon: Phone,
            title: "Call Us",
            details: "+1 (555) 123-4567",
            description: "Mon-Fri from 8am to 6pm"
        },
        {
            icon: MapPin,
            title: "Visit Us",
            details: "123 Auction Street, Suite 100",
            description: "San Francisco, CA 94102"
        },
        {
            icon: Clock,
            title: "Working Hours",
            details: "Monday - Friday",
            description: "8:00 AM - 6:00 PM PST"
        }
    ];

    const faqs = [
        {
            question: "How do I start selling?",
            answer: "Simply create an account, verify your email, and you can start listing items immediately from your dashboard."
        },
        {
            question: "What are the fees?",
            answer: "Basic accounts have a 5% transaction fee. Pro accounts get reduced fees starting at 3%."
        },
        {
            question: "How secure are payments?",
            answer: "All payments are processed through industry-standard secure payment gateways with full encryption."
        }
    ];

    return (
        <section className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-white border-b border-gray-200">
                <Container>
                    <div className="py-16 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                                <MessageSquare className="w-10 h-10 text-emerald-600" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get In Touch</h1>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Have questions or need assistance? We're here to help.
                            Reach out to us and we'll respond as soon as possible.
                        </p>
                    </div>
                </Container>
            </div>

            <Container>
                <div className="py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

                                {submitted && (
                                    <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg">
                                        <p className="font-medium">✓ Message sent successfully!</p>
                                        <p className="text-sm">We'll get back to you within 24 hours.</p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            placeholder="you@example.com"
                                        />
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            placeholder="How can we help?"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                            placeholder="Tell us more about your inquiry..."
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>Processing...</>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Contact Info & FAQs */}
                        <div className="space-y-8">
                            {/* Contact Information */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {contactInfo.map((info, index) => {
                                        const Icon = info.icon;
                                        return (
                                            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:border-emerald-600 hover:shadow-lg transition-all">
                                                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                                                    <Icon className="w-6 h-6 text-emerald-600" />
                                                </div>
                                                <h3 className="font-bold text-gray-900 mb-1">{info.title}</h3>
                                                <p className="text-emerald-600 font-medium mb-1">{info.details}</p>
                                                <p className="text-sm text-gray-600">{info.description}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Quick FAQs */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Answers</h2>
                                <div className="space-y-6">
                                    {faqs.map((faq, index) => (
                                        <div key={index}>
                                            <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                                            <p className="text-gray-600">{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Map Section (Placeholder) */}
            <div className="bg-white border-y border-gray-200 py-20">
                <Container>
                    <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
                        <div className="text-center">
                            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 text-lg">Interactive Map Coming Soon</p>
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    );
};
