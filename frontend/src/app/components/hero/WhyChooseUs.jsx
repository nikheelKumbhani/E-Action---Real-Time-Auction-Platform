import { Shield, UserCheck, Headset, Eye } from "lucide-react"
import PropTypes from 'prop-types'

// Utility function for conditional class names
function cn(...classes) {
    return classes.filter(Boolean).join(" ")
}

function BenefitCard({ title, description, Icon, className }) {
  return (
    <div className={cn("p-6 rounded-lg transition-all hover:shadow-md", className)}>
      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  )
}

BenefitCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  className: PropTypes.string
}

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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're not just another auction site — here's why users trust us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} title={benefit.title} description={benefit.description} Icon={benefit.icon} />
          ))}
        </div>
      </div>
    </section>
  )
}
