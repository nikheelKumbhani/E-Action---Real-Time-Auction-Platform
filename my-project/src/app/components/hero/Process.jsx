import { UserPlus, Gavel, Clock, Users } from "lucide-react"

const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Sign up",
      description: "Sign your car up via our contact form or via the WhatsApp chat on the website. Send us a couple of pictures of the car that you want to put up for auction.",
      icon: UserPlus,
    },
    {
      number: "02",
      title: "Auction goes online",
      description: "As soon as we collect enough cars for the auction (we strive for 25 to 40 cars per auction), the auction will show up on the website.",
      icon: Gavel,
    },
    {
      number: "03",
      title: "Closing auction",
      description: "After the viewing day(s) the auction is still a few days open for new bids. We evaluate the highest bid after the closing of an auction.",
      icon: Clock,
    },
    {
      number: "04",
      title: "The last steps",
      description: "After the car is sold to the highest bidder, all the cars will be collected by the buyers on a determined date.",
      icon: Users,
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gray-50">
      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full mb-4 border border-emerald-200">
            <span className="text-sm font-semibold text-emerald-700">Simple Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Easy 4 steps to win your dream items
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="group relative">
                {/* Connection Line (hidden on mobile, shown on lg+) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 left-[calc(50%+3rem)] w-[calc(100%-3rem)] h-0.5 bg-gray-300 z-0">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-600 rounded-full"></div>
                  </div>
                )}

                {/* Card */}
                <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-emerald-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-lg font-bold text-white">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto mb-6 mt-4 bg-emerald-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { label: "Active Auctions", value: "5,000+" },
            { label: "Happy Customers", value: "10K+" },
            { label: "Success Rate", value: "98%" },
            { label: "Countries", value: "50+" }
          ].map((stat, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-emerald-500 transition-all">
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;