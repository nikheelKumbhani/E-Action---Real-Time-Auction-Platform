import React from 'react';
import HeroBanner from './components/Blog/HeroBanner';
import FeaturedArticle from './components/Blog/FeaturedArticle';
import BlogGrid from './components/Blog/BlogGrid';
import CallToAction from './components/Blog/CallToAction';


function Blog() {
  return (
    <div className="min-h-screen bg-blue-600">
      <HeroBanner />
      <FeaturedArticle />
      <BlogGrid />
      <CallToAction />
    </div>
  );
}

export default Blog;