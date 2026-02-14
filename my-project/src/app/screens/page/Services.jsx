import { Container } from "../../router";
import { Gavel, Shield, TrendingUp, Users, Zap, HeadphonesIcon, CheckCircle, ArrowRight } from "lucide-react";

export const Services = () => {
    const services = [
        {
            icon: Gavel,
            title: "Live Auctions",
            description: "Participate in real-time bidding with instant updates and competitive pricing.",
            features: [
                "Real-time bid updates",
                "Auto-bid functionality",
                "Instant notifications",
                "Live chat support"
            ]
        },
        {
            icon: Shield,
            title: "Secure Transactions",
            description: "Industry-leading security measures to protect every transaction.",
            features: [
                "Encrypted payments",
                "Buyer protection",
                "Escrow services",
                "Fraud prevention"
            ]
        },
        {
            icon: TrendingUp,
            title: "Seller Tools",
            description: "Comprehensive tools to help you succeed as a seller on our platform.",
            features: [
                "Analytics dashboard",
                "Pricing insights",
                "Inventory management",
                "Marketing tools"
            ]
        },
        {
            icon: Users,
            title: "Community Features",
            description: "Connect with other buyers and sellers in our thriving community.",
            features: [
                "Seller ratings",
                "Buyer reviews",
                "Discussion forums",
                "Expert advice"
            ]
        },
        {
            icon: Zap,
            title: "Quick Auctions",
            description: "Fast-paced auctions for items that need to move quickly.",
            features: [
                "24-hour auctions",
                "Buy it now option",
                "Express shipping",
                "Instant checkout"
            ]
        },
        {
            icon: HeadphonesIcon,
            title: "24/7 Support",
            description: "Round-the-clock customer support to assist you whenever you need help.",
            features: [
                "Live chat",
                "Email support",
                "Phone assistance",
                "Help center"
            ]
        }
    ];

    const plans = [
        {
            name: "Basic",
            price: "Free",
            description: "Perfect for casual buyers and new sellers",
            features: [
                "Unlimited bidding",
                "Up to 10 listings/month",
                "Basic seller tools",
                "Email support",
                "5% transaction fee"
            ],
            recommended: false
        },
        {
            name: "Pro",
            price: "$29",
            period: "/month",
            description: "Ideal for active sellers and power users",
            features: [
                "Unlimited bidding",
                "Unlimited listings",
                "Advanced analytics",
                "Priority support",
                "3% transaction fee",
                "Featured listings"
            ],
            recommended: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "For high-volume sellers and businesses",
            features: [
                "Everything in Pro",
                "Dedicated account manager",
                "Custom integrations",
                "API access",
                "1% transaction fee",
                "White-label options"
            ],
            recommended: false
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
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Comprehensive auction solutions designed to make buying and selling easier,
                            safer, and more profitable for everyone
                        </p>
                    </div>
                </Container>
            </div>

            {/* Services Grid */}
            <Container>
                <div className="py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <div key={index} className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-emerald-600 transition-all group">
                                    <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-all">
                                        <Icon className="w-7 h-7 text-emerald-600 group-hover:text-white transition-all" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                    <p className="text-gray-600 mb-6">{service.description}</p>

                                    <ul className="space-y-3">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-gray-700">
                                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>

            {/* Pricing Section */}
            <div className="bg-white py-20 border-y border-gray-200">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing Plans</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Choose the plan that best fits your needs. Upgrade or downgrade anytime.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`rounded-2xl p-8 ${plan.recommended
                                        ? "bg-emerald-600 text-white border-2 border-emerald-600 shadow-xl scale-105"
                                        : "bg-white border-2 border-gray-200 hover:border-emerald-600 transition-all"
                                    }`}
                            >
                                {plan.recommended && (
                                    <div className="inline-block px-4 py-1 bg-white text-emerald-600 text-sm font-bold rounded-full mb-4">
                                        RECOMMENDED
                                    </div>
                                )}

                                <h3 className={`text-2xl font-bold mb-2 ${plan.recommended ? "text-white" : "text-gray-900"}`}>
                                    {plan.name}
                                </h3>

                                <div className="mb-4">
                                    <span className={`text-4xl font-bold ${plan.recommended ? "text-white" : "text-gray-900"}`}>
                                        {plan.price}
                                    </span>
                                    {plan.period && (
                                        <span className={plan.recommended ? "text-emerald-100" : "text-gray-600"}>
                                            {plan.period}
                                        </span>
                                    )}
                                </div>

                                <p className={`mb-6 ${plan.recommended ? "text-emerald-100" : "text-gray-600"}`}>
                                    {plan.description}
                                </p>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.recommended ? "text-white" : "text-emerald-600"}`} />
                                            <span className={plan.recommended ? "text-white" : "text-gray-700"}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`w-full py-3 rounded-lg font-bold transition-all ${plan.recommended
                                            ? "bg-white text-emerald-600 hover:bg-gray-50"
                                            : "bg-emerald-600 text-white hover:bg-emerald-700"
                                        }`}
                                >
                                    Get Started
                                </button>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            {/* CTA Section */}
            <Container>
                <div className="py-20">
                    <div className="bg-emerald-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                        <p className="text-emerald-50 mb-8 max-w-2xl mx-auto text-lg">
                            Join thousands of satisfied users who trust AuctionHub for their buying and selling needs
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-gray-50 transition-all inline-flex items-center justify-center gap-2">
                                Start Selling
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="px-8 py-4 bg-emerald-700 text-white font-bold rounded-lg hover:bg-emerald-800 transition-all border border-emerald-500">
                                Browse Auctions
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};
