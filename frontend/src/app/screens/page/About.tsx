import React from 'react';
import Hero from './components/About/Hero';
import Mission from './components/About/Mission';
import Story from './components/About/Story';
import Values from './components/About/Values';
import Team from './components/About/Team';
import WhyChooseUs from './components/About/WhyChooseUs';
import CallToAction from './components/About/CallToAction';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Mission />
      <Story />
      <Values />
      <Team />
      <WhyChooseUs />
      <CallToAction />
    </div>
  );
}

export default App;