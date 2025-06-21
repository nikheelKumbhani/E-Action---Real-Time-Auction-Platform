import React from 'react';
import PageTitle from './components/Services/PageTitle';
import ServiceOverview from './components/Services/ServiceOverview';
import ServicesGrid from './components/Services/ServicesGrid';
import WhyChooseUs from './components/Services/WhyChooseUs';
import Testimonials from './components/Services/Testimonials';
import CallToAction from './components/Services/CallToAction';

function Services() {
  return (
    <div className="min-h-screen">
      <PageTitle />
      <ServiceOverview />
      <ServicesGrid />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </div>
  );
}

export default Services;