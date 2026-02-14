import { Container } from "../../router";
import { Gavel, Target, Users, Award, TrendingUp, Shield, Heart } from "lucide-react";

export const About = () => {
    const stats = [
        { icon: Users, value: "500K+", label: "Active Users" },
        { icon: Gavel, value: "1M+", label: "Auctions Completed" },
        { icon: Award, value: "98%", label: "Satisfaction Rate" },
        { icon: TrendingUp, value: "24/7", label: "Platform Availability" }
    ];

    const values = [
        {
            icon: Shield,
            title: "Trust & Security",
            description: "We prioritize the safety and security of every transaction on our platform."
        },
        {
            icon: Heart,
            title: "Customer First",
            description: "Our users are at the heart of everything we do. Your success is our success."
        },
        {
            icon: Target,
            title: "Innovation",
            description: "Constantly evolving to provide the best auction experience possible."
        }
    ];

    const team = [
        {
            name: "Sarah Johnson",
            role: "CEO & Founder",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
        },
        {
            name: "Michael Chen",
            role: "CTO",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
        },
        {
            name: "Emily Rodriguez",
            role: "Head of Operations",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
        },
        {
            name: "David Park",
            role: "Head of Security",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop"
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
                                <Gavel className="w-10 h-10 text-emerald-600" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About AuctionHub</h1>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            We're on a mission to revolutionize online auctions by creating a transparent, secure,
                            and user-friendly platform where buyers and sellers can connect and trade with confidence.
                        </p>
                    </div>
                </Container>
            </div>

            {/* Stats Section */}
            <div className="bg-emerald-600 py-16">
                <Container>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="flex justify-center mb-4">
                                        <Icon className="w-10 h-10 text-white" />
                                    </div>
                                    <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                                    <div className="text-emerald-50">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </div>

            {/* Story Section */}
            <Container>
                <div className="py-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-lg">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    Founded in 2020, AuctionHub was born from a simple idea: auction platforms should be
                                    accessible, transparent, and fair for everyone. Our founders, experienced in both
                                    e-commerce and traditional auctions, saw an opportunity to bridge the gap between
                                    old-world auction houses and modern digital commerce.
                                </p>
                                <p>
                                    What started as a small platform for collectibles has grown into a comprehensive
                                    marketplace serving hundreds of thousands of users worldwide. From rare antiques to
                                    everyday items, we facilitate millions of transactions each year, always maintaining
                                    our commitment to security, transparency, and user satisfaction.
                                </p>
                                <p>
                                    Today, we're proud to be one of the most trusted online auction platforms, with a
                                    dedicated team working around the clock to ensure every bid, every sale, and every
                                    transaction is smooth, secure, and successful.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Values Section */}
            <div className="bg-white py-20 border-y border-gray-200">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            These principles guide everything we do and shape our platform's future
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-emerald-600 hover:shadow-lg transition-all">
                                    <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                                        <Icon className="w-7 h-7 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                    <p className="text-gray-600">{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </div>

            {/* Team Section */}
            <Container>
                <div className="py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Passionate professionals dedicated to creating the best auction experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all group">
                                <div className="aspect-square overflow-hidden bg-gray-200">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                                    <p className="text-emerald-600 font-medium">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>

            {/* CTA Section */}
            <div className="bg-emerald-600 py-16">
                <Container>
                    <div className="text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                        <p className="text-emerald-50 mb-8 max-w-2xl mx-auto">
                            Be part of a thriving marketplace where opportunities are endless
                        </p>
                        <button className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-gray-50 transition-all">
                            Get Started Today
                        </button>
                    </div>
                </Container>
            </div>
        </section>
    );
};
