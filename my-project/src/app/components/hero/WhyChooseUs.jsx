import { Shield, UserCheck, Headset, Eye } from "lucide-react"

const benefits = [
  {
    title: "Secure Payments",
    description: "All transactions are protected with advanced encryption and trusted payment gateways.",
    icon: Shield,
  },
  {
    title: "Verified Sellers",
    description: "We carefully screen sellers to ensure authenticity and reliable service.",
    icon: UserCheck,
  },
  {
    title: "24/7 Customer Support",
    description: "Our support team is available around the clock to assist you with any issues or questions.",
    icon: Headset,
  },
  {
    title: "Transparent Bidding",
    description: "Real-time bidding with visible activity — no hidden bids or last-minute surprises.",
    icon: Eye,
  },
]

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 overflow-hidden bg-white">

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full mb-4 border border-emerald-200">
            <span className="text-sm font-semibold text-emerald-700">Why Choose Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Experience Excellence
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're not just another auction site — here's why thousands of users trust us
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Icon container */}
                <div className="w-16 h-16 rounded-2xl bg-emerald-600 mb-6 transform group-hover:scale-110 transition-all duration-300 mx-auto flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm">
            Join <span className="font-bold text-emerald-600">10,000+</span> satisfied customers today
          </p>
        </div>
      </div>
    </section>
  )
}
