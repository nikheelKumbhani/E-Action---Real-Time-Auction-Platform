import { Star, TrendingUp, Award } from "lucide-react"

export const Trust = () => {
  // Mock company logos - replace with actual logos
  const companies = [
    { name: "ASN Bank", logo: "🏦" },
    { name: "Svelte", logo: "⚡" },
    { name: "Laravel", logo: "🔷" },
    { name: "OnePlus", logo: "📱" },
    { name: "Crocs", logo: "👟" },
    { name: "Stanford", logo: "🎓" },
    { name: "Discord", logo: "💬" },
    { name: "WackyFill", logo: "🎨" }
  ];

  const stats = [
    {
      icon: Star,
      value: "500+",
      label: "Trusted Businesses",
    },
    {
      icon: TrendingUp,
      value: "$2M+",
      label: "Total Sales",
    },
    {
      icon: Award,
      value: "98%",
      label: "Satisfaction Rate",
    }
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="container relative z-10 mx-auto px-4">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-600 p-3 flex items-center justify-center shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Trusted By 500+ Businesses
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore the world's best & largest bidding marketplace with our beautiful bidding products.
            We want to be a part of your smile, success and future growth.
          </p>
        </div>

        {/* Companies Grid */}
        <div className="relative">
          {/* Scrolling Animation Container */}
          <div className="overflow-hidden">
            <div className="flex animate-scroll gap-6 py-4">
              {/* First set of logos */}
              {companies.map((company, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 w-40 h-28 bg-white rounded-xl border-2 border-gray-200 hover:border-emerald-500 flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{company.logo}</div>
                    <div className="text-sm font-semibold text-gray-700">{company.name}</div>
                  </div>
                </div>
              ))}
              {/* Duplicate for infinite scroll effect */}
              {companies.map((company, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 w-40 h-28 bg-white rounded-xl border-2 border-gray-200 hover:border-emerald-500 flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{company.logo}</div>
                    <div className="text-sm font-semibold text-gray-700">{company.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            Become Our Partner
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50%));
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
