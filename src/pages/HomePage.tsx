import { useState } from 'react';
import SEO from '../components/SEO';
import { seoConfig } from '../utils/seoConfig';
import { useTours } from '../hooks/useTours';
import HeroSection from '../components/home/HeroSection';
import PopularTours from '../components/home/PopularTours';
import ExperienceTypes from '../components/home/ExperienceTypes';
import TopDestinations from '../components/home/TopDestinations';

export default function HomePage() {
  const { tours, loading, error } = useTours();

  return (
    <>
      <SEO {...seoConfig.home} />
      <div>
        <HeroSection />
        <PopularTours tours={tours} loading={loading} error={error} />
        <ExperienceTypes />
        <TopDestinations />
      </div>
    </>
  );
}