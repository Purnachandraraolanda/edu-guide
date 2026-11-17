import React from "react";

const PrivacyPolicy = () => {
  return (
    // 'pt-32' adds large padding to push text below your Navbar
    // 'bg-white' and 'text-black' ensures it's visible against your dark theme
    <div className="min-h-screen bg-white pt-32 pb-20 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-[#003366] border-b pb-4">
          Privacy Policy – Edu9 Career Guidance
        </h1>
        <div className="prose prose-blue max-w-none text-gray-700 space-y-4">
          <p>Last updated: February 24, 2026</p>
          <p>At Edu9 Career Guidance, we value your privacy. This policy explains how we collect and use your data...</p>
          <h2 className="text-2xl font-semibold text-[#003366] mt-8">1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you request career counseling...</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;