import React from 'react';
import { Calendar, Users, Globe, Award } from 'lucide-react';

const Story = () => {
  const milestones = [
    {
      year: '2018',
      title: 'Founded',
      description: 'Started with a vision to democratize auctions',
      icon: Calendar
    },
    {
      year: '2020',
      title: '10K Users',
      description: 'Reached our first major milestone',
      icon: Users
    },
    {
      year: '2022',
      title: 'Global Expansion',
      description: 'Expanded to serve customers worldwide',
      icon: Globe
    },
    {
      year: '2024',
      title: 'Industry Leader',
      description: 'Recognized as a top auction platform',
      icon: Award
    }
  ];

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-black text-center mb-16">Our Journey</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-black transform -translate-y-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon;
              return (
                <div key={index} className="text-center relative">
                  <div className="bg-white border-4 border-black rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center relative z-10 hover:bg-black hover:text-white transition-colors duration-300">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div className="bg-black text-white px-4 py-2 rounded-lg text-lg font-bold mb-3">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;