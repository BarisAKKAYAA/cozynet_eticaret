import React from 'react';
import HeroSection from '../components/HeroSection';
import WeHelpSection from '../components/WeHelpSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import TestimonialsSection from '../components/Testimonials/TestimonialsSection';

const Home: React.FC = () => {
    return (
        <>
            <HeroSection />
            <WeHelpSection />
            <WhyChooseUsSection />
            <TestimonialsSection/>
        </>
    );
};

export default Home;